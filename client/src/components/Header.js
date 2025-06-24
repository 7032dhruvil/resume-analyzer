import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Sun, Moon, Menu, X, User, LogIn, LogOut } from 'lucide-react';

const Header = ({ user, onLoginClick, onProfileClick, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900 dark:text-white">Resume Analyzer</h1>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">AI-Powered Analysis</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-300 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </motion.button>
            )}

            {/* Social Links */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-secondary-200 dark:border-secondary-700"
          >
            <nav className="flex flex-col space-y-4 mt-4">
              <a
                href="#features"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-2 border-t border-secondary-200 dark:border-secondary-700">
                {user ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        onProfileClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg w-full"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </button>
                    <button 
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-300 rounded-lg transition-colors duration-200 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      onLoginClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 w-full"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 