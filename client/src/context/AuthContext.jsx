import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem('aarambh_admin_token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/api/admin/verify');
      if (response.data?.valid) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('aarambh_admin_token');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem('aarambh_admin_token', token);
    setIsAuthenticated(true);
    await checkToken();
  };

  const logout = () => {
    localStorage.removeItem('aarambh_admin_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
