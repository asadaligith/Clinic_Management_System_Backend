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