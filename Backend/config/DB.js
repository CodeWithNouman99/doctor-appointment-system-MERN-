import mongoose from 'mongoose'

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
  })

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message)
  })

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'prescripto' })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB