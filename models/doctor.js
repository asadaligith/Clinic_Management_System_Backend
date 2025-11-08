import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience field is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    timing: {
      type: String,
      required: [true, "Timing is required"], 
  },
    days: {
      type: String,
      required: [true, "Days are required"],  
},
    date: {
      type: String,
      required: [true, "Date is required"],  
},
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// Export model
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
