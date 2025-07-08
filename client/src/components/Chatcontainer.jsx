import React, { useRef, useEffect } from 'react';
import assets from '../assets/assets.js';
import { messagesDummyData } from '../assets/assets.js';

const myUserId = 'ksj';

const ChatContainer = ({ selectedUser }) => {


 

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
    <div className="
    
    
    
    
   h-full w-full overflow-y-auto scrollbar-hide px-4 py-2
    style={{ maxHeight: 'calc(100vh - 160px)' }}
  
    
    
    
    
    ">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-600 bg-[#282142]">
        <div className="flex items-center gap-2">
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-sm">{selectedUser.fullName}</span>
          <span className="h-2 w-2 bg-green-500 rounded-full" />
        </div>
        <img src={assets.help_icon} alt="Help" className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messagesDummyData.map((msg) => {
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
                  src={assets.profile_martin}
                  alt="sender"
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
       
      </div>

      {/* Typing Bar */}
      <div className="w-full flex items-center gap-3 p-3 bg-[#282142] border-t border-gray-600">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-[#1c1c2e] text-sm text-white px-4 py-2 rounded-full outline-none border border-gray-600"
        />
        <button className="bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-full text-sm font-medium">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
