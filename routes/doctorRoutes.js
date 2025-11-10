import express from "express";
import { addDoctor } from "../controllers/doctorController.js";
import { getAllDoctors , getDoctorById ,cancelDoctor} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add-doctor", addDoctor);
router.get("/", getAllDoctors)
router.get("/:id", getDoctorById);
router.delete("/cancel/:id", cancelDoctor)


export default router;
