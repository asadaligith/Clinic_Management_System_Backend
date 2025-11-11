export const getAllPatients = async (req, res) => {
  try {
    const appts = await Appointment.find().populate("user", "name email phone");
    const seen = new Map();
    appts.forEach(a => {
      if (a.user) seen.set(a.user._id.toString(), a.user);
      else {
        // if you store patientEmail instead of user ref, aggregate by email
        seen.set(a.patientEmail, { name: a.patientName, email: a.patientEmail, phone: a.patientPhone });
      }
    });
    res.status(200).json({ success: true, data: Array.from(seen.values()) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};