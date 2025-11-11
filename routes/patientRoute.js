import express from 'express'
import {authMiddleware , roleMiddleware} from '../middleware/authMiddleware.js'
import {getAllPatients} from '../controllers/patientController.js'


const router = express.Router();

router.get("/patients", authMiddleware, roleMiddleware(["admin"]), getAllPatients);

export default router;
