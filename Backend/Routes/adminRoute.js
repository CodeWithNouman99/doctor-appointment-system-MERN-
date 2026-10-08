import express from 'express'
import { addDoctor,adminLogin } from '../Controllers/adminController.js'
import upload from '../middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)
adminRouter.post('/login', adminLogin)

export default adminRouter