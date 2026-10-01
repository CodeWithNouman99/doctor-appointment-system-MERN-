import express from "express";
import connectDB from "./config/DB.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

connectDB();

//App Configuration
const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());

//Api End points
app.get("/", (req, res) => {
  res.status(200).send("Hello from backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
