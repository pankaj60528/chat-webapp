import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useRef } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { gsap } from "gsap";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const appRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // GSAP animations for app entrance
    if (appRef.current) {
      gsap.fromTo(
        appRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  if (isCheckingAuth && !authUser)
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Loader className="size-16 animate-spin text-white mx-auto mb-4" />
          <div className="loading-dots flex justify-center space-x-2">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-white rounded-full"></span>
          </div>
          <p className="text-white mt-4 text-lg font-medium">Loading Pankaj's Chat...</p>
        </div>
      </div>
    );

  return (
    <div ref={appRef} data-theme={theme} className="min-h-screen">
      <div className="fixed inset-0 gradient-bg opacity-10 pointer-events-none"></div>
      
      <Navbar className="relative z-50" />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            border: '1px solid',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};
export default App;
