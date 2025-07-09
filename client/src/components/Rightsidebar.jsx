import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { imagesDummyData } from '../assets/assets.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';
 
const RightSidebar = ({ selectedUser }) => {
  const { logout ,onlineUsers} = useContext(AuthContext);
  const { messages} = useContext(ChatContext);
  const [imagemessages,setimagemessages]=useState([]);
  
  useEffect(() => {
    // Filter messages that contain an image (depending on your structure)
    const onlyImages = messages.filter(a =>a.image).map(a =>a.image);
    setimagemessages(onlyImages);
  }, [messages]);

  if (!selectedUser) return null; // Render nothing if no user is selected
const isOnline =
    Array.isArray(onlineUsers) &&
    selectedUser &&
    selectedUser._id &&
    onlineUsers.includes(selectedUser._id.toString());

  return (
    <div className="h-full w-full  text-white relative flex flex-col border-l border-gray-400">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Info */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="w-20 aspect-[1/1] rounded-full"
            alt={selectedUser?.fullName}
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {selectedUser?.fullName}
             <span
            className={`h-3 w-3 rounded-full ml-2 border-2 border-[#282142] ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}
            title={isOnline ? 'Online' : 'Offline'}
          ></span>
          </h1>
          <p className="px-10 mx-auto">{selectedUser?.bio}</p>
        </div>

        {/* Divider */}
        <hr className="border-[#ffffff50] my-4" />

        {/* Media Section */}
        <div className="px-5 text-xs">
          <p className="mb-2">Media</p>
         <div className="mt-2 max-h-[400px] w-[450px] overflow-y-scroll grid grid-cols-5 gap-4 opacity-80 scrollbar-hide">
{imagemessages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img
                  src={url}
                  alt=""
                  className=" w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div   className="absolute bottom-0 left-0 w-full flex items-center gap-3 p-4 bg-[#282142] border-t border-gray-600 z-10"
        style={{ height: "50px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            logout();
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
