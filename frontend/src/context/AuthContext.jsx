import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('🔐 Attempting login with username:', username);
      console.log('📡 API URL:', api.defaults.baseURL);
      
      const { data } = await api.post('/admin/login', { username, password });
      
      console.log('✅ Login successful:', data);
      
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data));
      setAdmin(data);
      
      return { success: true };
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Server is not responding. Please start the backend server.';
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
