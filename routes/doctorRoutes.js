import express from "express";
import {authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js'
import { addDoctor } from "../controllers/doctorController.js";
import { getAllDoctors , getDoctorById ,cancelDoctor} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add-doctor", authMiddleware, roleMiddleware(["admin"]), addDoctor);
router.get("/", authMiddleware, roleMiddleware(["admin","patient","doctor"]), getAllDoctors)
router.get("/:id", getDoctorById);
router.delete("/cancel/:id", authMiddleware, roleMiddleware(["admin"]), cancelDoctor)


export default router;
