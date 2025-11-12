import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body; // ✅ frontend se fullname aata hai, name nahi
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name :fullname, // ✅ change name → fullname
      email,
      password: hashedPassword,
      role,
    });

    // ✅ token generate
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        fullname: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  try {
    console.log("Login hit:", req.body);
    const { email, password } = req.body;

    // 🔍 find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔐 password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 🎫 generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Return complete user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname || user.name, // handle both patient/doctor
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};
