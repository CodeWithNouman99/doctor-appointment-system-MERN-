import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    image: { type: String, default: '' },
    phone: { type: String, default: '0000000000' },
    address: {
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
    },
    gender: { type: String, enum: ['Male', 'Female', 'Not Selected'], default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
  },
  { timestamps: true, minimize: false }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User