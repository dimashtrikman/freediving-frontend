import { useState } from 'react';
import { API_URL } from '../../utils/global';



export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token, Ex: in localStorage
      localStorage.setItem('token', data.token);
      // Redirect, Ex: to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };


    return (
    <>
    <div class="auth-container">
      <h2>Sign In to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" class="auth-button">Sign In</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      <div class="register-link">
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
    </>
    )
}

export default LoginPage;