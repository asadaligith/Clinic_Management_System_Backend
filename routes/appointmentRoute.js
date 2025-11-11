import express from "express";
import {authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js'
import {bookAppointment, getAppointments, cancelAppointment, getAppointmentsByUser} from '../controllers/appointmentController.js';
import { getAppointmentsByDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/bookAppointment", authMiddleware, roleMiddleware(["patient"]), bookAppointment);
router.get("/get-appointments", authMiddleware, roleMiddleware(["admin"]), getAppointments); // admin view
router.get('/get-appointment', authMiddleware, getAppointmentsByUser); // user or admin permitted with checks
router.get("/doctor/:doctorId", authMiddleware, getAppointmentsByDoctor); // doctor or admin
router.delete("/cancel/:id", authMiddleware, cancelAppointment); // allowed with checks inside



export default router;

