import cloudinary from "../config/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/schema.js";
import { hashmap, io } from "../server.js";

// Get all users except the logged-in user, along with unseen message counts
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");
    const unseenMessages = {};

    await Promise.all(filteredUsers.map(async (user) => {
      const count = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false
      });
      if (count > 0) {
        unseenMessages[user._id.toString()] = count;
      }
    }));

    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to mark a message as seen using message ID
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all messages between the logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params; // ID of the other user
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId }
      ]
    });

    // Mark as seen where the other user sent them to me and were unseen
    await Message.updateMany(
      { senderId: id, receiverId: myId, seen: false },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send a message (with optional image)
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl = null;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    // Emit message to receiver if online
    const receiversocketid = hashmap[receiverId];
    if (receiversocketid) {
      io.to(receiversocketid).emit("newMessage", newMessage);
    }

    res.json({ success: true, message: newMessage });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
