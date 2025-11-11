
import Doctor from "../models/doctor.js";

export const addDoctor = async (req, res) => {
  try {
    const { name, email, specialization, experience, phone , timing, days, date } = req.body;
    const existing = await Doctor.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Doctor already exists" });

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

    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
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
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email phone")
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
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
