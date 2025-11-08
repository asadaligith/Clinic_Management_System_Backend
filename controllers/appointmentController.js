import appointment from "../models/appointment.js";

export const bookAppointment = async (req , res) => {
    try{
       const { patientName, email, phone, cnic, doctorId, date } = req.body;
       const newAppointment = await appointment.create({
            patientName,
            patientEmail: email,
            patientPhone: phone,
            patientCnic: cnic,
            doctor: doctorId,
            appointmentDate: date,
            status: "pending"
        });
        res.status(201).json({ message: "Appointment booked successfully", bookAppointment: newAppointment });


    } catch(error){
        res.status(500).json({ message: error.message });

    };
}