import express from "express";
import {bookAppointment} from '../controllers/appointmentController.js';

const router = express.Router();

router.post("/book-appointment", bookAppointment);
// router.get("/get-appointments", getAllAppointments);
// router.get("/get-appointment/:id", getAppointmentById); 

export default router;

