import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const containerRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // GSAP animations for page entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    if (chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div 
          ref={containerRef}
          className="bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-7xl h-[calc(100vh-2rem)] border border-base-content/10 glass hover-lift"
        >
          <div className="flex h-full rounded-2xl overflow-hidden">
            {/* Sidebar with enhanced styling */}
            <div className="w-80 lg:w-96 border-r border-base-content/10">
              <Sidebar />
            </div>

            {/* Chat area with animation */}
            <div 
              ref={chatContainerRef}
              className="flex-1 flex flex-col"
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-xs text-base-content/30 font-mono">
        Pankaj's Chat App v1.0
      </div>
      
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-base-content/30">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-mono">System Online</span>
      </div>
    </div>
  );
};
export default HomePage;
