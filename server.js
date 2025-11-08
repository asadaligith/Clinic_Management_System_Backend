import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import express from "express";

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());
//

app.use("/api/users", authRoutes);

app.use("/api/doctors", doctorRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// ✅ Test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
