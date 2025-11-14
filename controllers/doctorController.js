import mongoose from "mongoose";
import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const addDoctor = async (req, res) => {
  try {
    const { name, email, specialization, experience, phone, timing, days, date } = req.body;

    // Check if doctor already exists in Doctor Collection
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: "Doctor already exists" });

    // Check if doctor exists in User Collection
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User with this email already exists" });

    // Auto-generate password for doctor
    const defaultPassword = "doctor123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create doctor in Doctor Collection
    const newDoctor = await Doctor.create({
      name,
      email,
      specialization,
      experience,
      phone,
      timing,
      days,
      date,
    });

    // Create doctor in User Collection WITH SAME ID
    await User.create({
      _id: newDoctor._id, // same ID
      name: name,
      email: email,
      password: hashedPassword,
      role: "doctor",
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: newDoctor,
      loginInfo: {
        email,
        password: defaultPassword,
      }
    });

  } catch (error) {
    console.error("Add doctor error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: "All doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};


export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
  }
};


// get appointments for a specific doctor
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }

    const appointments = await Appointment.find({ doctor: id })
      .sort({ appointmentDate: 1 })
      .populate("doctor", "name specialization");

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const cancelDoctor = async (req, res)=>{
  try {
    const { id } = req.params; 
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error cancelling Doctor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel Doctor",
      error: error.message,
    });
  }
  }
