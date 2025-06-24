import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess({
        user: {
          id: '1',
          name: formData.name || 'User',
          email: formData.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        token: 'mock-jwt-token'
      });
      onClose();
    }, 2000);
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setSocialLoading(null);
      
      // Mock user data based on provider
      const mockUsers = {
        github: {
          id: 'github-1',
          name: 'GitHub User',
          email: 'github.user@example.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        google: {
          id: 'google-1',
          name: 'Google User',
          email: 'google.user@example.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }
      };
      
      onAuthSuccess({
        user: mockUsers[provider],
        token: `mock-${provider}-token`
      });
      onClose();
    }, 3000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-secondary-200 dark:border-secondary-700">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
              </button>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white text-center">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 text-center mt-2">
                {isLogin ? 'Sign in to your account' : 'Join us and start analyzing resumes'}
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`input-field pl-10 ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-error-600 dark:text-error-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error-600 dark:text-error-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`input-field pl-10 pr-10 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error-600 dark:text-error-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`input-field pl-10 ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                        placeholder="Confirm your password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-error-600 dark:text-error-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                    </>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-secondary-300 dark:border-secondary-600"></div>
                <span className="px-4 text-sm text-secondary-500 dark:text-secondary-400">or continue with</span>
                <div className="flex-1 border-t border-secondary-300 dark:border-secondary-600"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('github')}
                  disabled={socialLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {socialLoading === 'github' ? (
                    <div className="w-5 h-5 border-2 border-secondary-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Github className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    {socialLoading === 'github' ? 'Connecting...' : 'GitHub'}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('google')}
                  disabled={socialLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {socialLoading === 'google' ? (
                    <div className="w-5 h-5 border-2 border-secondary-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    {socialLoading === 'google' ? 'Connecting...' : 'Google'}
                  </span>
                </motion.button>
              </div>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-secondary-600 dark:text-secondary-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 