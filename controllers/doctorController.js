
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