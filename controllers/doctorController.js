import Doctor from "../models/doctor.js";

export const addDoctor = async (req, res) => {
  try {
    const { name, email, specialization, experience, phone } = req.body;
    const existing = await Doctor.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Doctor already exists" });

    const newDoctor = await Doctor.create({
      name,
      email,
      specialization,
      experience,
      phone,
    });

    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
