import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Doctor from "../models/doctor.js"; // <-- import Doctor model

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🩺 Try finding user from both User & Doctor collections
    let user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // if not found in User model, check Doctor
      user = await Doctor.findById(decoded.id);
      if (user) {
        // Manually add role field since Doctor model may not have it
        user.role = "doctor";
      }
    }

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach found user/doctor to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired token" });
  }
};

// ✅ Role check middleware
export const roleMiddleware = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
  next();
};
