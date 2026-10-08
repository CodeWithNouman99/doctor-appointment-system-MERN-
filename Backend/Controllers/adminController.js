import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcrypt";
import doctorModel from "../models/Doctor.model.js";



// Api for adding doctor
const addDoctor=async(req,res)=>
{
    try{
        const {name,email,password,specialization,degree,experience,fees,about,address}=req.body;
        const imageFile=req.file.path; 

        // checking for all data to add doctor
        if(!name || !email || !password || !specialization || !degree || !experience || !fees || !about || !address || !image)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        
        // Validating an email
        if(!email.includes("@") || !email.includes("."))
        {
            return res.status(400).json({message:"Invalid email format"});
        }

        // validating password length
        if(password.length<8)
        {
            return res.status(400).json({message:"Password must be at least 8 characters long"});
        }

        // hashing the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);


        //upload image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile,{
            resource_type:"image",
            folder:"doctor_images"
        });
        const imageUrl=imageUpload.secure_url;

        // creating doctor object
        const doctor={
            name,
            email,
            password: hashedPassword,
            specialization,
            degree,
            experience,
            fees,
            about,
            address,
            image: imageUrl
        };

        // saving doctor to database
        const newDoctor=new doctorModel(doctor);
        await newDoctor.save();
        res.status(201).json({message:"Doctor added successfully"});
    }


    
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export {addDoctor};