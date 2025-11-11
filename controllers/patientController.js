import Appointment from "../models/appointment.js";

export const getAllPatients = async (req, res) => {
  try {
    const appts = await Appointment.find(); // removed populate
    const seen = new Map();

    appts.forEach(a => {
      if (a.patientEmail) {
        seen.set(a.patientEmail, {
          name: a.patientName,
          email: a.patientEmail,
          phone: a.patientPhone,
        });
      }
    });

    res.status(200).json({ success: true, data: Array.from(seen.values()) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
