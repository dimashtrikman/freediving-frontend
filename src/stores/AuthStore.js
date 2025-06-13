import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class AuthStore {
  user = null;
  isAuth = false;
  isLoading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
  }

  async login(email, password) {
    this.isLoading = true;
    this.error = '';
    try {
      const response = await fetch('https://api.example.com/auth/login', {
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
      const response = await fetch('https://api.example.com/auth/register', {
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
      const response = await axios.post('/api/auth/reset-password', { email });
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
