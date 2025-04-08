// src/store.js
import { create } from 'zustand';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const useStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  feedbacks: [],
  
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/check-auth`, {
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
  
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, credentials, {
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
      const response = await axios.post(`${API_URL}/api/submit-feedback`, feedbackData);
      
      if (response.data.success) {
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
  
  fetchFeedbacks: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/feedbacks`, {
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
  
  clearFeedbacks: () => set({ feedbacks: [] })
}));

export default useStore;