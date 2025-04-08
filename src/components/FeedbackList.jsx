import { motion } from 'framer-motion';
import useStore from '../store';

function FeedbackList({ darkMode }) {
  const { feedbacks } = useStore();

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    
    if (window.innerWidth < 640) {
      options.year = '2-digit';
      options.month = 'short';
      options.day = 'numeric';
    }
    
    return new Date(dateString).toLocaleString('en-IN', options) + ' IST';
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No feedback submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 sm:pr-3">
      {feedbacks.map((feedback, index) => (
        <motion.div
          key={feedback._id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-lg p-3 sm:p-4 border ${
            darkMode 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-white/80 border-gray-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <h3 className="font-medium text-sm sm:text-base">{feedback.name}</h3>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} order-first sm:order-last`}>
              {formatDate(feedback.createdAt)}
            </span>
          </div>
          
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
            {feedback.email}
          </p>
          
          <div className={`mt-2 sm:mt-3 pt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{feedback.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default FeedbackList;