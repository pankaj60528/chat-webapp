import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // GSAP animations for form entrance
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
    }
    
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Button animation
    gsap.to(e.target.querySelector('button[type="submit"]'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-20"></div>
      
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        <div ref={formRef} className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div ref={titleRef} className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover-lift"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold mt-4 gradient-text">Welcome Back</h1>
              <p className="text-base-content/60 text-lg">Sign in to your account</p>
              <div className="flex items-center gap-1 text-sm text-base-content/40">
                <Sparkles className="w-4 h-4" />
                <span>Pankaj's Chat App</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 glass focus-glow hover-lift text-base-content"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 glass focus-glow hover-lift text-base-content"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </motion.button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full btn-gradient text-white font-semibold py-3 rounded-xl shadow-lg hover-lift"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign in
                </>
              )}
            </motion.button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link 
                to="/signup" 
                className="link link-primary font-semibold hover:text-blue-600 transition-colors"
              >
                Create account
              </Link>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-base-content/30">
              <span>Secure</span>
              <span>•</span>
              <span>Fast</span>
              <span>•</span>
              <span>Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Image/Pattern */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-30"></div>
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={"Sign in to continue your conversations and catch up with your messages."}
        />
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};
export default LoginPage;
