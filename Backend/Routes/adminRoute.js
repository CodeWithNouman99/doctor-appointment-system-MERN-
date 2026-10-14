import express from "express";
import { addDoctor, adminLogin, allDoctors, changeAvailability } from "../Controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);

export default adminRouter;