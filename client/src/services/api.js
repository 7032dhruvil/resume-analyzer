import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for file uploads
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading indicator or other request logic here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.error || 'Invalid request. Please check your file.');
        case 401:
          throw new Error('Authentication required.');
        case 403:
          throw new Error('Access denied.');
        case 404:
          throw new Error('Service not found.');
        case 413:
          throw new Error('File too large. Please upload a smaller file.');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 500:
          throw new Error(data.error || 'Server error. Please try again later.');
        default:
          throw new Error(data.error || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
);

// API functions
export const analyzeResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await api.post('/analyze-resume', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 