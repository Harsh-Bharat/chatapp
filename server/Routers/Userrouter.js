import express from "express";
import { checkAuth, login, signup, update } from "../controllers/signuplogin.js";
import { protectRoute } from "../middleware/Auth.js";
const userRouter=express.Router();
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.put("/update",protectRoute,update);
userRouter.get("/checkauth",protectRoute,checkAuth);

export default userRouter;  // server .js m bhejni bhi to h 
