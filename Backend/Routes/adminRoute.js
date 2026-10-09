import express from 'express'
import { addDoctor,adminLogin } from '../Controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
const adminRouter = express.Router()

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)
adminRouter.post('/login', adminLogin)

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

export default adminRouter