import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import { Link } from 'react-router-dom';

export const RegisterPage = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      AuthStore.error = 'Passwords do not match';
      return;
    }

    await AuthStore.register(email, password);
    if (!AuthStore.error) {
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="register-button" disabled={AuthStore.isLoading}>
          {AuthStore.isLoading ? 'Registering...' : 'Sign Up'}
        </button>

        {AuthStore.error && <p style={{ color: 'red' }}>{AuthStore.error}</p>}
      </form>

      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
      <div className="forgot-password">
        <Link to="/reset-password">Forgot your password?</Link>
      </div>
    </div>

  );
});

export default RegisterPage;
