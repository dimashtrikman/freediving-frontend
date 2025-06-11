import { makeAutoObservable } from 'mobx';

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
      this.user = data.user || { email }; // Предположим, backend возвращает user
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

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.isAuth = false;
  }
}

export default new AuthStore();
