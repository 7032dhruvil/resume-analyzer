import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UserAccountModal from './components/UserAccountModal';
import { Brain, Zap, Shield, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserAccountModalOpen, setIsUserAccountModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (authData) => {
    setUser(authData.user);
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsUserAccountModalOpen(false);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(prev => ({ ...prev, ...updatedProfile }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedProfile }));
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms provide comprehensive resume insights and optimization suggestions."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get detailed analysis results in seconds, not minutes. Optimized for speed and efficiency."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never stored permanently. Your privacy is our top priority."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Industry Expertise",
      description: "Built with insights from HR professionals and industry experts across various sectors."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Tech Corp",
      content: "The AI analysis helped me identify key areas for improvement. I got my dream job within 2 weeks!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Digital Solutions",
      content: "Incredible insights! The analysis highlighted skills I didn't even realize were valuable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Creative Studio",
      content: "Professional, accurate, and incredibly helpful. This tool is a game-changer for job seekers.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Header 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsUserAccountModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                AI-Powered Resume Analysis
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get instant, professional feedback on your resume with our advanced AI technology. 
                Stand out in today's competitive job market.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-primary-50"
              >
                Start Analyzing Now
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-secondary-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                Why Choose Our AI Analyzer?
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
                Experience the future of resume optimization with cutting-edge AI technology
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                    <div className="text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload-section" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                Analyze Your Resume
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
                Upload your resume and get instant AI-powered feedback and optimization suggestions
              </p>
            </motion.div>

            <FileUpload 
              onAnalysisComplete={setAnalysisResult}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {analysisResult && (
              <motion.div
                id="analysis-results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <AnalysisResults 
                  result={analysisResult} 
                  fileName={analysisResult.fileName || "Resume"}
                  onReset={() => setAnalysisResult(null)}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-secondary-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
                Join thousands of satisfied users who have transformed their careers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-300 italic">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-primary-100">Resumes Analyzed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-primary-100">Accuracy Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-primary-100">Happy Users</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-primary-100">Available</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* User Account Modal */}
      <UserAccountModal
        isOpen={isUserAccountModalOpen}
        onClose={() => setIsUserAccountModalOpen(false)}
        user={user}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

export default App; 