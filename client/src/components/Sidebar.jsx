// src/components/Sidebar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const { users, selectedUser, setSelectedUser, getUsers } = useContext(ChatContext);

  // Corrected filter logic
  const filteredUsers = input
    ? users.filter(user =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [onlineUsers]);

  // Debug: See if users are fetched
  // console.log(users);

  return (
    <div
      className={`pb-5 text-white max-h-screen overflow-hidden ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center px-4 pt-4">
        <img src={assets.logo} alt="logo" className="max-w-40" />

        <div className="relative py-2 group">
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="max-h-5 cursor-pointer"
          />
          <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
            <p
              onClick={() => navigate('/profile')}
              className="cursor-pointer text-sm"
            >
              Edit Profile
            </p>
            <hr className="my-2 border-t border-gray-500" />
            <p
              onClick={(e) => {
                e.stopPropagation();
                logout();
              }}
              className="cursor-pointer text-sm"
            >
              Logout
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="bg-[#282142] rounded-full flex items-center gap-2 px-4 py-2">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 object-contain"
          />
          <input
            type="text"
            placeholder="Type here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* User List */}
      <div className="px-4 overflow-y-auto max-h-[calc(100vh-160px)] space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700">
        {filteredUsers.length === 0 && (
          <div className="text-gray-400 text-center mt-8">No users found.</div>
        )}

        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
    onClick={() => {
  console.log("Selected user:", user.bio);
  setSelectedUser(user);
}}

            className={`relative flex items-center gap-4 bg-[#282142] p-3 rounded-xl text-white hover:bg-[#3a2a60] transition cursor-pointer ${
              selectedUser && selectedUser._id === user._id ? 'ring-2 ring-violet-500' : ''
            }`}
          >
            {/* Index badge */}
            <span className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center bg-violet-500/50 rounded-full">
              {index + 1}
            </span>

            <img
              src={user.profilePic}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2">
                {user.fullName}
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    onlineUsers.includes(user._id) ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                </span>
              </h4>
              <p className="text-xs text-gray-300">{user.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
