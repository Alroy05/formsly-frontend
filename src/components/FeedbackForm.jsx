import { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useStore from '../store';

function FeedbackForm({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { submitFeedback } = useStore();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await submitFeedback(formData);
      toast.success('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-500' 
              : 'bg-white/70 border-gray-200 focus:ring-blue-500'
          } ${errors.name ? 'border-red-500' : 'border'}`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-500' 
              : 'bg-white/70 border-gray-200 focus:ring-blue-500'
          } ${errors.email ? 'border-red-500' : 'border'}`}
          placeholder="email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Feedback Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-500' 
              : 'bg-white/70 border-gray-200 focus:ring-blue-500'
          } ${errors.message ? 'border-red-500' : 'border'}`}
          placeholder="Share your thoughts with us..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
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
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <SendHorizontal size={18} />
            <span>Submit Feedback</span>
          </>
        )}
      </motion.button>
    </form>
  );
}

export default FeedbackForm;
