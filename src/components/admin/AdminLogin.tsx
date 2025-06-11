import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, User } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (isAuthenticated) {
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (err) {
      setError('Login failed. Please verify your credentials or contact the administrator if the issue persists.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section id="login" className="py-24 bg-gray-900 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 pl-10 pr-4 text-white"
                  placeholder="Enter admin email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg py-3 pl-10 pr-4 text-white"
                  placeholder="Enter password"
                />
              </div>
            </div>
            
            {error && (
              <div className="p-4 rounded-lg bg-red-500 bg-opacity-20 text-red-300">
                {error}
                <p className="mt-2 text-sm">
                  Note: This login is restricted to administrators only. If you need access, please contact the system administrator.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;