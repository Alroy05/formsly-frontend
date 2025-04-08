import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Lock, Unlock, SendHorizontal, Eye, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import useStore from './store';
import AdminLogin from './components/AdminLogin';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const { isAuthenticated, checkAuth, fetchFeedbacks } = useStore();
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleAdminModal = () => {
    if (!isAuthenticated) {
      setAdminModalOpen(!adminModalOpen);
    }
  };

  const handleToggleView = async () => {
    if (showFeedbacks) {
      // Simply toggle back to form
      setShowFeedbacks(false);
    } else {
      // Need auth to view feedbacks
      if (isAuthenticated) {
        await fetchFeedbacks();
        setShowFeedbacks(true);
      } else {
        toast.error('Please login as admin to view feedbacks');
        setAdminModalOpen(true);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800'}`}>
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-12 gap-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Formsly
          </motion.h1>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-800 shadow-md'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAdminModal}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white shadow-md'} ${isAuthenticated ? 'text-green-500' : ''}`}
            >
              {isAuthenticated ? <Unlock size={20} /> : <Lock size={20} />}
            </motion.button>
          </div>
        </header>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-4 md:p-6 backdrop-blur-md ${darkMode ? 'bg-gray-800/60' : 'bg-white/50'} shadow-lg w-full max-w-2xl`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl font-semibold">
                {showFeedbacks ? 'Feedback Submissions' : 'Submit Your Feedback'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleView}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto ${
                  darkMode 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white transition-all`}
              >
                {showFeedbacks ? (
                  <>
                    <SendHorizontal size={18} />
                    <span>Submit Feedback</span>
                  </>
                ) : (
                  <>
                    <Eye size={18} />
                    <span>View Feedbacks</span>
                  </>
                )}
              </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              {showFeedbacks ? (
                <motion.div
                  key="feedback-list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeedbackList darkMode={darkMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="feedback-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeedbackForm darkMode={darkMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <footer className="mt-8 md:mt-12 py-4 text-center text-sm">
          <p>Created with 💖 by Alroy Pereira<br /> Frontend Repository: <a href="https://github.com/Alroy05/formsly-frontend" className='text-blue-500 underline'>https://github.com/Alroy05/formsly-frontend</a><br />
          Backend Repository: <a href="https://github.com/Alroy05/formsly-backend" className='text-blue-500 underline'>https://github.com/Alroy05/formsly-backend</a>
          <br /><p>Tech Stack: React, TailwindCSS, Zustand, React-Hock-Form, Express, MongoDB, JSONWebToken</p>
           </p>
          
        </footer>
      </div>

      <AnimatePresence>
        {adminModalOpen && !isAuthenticated && (
          <AdminLogin onClose={() => setAdminModalOpen(false)} darkMode={darkMode} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;