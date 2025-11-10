import Appointment from "../models/appointment.js";

export const bookAppointment = async (req , res) => {
    try{
       const { patientName, email, phone, cnic, doctor, date } = req.body;

       if (!doctor) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }
       
       const newAppointment = await Appointment.create({
        patientName,
        patientEmail: email,
        patientPhone: phone,
        patientCnic: cnic,
        doctor,                
        appointmentDate: date,
        status: "pending"
});
        res.status(201).json({ message: "Appointment booked successfully", bookAppointment: newAppointment });
        console.log("REQ BODY:", req.body);

    } catch(error){
        res.status(500).json({ message: error.message });

    };
}


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
