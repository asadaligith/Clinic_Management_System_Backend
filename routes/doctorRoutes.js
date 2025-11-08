import express from "express";
import { addDoctor } from "../controllers/doctorController.js";
import { getAllDoctors , getDoctorById} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add-doctor", addDoctor);
router.get("/", getAllDoctors)
router.get("/:id", getDoctorById);



export default router;
