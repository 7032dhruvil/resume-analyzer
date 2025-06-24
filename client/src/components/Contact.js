import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      details: ["hello@resumeanalyzer.com", "support@resumeanalyzer.com"],
      color: "text-primary-600 dark:text-primary-400"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "text-success-600 dark:text-success-400"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      details: ["123 Innovation Drive", "San Francisco, CA 94105"],
      color: "text-warning-600 dark:text-warning-400"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM-6PM PST", "Sat-Sun: 10AM-4PM PST"],
      color: "text-error-600 dark:text-error-400"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI achieves 95% accuracy in resume analysis, providing detailed insights on formatting, content, and optimization opportunities."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use enterprise-grade encryption and never store your resume permanently. Your privacy is our top priority."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, DOC, DOCX, and TXT files. For best results, we recommend using PDF format."
    },
    {
      question: "How long does analysis take?",
      answer: "Analysis typically completes in 10-30 seconds, depending on the complexity and length of your resume."
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Have questions about our AI resume analyzer? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 card"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-6">
              Send us a Message
            </h3>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                <span className="text-success-700 dark:text-success-300 font-medium">
                  Message sent successfully! We'll get back to you soon.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`w-10 h-10 bg-secondary-100 dark:bg-secondary-800 rounded-lg flex items-center justify-center ${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-secondary-600 dark:text-secondary-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Quick Questions
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-4"
                  >
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 text-sm">
                      {faq.question}
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-300 text-xs">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map/Office Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card text-center"
        >
          <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
            Visit Our Office
          </h3>
          <p className="text-secondary-600 dark:text-secondary-300 mb-6">
            We're located in the heart of San Francisco's tech district
          </p>
          <div className="bg-secondary-200 dark:bg-secondary-700 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
              <p className="text-secondary-600 dark:text-secondary-400">
                Interactive Map Coming Soon
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 