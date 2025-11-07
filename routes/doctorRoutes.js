import express from "express";
import { addDoctor } from "../controllers/doctorController.js";

const router = express.Router();

// ✅ Add this route
router.post("/add-doctor", addDoctor);


export default router;
