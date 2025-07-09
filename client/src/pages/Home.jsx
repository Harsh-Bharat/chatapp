import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/Chatcontainer';
import RightSidebar from '../components/Rightsidebar.jsx';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext.jsx';

const Home = () => {
  const {selectedUser, setSelectedUser} = useContext(ChatContext)

  return (
    <div className="w-full h-screen sm:px-[5%] sm:py-[1%]">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid sm:grid-cols-3 grid-cols-1 absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-700 z-0">
    

        {/* Sidebar always visible on large screens */}
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        {/* Chat in middle */}
        <ChatContainer />

        {/* Right Sidebar */}
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Home;
