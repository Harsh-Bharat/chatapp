import React, { useContext, useState } from 'react';
import assets from '../assets/assets.js';
import { ChatContext } from '../../context/ChatContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, sendMessage, selectedUser } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const myUserId = authUser?._id;
  const [input, setInput] = useState("");

  // Message sending function
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  // Safe check for online status
  const isOnline =
    Array.isArray(onlineUsers) &&
    selectedUser &&
    selectedUser._id &&
    onlineUsers.includes(selectedUser._id.toString());

  if (!selectedUser) {
    return (
      <div className="fixed bottom-20 right-40 h-full w-[400px] flex flex-col justify-center items-center z-100">
        <img
          src={assets.logo_icon}
          alt="QuickChat Logo"
          className="w-16 h-16 object-contain"
        />
        <h2 className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 drop-shadow-lg">
          Welcome to QuickChat!
        </h2>
        <p className="mt-2 text-lg text-gray-300 italic text-center max-w-xs">
          Connect, chat, and share moments instantly with friends around the world.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col text-white relative">
      {/* Header - fixed at top */}
<div className="flex justify-between items-center px-6 py-4 border border-violet-500 rounded-xl shadow-md ">
        <div className="flex justify-between items-center px-4 pt-4 " >
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-base">{selectedUser.fullName}</span>
          <span
            className={`h-3 w-3 rounded-full ml-2 border-2 border-[#282142] ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}
            title={isOnline ? 'Online' : 'Offline'}
          ></span>
        </div>
        <img src={assets.help_icon} alt="Help" className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Chat messages - scrollable area */}
    <div className="px-4 overflow-y-auto max-h-[calc(100vh-160px)] space-y-4 pr-2 pb-4 scrollbar-hide">
        {messages.map((msg) => {
          const isSender = msg.senderId === myUserId;
          const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              {!isSender && (
                <img
                  src={selectedUser.profilePic}
                  alt="receiver"
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm relative ${
                  isSender
                    ? 'bg-violet-500 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="sent media"
                    className="mt-2 rounded-md max-w-full h-auto"
                  />
                )}
                <p className="text-[10px] text-gray-300 text-right mt-1">{time}</p>
              </div>
           {isSender && (
  <img
    src={authUser?.profilePic || assets.profile_martin}
    alt="sender"
    className="w-6 h-6 rounded-full object-cover"
  />
)}

            </div>
          );
        })}
      </div>

      {/* Typing Bar - fixed at bottom */}
      <form
        className="absolute bottom-0 left-0 w-full flex items-center gap-3 p-4 bg-[#282142] border-t border-gray-600 z-10"
        style={{ height: "50px" }}
        onSubmit={handleSubmitMessage}
      >
        {/* File input for image sending */}
        <label className="cursor-pointer">
          <span className="bg-gray-700 hover:bg-violet-500 px-3 py-2 rounded-full text-sm font-medium flex items-center justify-center mr-2">
            📎
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSendImage}
          />
        </label>
        <input
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={(e) => e.key === "Enter" ? handleSubmitMessage(e) : null}
          className="flex-1 bg-[#1c1c2e] text-sm text-white px-4 py-2 rounded-full outline-none border border-gray-600"
        />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-full text-sm font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
