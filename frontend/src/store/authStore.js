import { create } from "zustand"; //state management library
import axios from "axios"; //http request fetcher

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null, //when user is not authenticated
  isAuthenticated: false,
  error: null,
  isLoading: false, //for our loaders
  isCheckingAuth: true,
  message: null,
  //signup endpoint call
  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  //login endpoint call
  login: async (email, password) => {   set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    set({
      user: response.data.user,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    set({
      error: error.response.data.message || "Error logging in",
      isLoading: false,
    });
    throw error;
  }},

  //verification endpoint call
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  //check authentication meaning anyone not authentcated can't access any route has to signup or login
  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      console.error(error);
    
    }
  },

  logout: async () => {
    set({isCheckingAuth: false, isAuthenticated: false, isLoading: false});
    try {
        const response = await axios.post(`${API_URL}/logout`);
        set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
            isLoading: false   
        });
        console.log(response);
    } catch (error) {
        set({ error: null});
        console.error(error);
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error sending reset password email",
        });
        throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	}
}));
