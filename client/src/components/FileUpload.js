import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, Play, RefreshCw } from 'lucide-react';
import { analyzeResume } from '../services/api';

const FileUpload = ({ onAnalysisComplete, isLoading, setIsLoading }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsLoading(true);
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeResume(uploadedFile);
      onAnalysisComplete({
        ...result.analysis,
        fileName: result.fileName || uploadedFile.name
      });
      
      // Scroll to analysis results
      setTimeout(() => {
        document.getElementById('analysis-results').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 500);
      
    } catch (error) {
      console.error('Analysis error:', error);
      // You can add toast notification here if needed
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setIsAnalyzing(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="max-w-2xl mx-auto">
      {!uploadedFile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
              Upload Your Resume
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Drag and drop your resume here, or click to browse
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive && !isDragReject 
                ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                : isDragReject 
                  ? 'border-error-400 bg-error-50 dark:bg-error-900/20' 
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center">
              {isDragReject ? (
                <AlertCircle className="w-12 h-12 text-error-500 mb-4" />
              ) : (
                <Upload className="w-12 h-12 text-primary-500 mb-4" />
              )}
              
              <p className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                {isDragReject 
                  ? 'Invalid file type' 
                  : isDragActive 
                    ? 'Drop your resume here' 
                    : 'Choose a file or drag it here'
                }
              </p>
              
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                {isDragReject 
                  ? 'Please upload a supported file type' 
                  : 'Supports PDF, DOC, DOCX, and TXT files up to 5MB'
                }
              </p>
              
              {!isDragReject && (
                <div className="flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Multiple formats supported</span>
                </div>
              )}
            </div>
          </div>

          {/* File Requirements */}
          <div className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-2">
              File Requirements:
            </h3>
            <ul className="text-sm text-secondary-600 dark:text-secondary-400 space-y-1">
              <li>• Supported formats: PDF, DOC, DOCX, TXT</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Text-based documents (not scanned images)</li>
              <li>• English language preferred</li>
            </ul>
          </div>

          {/* Privacy Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              Your resume is processed securely and not stored permanently. 
              We use AI to analyze your document and provide feedback.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
              File Ready for Analysis
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Your file has been uploaded successfully
            </p>
          </div>

          {/* File Info */}
          <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-primary-500" />
              <div className="text-left">
                <h3 className="font-semibold text-secondary-900 dark:text-white">
                  {uploadedFile.name}
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-3"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Analyze File</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              disabled={isAnalyzing}
              className="btn-secondary flex items-center justify-center space-x-2 px-8 py-3"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Upload New File</span>
            </motion.button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              Click "Analyze File" to start the AI-powered analysis of your resume.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload; 