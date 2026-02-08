import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Animate messages entrance
    if (messagesContainerRef.current && messages?.length > 0) {
      const messageElements = messagesContainerRef.current.querySelectorAll('.chat-message');
      gsap.fromTo(
        messageElements,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.3, 
          stagger: 0.1, 
          ease: "power2.out" 
        }
      );
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="loading-dots flex justify-center space-x-2">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span className="w-3 h-3 bg-primary rounded-full"></span>
            </div>
            <p className="text-base-content/60">Loading messages...</p>
          </div>
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05, 
              ease: "power2.out" 
            }}
            className={`chat chat-message ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={index === messages.length - 1 ? messageEndRef : null}
          >
            <div className="chat-image avatar">
              <motion.div 
                className="size-12 rounded-full border-2 border-primary/20 overflow-hidden hover-lift"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 font-mono">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            
            <motion.div 
              className={`chat-bubble flex flex-col max-w-xs lg:max-w-md ${
                message.senderId === authUser._id 
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" 
                  : "bg-base-200 text-base-content"
              } shadow-lg`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {message.image && (
                <motion.img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {message.text && (
                <p className="text-sm leading-relaxed break-words">
                  {message.text}
                </p>
              )}
            </motion.div>
          </motion.div>
        ))}
        
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-4"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-base-content">Start a conversation</h3>
              <p className="text-base-content/60">Send your first message to {selectedUser.fullName}</p>
            </div>
          </motion.div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
