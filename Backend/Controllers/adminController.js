import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// API for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // password token mein nahi rakhte, sirf email aur role
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({ success: true, message: "Admin login successful", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password -__v").lean();
    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// API to toggle doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, { available: !doctor.available });
    res.status(200).json({ success: true, message: "Availability changed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addDoctor, adminLogin, allDoctors, changeAvailability };