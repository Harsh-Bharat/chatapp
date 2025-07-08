import User from "../models/schema.js";
import jwt from "jsonwebtoken";
// middleware to protect route 
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.json({ success: false, message: "User not found" });

    req.user = user;   // ye provide  krdo jise bhi req.user ,req.user._id vghra chahie   protectroute se 
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

