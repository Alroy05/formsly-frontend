// src/store.js
import { create } from 'zustand';
import axios from 'axios';

// You can replace this with your actual API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  feedbacks: [],
  
  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        set({ 
          isAuthenticated: true,
          user: response.data.user
        });
        return true;
      }
    } catch (error) {
      set({ 
        isAuthenticated: false,
        user: null
      });
    }
    return false;
  },
  
  // Login
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, credentials, {
        withCredentials: true
      });
      
      if (response.data.success) {
        set({ 
          isAuthenticated: true,
          user: response.data.user
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await axios.post(`${API_URL}/submit-feedback`, feedbackData);
      
      if (response.data.success) {
        // If we already have feedbacks in the store, add the new one to the list
        if (get().feedbacks.length > 0) {
          set({
            feedbacks: [response.data.data, ...get().feedbacks]
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Submit feedback error:', error);
      throw error;
    }
  },
  
  // Get all feedbacks
  fetchFeedbacks: async () => {
    try {
      const response = await axios.get(`${API_URL}/feedbacks`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        set({ feedbacks: response.data.data });
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Fetch feedbacks error:', error);
      set({ feedbacks: [] });
      return [];
    }
  },
  
  // Clear feedbacks (useful when resetting UI state)
  clearFeedbacks: () => set({ feedbacks: [] })
}));

export default useStore;