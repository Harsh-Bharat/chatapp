import express from "express";
import cors from "cors"
import "dotenv/config";
import http from "http";
import {connectDB }from "./config/mongodb.js";
import userRouter from "./Routers/Userrouter.js";
import messagerouter from "./Routers/messagerouter.js";
import { Server } from "socket.io";

import { Socket } from "dgram";


// create express app and a http server
const app=express();
const server =http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// ---------------socket connection -----------------------
export const hashmap={};  // to store all the online users 
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  // Now you can use userId as needed
  console.log("User connected:", userId);     
  if(userId){
    hashmap[userId]=Socket.id;
  }
  io.emit("getonlineusers",Object.keys(hashmap)); // this will return the userID's who are in map
 io.on("disconnect",(Socket)=>{
  console.log("user disconnected");
  delete hashmap[userId];
    io.emit("getonlineusers",Object.keys(hashmap));
 })
})

// middlware setup
app.use(cors());

app.use(express.json({limit:"4mb"}));
await connectDB();
app.use("/api/status",(req,res)=>res.send("api kaam krri h"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messagerouter);

const PORT =process.env.PORT||5000;
server.listen(PORT,()=>console.log("server is running on port"+PORT));
