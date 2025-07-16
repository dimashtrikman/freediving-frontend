import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
const API_URL = process.env.REACT_APP_SERVER_API_URL;

class AuthStore {
  user = null;
  isAuth = false;
  isLoading = false;
  isChecked = false; 
  error = '';

  constructor() {
    makeAutoObservable(this);
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        this.isAuth = true;
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }

  clearError() {
  this.error = null;
}

async checkAuth() {
  this.isLoading = true;
  try {
    const response = await fetch('/api/auth/check', { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      this.isAuth = data.isAuth === true;
    } else {
      this.isAuth = false;
    }
  } catch (e) {
    this.isAuth = false;
  } finally {
    this.isLoading = false;
    this.isChecked = true;
  }
}


  async login(email, password) {
    this.isLoading = true;
    this.error = '';
    try {

      const response = await fetch(`${API_URL}/account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(data));
      this.user = data;
      this.isAuth = true;
    } catch (err) {
      this.error = err.message;
      this.isAuth = false;
    } finally {
      this.isLoading = false;
    }
  }

  async register(email, password) {
    this.isLoading = true;
    this.error = '';
    try {

      const response = await fetch(`${API_URL}/account/register`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Registration failed');

      this.isAuth = false; // Registration successful, redirect to login
    } catch (err) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  async resetPassword(email) {
    this.isLoading = true;
    this.error = "";
    try {

      const response = await axios.put(`${API_URL}/account/recovery/${email}`);
      runInAction(() => {
        if (response.status === 200) {
          this.isLoading = false;
        } else {
          this.error = 'Something went wrong. Please try again.';
          this.isLoading = false;
        }


      });
      
      if (response.status === 202) {
        this.isLoading = false;
      } else {
        this.error = 'Something went wrong. Please try again.';
        this.isLoading = false;
      }
    } catch (err) {
      this.error = 'Server error. Please try again later.';
      this.isLoading = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.isAuth = false;
  }
}

const authStore = new AuthStore();

export default authStore;
