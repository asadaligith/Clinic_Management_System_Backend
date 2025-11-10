import express from "express";
import {bookAppointment, getAppointments, cancelAppointment} from '../controllers/appointmentController.js';

const router = express.Router();

router.post("/bookAppointment", bookAppointment);
router.get("/get-appointments", getAppointments);
router.delete("/cancel/:id", cancelAppointment)
// router.get("/get-appointment/:id", getAppointmentById); 

export default router;

