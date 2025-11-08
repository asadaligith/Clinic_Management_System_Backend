import express from "express";
import { addDoctor } from "../controllers/doctorController.js";
import { getAllDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add-doctor", addDoctor);
router.get("/", getAllDoctors)


export default router;
