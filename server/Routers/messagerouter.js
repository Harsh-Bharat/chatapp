import express from "express"
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messagecontroler.js";
import { protectRoute } from "../middleware/Auth.js";
const messagerouter=express.Router();;
messagerouter.get("/mark/:id", protectRoute, markMessageAsSeen);
messagerouter.get("/users", protectRoute, getUsersForSidebar);
messagerouter.get("/:id", protectRoute, getMessages);
messagerouter.post("/send/:id", protectRoute, sendMessage);

export default messagerouter;