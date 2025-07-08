import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
const [messages, setMessages] = useState([]);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [unseenMessages, setUnseenMessages] = useState({});

const { socket, axios } = useContext(AuthContext);

// function to get all users for sidebar 
const getUsers = async () => {
  try {
    const { data } = await axios.get("/api/messages/users");
    if (data.success) {
      setUsers(data.users);
      setUnseenMessages(data.unseenMessages);
      setSelectedUser(data.users);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
// ---------------getmessages------------------------
const getMessages = async (userId) => {    
  try {
    const { data } = await axios.get(`/api/messages/${userId}`);   //userId frontend m likh dena Authuser._id se kyuki ye login ke sath ._id bnake laya h 
            
    if (data.success) {
      setMessages(data.messages);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// ---------------------------sendmessage-----------------------
const sendMessage = async (messageData) => {
  try {
    const { data } = await axios.post(
      `/api/messages/send/${selectedUser._id}`,
      messageData
    );
    if (data.success) {
      setMessages((prevMessages) => [...prevMessages, data.newMessage]);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
//to subscribe-------------
// function to subscribe to messages for selected user
const subscribeToMessages = async () => {
  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
    if (selectedUser && newMessage.senderId === selectedUser._id) {
      newMessage.seen = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      axios.put(`/api/messages/mark/${newMessage._id}`);
    } else {
      setUnseenMessages((prevUnseenMessages) => ({
        ...prevUnseenMessages,
        [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
          ? prevUnseenMessages[newMessage.senderId] + 1
          : 1,
      }));
    }
  });
};




// --------------------function to unsubscribe ----------------
// function to unsubscribe from messages
const unsubscribeFromMessages = () => {
  if (socket) socket.off("newMessage");
}

useEffect(() => {
  subscribeToMessages();
  return () => unsubscribeFromMessages();
}, [socket, selectedUser]);

  const value = {
    getUsers,users,setUnseenMessages,setMessages,messages,subscribeToMessages,unseenMessages,unsubscribeFromMessages,socket,setUsers,setSelectedUser,selectedUser
  }

  return (
    <ChatContext.Provider value={value}>
      { children }
    </ChatContext.Provider>
  )
}
