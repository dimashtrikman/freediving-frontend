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
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
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
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      this.user = data.user || { email }; // Server return {user}
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      this.isAuth = false; // Possible redirect to /login
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
      const response = await axios.put(`${API_URL}/user/${email}/password`);
      runInAction(() => {
        if (response.status === 200) {
          this.isLoading = false;
        } else {
          this.error = 'Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.response?.data?.message || 'Server error. Please try again later.';
        this.isLoading = false;
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.isAuth = false;
  }
}



const authStore = new AuthStore();

export default authStore;
