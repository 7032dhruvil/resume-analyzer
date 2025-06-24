import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  Download, 
  Share2, 
  RefreshCw,
  Star,
  Target,
  Award,
  Clock,
  Users
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AnalysisResults = ({ result, fileName = "Resume", onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Add null check for result
  if (!result) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="card text-center">
          <p className="text-secondary-600">No analysis results available.</p>
        </div>
      </div>
    );
  }

  const analysis = result; // Use result as analysis

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success-100';
    if (score >= 60) return 'bg-warning-100';
    return 'bg-error-100';
  };

  const getScoreBorderColor = (score) => {
    if (score >= 80) return 'border-success-200';
    if (score >= 60) return 'border-warning-200';
    return 'border-error-200';
  };

  // Prepare chart data with null checks
  const sectionData = Object.entries(analysis.sections || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value?.score || 0,
    color: (value?.score || 0) >= 80 ? '#22c55e' : (value?.score || 0) >= 60 ? '#f59e0b' : '#ef4444'
  }));

  const pieData = [
    { name: 'Excellent', value: sectionData.filter(s => s.score >= 80).length, color: '#22c55e' },
    { name: 'Good', value: sectionData.filter(s => s.score >= 60 && s.score < 80).length, color: '#f59e0b' },
    { name: 'Needs Improvement', value: sectionData.filter(s => s.score < 60).length, color: '#ef4444' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'sections', label: 'Sections', icon: Target },
    { id: 'feedback', label: 'Feedback', icon: Lightbulb },
    { id: 'recommendations', label: 'Recommendations', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Analysis Results
            </h1>
            <p className="text-secondary-600">
              Analyzing: <span className="font-medium">{fileName}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Analysis</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Overall Resume Score
          </h2>
          
          <div className="flex justify-center mb-6">
            <div className={`relative w-32 h-32 rounded-full ${getScoreBgColor(analysis.overallScore || 0)} ${getScoreBorderColor(analysis.overallScore || 0)} border-4 flex items-center justify-center`}>
              <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore || 0)}`}>
                {analysis.overallScore || 0}%
              </span>
            </div>
          </div>
          
          <p className="text-lg text-secondary-700 mb-4">
            {analysis.summary || "Analysis summary not available."}
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-secondary-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{analysis.experienceLevel || "Not specified"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{analysis.industryFit || "General"}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-secondary-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Chart */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Section Performance
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectionData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Score Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sections' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {Object.entries(analysis.sections || {}).map(([key, section]) => (
                <div key={key} className="card">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-secondary-900 capitalize">
                      {key}
                    </h4>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(section?.score || 0)} ${getScoreColor(section?.score || 0)}`}>
                      {section?.score || 0}%
                    </div>
                  </div>
                  <p className="text-secondary-600 text-sm">
                    {section?.feedback || "No feedback available for this section."}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Strengths */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-success-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Strengths
                  </h3>
                </div>
                <ul className="space-y-2">
                  {(analysis.strengths || []).map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-secondary-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-warning-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Areas for Improvement
                  </h3>
                </div>
                <ul className="space-y-2">
                  {(analysis.weaknesses || []).map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-secondary-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Elements */}
              {(analysis.missingElements || []).length > 0 && (
                <div className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-primary-600" />
                    <h3 className="text-lg font-semibold text-secondary-900">
                      Missing Elements
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(analysis.missingElements || []).map((element, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-secondary-700">{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Suggestions */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Suggestions for Improvement
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(analysis.suggestions || []).map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-secondary-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-success-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Professional Recommendations
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(analysis.recommendations || []).map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                      <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-secondary-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords */}
              {(analysis.keywords || []).length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Key Skills & Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(analysis.keywords || []).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults; 