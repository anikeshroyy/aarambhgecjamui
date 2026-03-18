import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Direct REST call to our Express node server
      const response = await api.post('/api/admin/login', { email, password });
      
      if (response.data && response.data.token) {
        // Wait for useAuth context to fully mount the token and user state
        await login(response.data.token);
        toast.success(response.data.message || 'Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Invalid Credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white dark:bg-dark-card rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Admin Login</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Aarambh 3.0 Dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="admin@gec.jamui.ac.in"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-yellow-600'} text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-card`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
