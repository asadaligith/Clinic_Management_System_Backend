import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  patientCnic: {
    type: String,
  },

  // Reference to Doctor (relation)
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  doctorName: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },

  appointmentTime: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "completed" ,"cancelled" ],
    default: "pending",
  },

  prescription: {
    type: String,
    default: "",
  },

}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
