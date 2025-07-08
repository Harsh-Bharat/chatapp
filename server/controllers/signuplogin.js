
import cloudinary from "../config/cloudinary.js";
import { generatetoken } from "../config/generatetoken.js";
import User from "../models/schema.js";
import bcrypt from "bcryptjs";

// Signup a new user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generatetoken({userId:newUser._id}); //  jo newUser create kia uske lie token generate krne ka function in config m pda h generatetoken.jsx file  hm newly ceated user ki ek unique id hoti h 

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
// ----------------------------------login-------------------------------------
// Controller to login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Remove password from userData before sending
    const user = userData.toObject();
    delete user.password;

    const token = generatetoken({ userId: userData._id });

    res.json({ success: true, userData: user, token, message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//----------------------------- controller to check the authenticated user -----------------------
export const checkAuth=(req,res)=>{
res.json({
  success:true,
  user:req.user   // protectroute auth se user variable mil jaega ise 
})
};
//-------------------------------updatedetails-------------------------------------
// controllers/userController.js or similar

export const update = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      // Only update name and bio
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      ).select("-password");
    } else {
      // Upload image to Cloudinary first, then update
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      ).select("-password");
    }

    res.json({ success: true, message: "Updated!!", user: updatedUser });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
