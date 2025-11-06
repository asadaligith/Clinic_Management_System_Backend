import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import express from "express";

dotenv.config();
connectDB();

const app = express();
app.use(cors)
app.use(express.json());

// Routes

app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

