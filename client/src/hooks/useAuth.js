import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
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
      // With our new JWT system, we verify the token against our /api/admin/verify endpoint
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
    // Force a re-evaluation of the token validity with the backend so React Context 
    // finishes loading before the component finishes the navigate('/admin/dashboard') promise
    await checkToken();
  };

  const logout = () => {
    localStorage.removeItem('aarambh_admin_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, loading, user, login, logout, checkToken };
};

export default useAuth;
