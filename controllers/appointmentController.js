import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";

export const bookAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, cnic, doctor, date } = req.body;

    const doctorInfo = await Doctor.findById(doctor);
    if (!doctorInfo) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = new Appointment({
      patientName,
      patientEmail: email,
      patientPhone: phone,
      patientCnic: cnic,
      doctor,
      doctorName: doctorInfo.name, // ✅ added doctor name
      appointmentDate: date,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
};


export const getAppointments = async (req, res) => {
  try {
    const Appointments = await Appointment.find()
        .populate("doctor", "name specialization") 
         .sort({ createdAt: -1 });
        res.status(200).json({
      success: true,
      message: "All Appointments fetched successfully",
      data: Appointments,
    });
  } catch (error) {
    console.error("Error fetching Appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Appointments",
      error: error.message,
    });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    // req.user comes from authMiddleware
    const userEmail = req.user.email;

    const appointments = await Appointment.find({ patientEmail: userEmail })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments by user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// 🗑️ Cancel (Delete) Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
      error: error.message,
    });
  }
};



export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Allowed statuses
    const allowedStatus = ["pending", "confirmed", "completed", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: error.message,
    });
  }
};


export const addPrescription = async (req, res) => {
  try {
    const { id, prescription } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        prescription,
        status: "completed",
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Prescription saved & appointment completed",
      data: updated,
    });

  } catch (error) {
    console.error("Prescription error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding prescription",
      error: error.message,
    });
  }
};
