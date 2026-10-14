// One-time seed script: inserts the 15 doctors from the Frontend assets.js into MongoDB,
// the same way the addDoctor controller does (bcrypt password + Cloudinary image).
// Safe to run more than once: doctors whose email already exists are skipped.
// Usage (inside Backend/): npm run seed

import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "../config/DB.js";
import connectCloudinary from "../config/Cloudinary.js";
import doctorModel from "../models/Doctor.model.js";

// load Backend/.env no matter which folder the script is started from
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const DEFAULT_PASSWORD = "Doctor@123";
const ASSETS_DIR = path.join(__dirname, "../../Frontend/src/assets/assets_frontend");
const ASSETS_FILE = path.join(ASSETS_DIR, "assets.js");

// assets.js imports image files, so Node can't import it directly.
// Instead we read it as text, turn every `import x from './file'` into
// `const x = "<absolute file path>"`, and evaluate it to get the doctors array.
const loadDoctorsFromAssets = () => {
  const source = fs.readFileSync(ASSETS_FILE, "utf8");

  const code = source
    .replace(
      /^import\s+(\w+)\s+from\s+['"](.+?)['"];?/gm,
      (_, name, file) => `const ${name} = ${JSON.stringify(path.join(ASSETS_DIR, file))};`
    )
    .replace(/^export\s+/gm, "");

  // the last expression is the script's result
  const { doctors } = vm.runInNewContext(`${code}\n;({ doctors })`);
  return doctors;
};

// "Dr. Ahmed Raza" -> "dr.ahmed.raza@prescripto.com"
const makeEmail = (name) =>
  name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).join(".") + "@prescripto.com";

const seedDoctors = async () => {
  await connectDB();
  connectCloudinary();

  const doctors = loadDoctorsFromAssets();
  console.log(`Found ${doctors.length} doctors in assets.js`);

  // hash the shared default password once (10 salt rounds, same as addDoctor)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, salt);

  let added = 0;
  let skipped = 0;
  const emails = [];

  for (const doc of doctors) {
    const email = makeEmail(doc.name);
    emails.push(email);

    // skip existing doctors before uploading, so re-runs don't waste Cloudinary uploads
    const exists = await doctorModel.exists({ email });
    if (exists) {
      console.log(`Skipped (exists): ${doc.name}`);
      skipped++;
      continue;
    }

    // upload the local image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(doc.image, {
      resource_type: "image",
      folder: "doctor_images",
    });

    await doctorModel.create({
      name: doc.name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      speciality: doc.speciality,
      degree: doc.degree,
      experience: doc.experience,
      about: doc.about,
      fees: Number(doc.fees),
      address: { line1: doc.address.line1, line2: doc.address.line2 },
      available: true,
      date: Date.now(),
    });

    console.log(`Added: ${doc.name}`);
    added++;
  }

  console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`);
  console.log("Emails:\n" + emails.map((e) => `  ${e}`).join("\n"));
  console.log(`Default password: ${DEFAULT_PASSWORD}`);
};

seedDoctors()
  .catch((err) => {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
