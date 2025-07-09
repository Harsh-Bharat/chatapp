import React, { useContext } from 'react';
import assets from '../assets/assets';
import { imagesDummyData } from '../assets/assets.js';
import { AuthContext } from '../../context/AuthContext.jsx';
 
const RightSidebar = ({ selectedUser }) => {
  const { logout } = useContext(AuthContext);

  if (!selectedUser) return null; // Render nothing if no user is selected

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
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </h1>
          <p className="px-10 mx-auto">{selectedUser?.bio}</p>
        </div>

        {/* Divider */}
        <hr className="border-[#ffffff50] my-4" />

        {/* Media Section */}
        <div className="px-5 text-xs">
          <p className="mb-2">Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img
                  src={url}
                  alt=""
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="border-t border-gray-700 p-4">
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
