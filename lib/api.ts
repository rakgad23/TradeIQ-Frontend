import axios from 'axios';

// Debug logging for API configuration
const baseURL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:8000';
console.log('🔧 API Configuration:', {
  baseURL,
  env: (import.meta as any).env,
  timestamp: new Date().toISOString()
});

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging for requests
    console.log('🔍 API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
      timestamp: new Date().toISOString()
    });
    
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle auth token refresh and errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      timestamp: new Date().toISOString()
    });
    return response;
  },
  async (error) => {
    console.error('❌ API Response Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      timestamp: new Date().toISOString()
    });

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
          const { access_token, refresh_token } = response.data;
          
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        // Refresh failed, just clear local data without redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        // Don't redirect to prevent infinite loops
      }
    }
    
    return Promise.reject(error);
  }
); 