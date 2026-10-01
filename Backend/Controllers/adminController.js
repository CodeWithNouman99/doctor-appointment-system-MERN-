import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import Doctor from '../models/Doctor.model.js'

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, degree, fees, address, about } = req.body
    const imageFile = req.file

    // Check all required fields are present
    if (!name || !email || !password || !speciality || !experience || !degree || !fees || !address || !about) {
      return res.json({ success: false, message: "Missing details" })
    }

    // Check email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    // Check password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" })
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // comes as a string from form-data
    }

    const newDoctor = new Doctor(doctorData)
    await newDoctor.save()

    res.json({ success: true, message: "Doctor added successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { addDoctor }