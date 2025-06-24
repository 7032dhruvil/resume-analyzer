import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Users, Award, Target, TrendingUp, Lightbulb } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your resume with precision and provide actionable insights."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get comprehensive analysis results in seconds, not minutes. Optimized for speed and efficiency."
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

  const stats = [
    { number: "50K+", label: "Resumes Analyzed", icon: <Target className="w-6 h-6" /> },
    { number: "95%", label: "Accuracy Rate", icon: <Award className="w-6 h-6" /> },
    { number: "10K+", label: "Happy Users", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Available", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead AI Engineer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Expert in machine learning and natural language processing with 8+ years of experience."
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate about creating user-centric solutions that solve real-world problems."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Dedicated to crafting beautiful, intuitive experiences that users love."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            About Resume Analyzer
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how job seekers approach their resumes with cutting-edge AI technology. 
            Our mission is to help you stand out in today's competitive job market.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
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
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8 mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
            Our Impact in Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600 dark:text-primary-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary-600 dark:text-secondary-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
            Meet Our Team
          </h3>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-2xl mx-auto">
            We're a passionate team of engineers, designers, and product experts dedicated to helping you succeed.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100 dark:border-primary-900"
                />
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-secondary-600 dark:text-secondary-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h3 className="text-3xl font-bold mb-4">
              Our Mission
            </h3>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              To democratize access to professional career guidance by leveraging AI technology, 
              helping millions of job seekers worldwide achieve their career goals with confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 