import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import doctorModel from "../models/Doctor.model.js";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, fees, about, address } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !fees || !about || !address || !imageFile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // validating email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // validating password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctor_images",
    });

    const doctor = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      fees: Number(fees),
      about,
      address: JSON.parse(address),
      image: imageUpload.secure_url,
    };

    const newDoctor = new doctorModel(doctor);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addDoctor };