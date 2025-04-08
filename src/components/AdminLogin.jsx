import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useStore from '../store';

function AdminLogin({ onClose, darkMode }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(credentials);
      if (success) {
        toast.success('Login successful');
        onClose();
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`relative w-full max-w-md p-6 rounded-xl shadow-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6 text-center">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 focus:ring-purple-500' 
                  : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
              } border`}
              placeholder="Admin username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 focus:ring-purple-500' 
                  : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
              } border`}
              placeholder="Admin password"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full mt-4 px-6 py-3 rounded-lg flex items-center justify-center gap-2 ${
              darkMode 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            } text-white font-medium transition-all`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Login</span>
              </>
            )}
          </motion.button>
          <p className='text-sm font-medium text-center text-red-500'>username: admin || password: admin</p>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AdminLogin;