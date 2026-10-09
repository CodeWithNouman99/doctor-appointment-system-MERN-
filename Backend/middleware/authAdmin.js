import jwt from 'jsonwebtoken'

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers

    if (!atoken) {
      return res.status(401).json({ success: false, message: 'Not authorized, login again' })
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET)

    // Token ko login ke waqt jaise sign kiya tha, waise hi check karo
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Not authorized, login again' })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export default authAdmin