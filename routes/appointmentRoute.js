import express from "express";
import {authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js'
import {bookAppointment, getAppointments, cancelAppointment, getAppointmentsByUser, updateAppointmentStatus, addPrescription} from '../controllers/appointmentController.js';
import { getAppointmentsByDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/bookAppointment", authMiddleware, roleMiddleware(["patient"]), bookAppointment);
router.get("/get-appointments", authMiddleware, roleMiddleware(["admin"]), getAppointments); // admin view
router.get('/get-appointment', authMiddleware, getAppointmentsByUser); // user or admin permitted with checks
router.get("/doctor/:doctorId", authMiddleware, getAppointmentsByDoctor); // doctor or admin
router.delete("/cancel/:id", authMiddleware, cancelAppointment); // allowed with checks inside

router.put("/update-status", authMiddleware, roleMiddleware(["doctor"]), updateAppointmentStatus);

router.put("/add-prescription", authMiddleware, roleMiddleware(["doctor"]), addPrescription);




export default router;

