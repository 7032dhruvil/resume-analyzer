import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  Camera, 
  Shield, 
  Settings, 
  LogOut,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UserAccountModal = ({ isOpen, onClose, user, onLogout, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setIsEditing(false);
      
      // Update user data
      if (onUpdateProfile) {
        onUpdateProfile(profileData);
      }

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }, 2000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    });
  };

  const stats = [
    { label: 'Resumes Analyzed', value: '12', icon: <Shield className="w-4 h-4" /> },
    { label: 'Account Age', value: '3 months', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Last Login', value: 'Today', icon: <Settings className="w-4 h-4" /> }
  ];

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
            className="bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
                My Account
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 text-center mt-2">
                Manage your profile and account settings
              </p>
            </div>

            {/* Success Message */}
            {saveStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-6 mt-4 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                <span className="text-success-700 dark:text-success-300 font-medium">
                  Profile updated successfully!
                </span>
              </motion.div>
            )}

            <div className="p-6">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
                  />
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Camera className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mt-4">
                  {profileData.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {profileData.email}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg"
                  >
                    <div className="text-primary-600 dark:text-primary-400 mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-secondary-600 dark:text-secondary-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    Profile Information
                  </h4>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-600 dark:text-secondary-300 rounded-lg transition-colors duration-200"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-4 py-2 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-10 ${!isEditing ? 'bg-secondary-50 dark:bg-secondary-700 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-10 ${!isEditing ? 'bg-secondary-50 dark:bg-secondary-700 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-10 ${!isEditing ? 'bg-secondary-50 dark:bg-secondary-700 cursor-not-allowed' : ''}`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-10 ${!isEditing ? 'bg-secondary-50 dark:bg-secondary-700 cursor-not-allowed' : ''}`}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className={`input-field resize-none ${!isEditing ? 'bg-secondary-50 dark:bg-secondary-700 cursor-not-allowed' : ''}`}
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              {/* Account Actions */}
              <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                  Account Actions
                </h4>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                      <span className="text-secondary-700 dark:text-secondary-300">Account Settings</span>
                    </div>
                    <span className="text-secondary-400">→</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                      <span className="text-secondary-700 dark:text-secondary-300">Privacy & Security</span>
                    </div>
                    <span className="text-secondary-400">→</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onLogout}
                    className="w-full flex items-center justify-between p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg hover:bg-error-100 dark:hover:bg-error-900/30 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut className="w-5 h-5 text-error-600 dark:text-error-400" />
                      <span className="text-error-700 dark:text-error-300">Sign Out</span>
                    </div>
                    <span className="text-error-400">→</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserAccountModal; 