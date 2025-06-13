import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import AuthStore from '../../stores/AuthStore';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthStore.login(email, password);
    if (AuthStore.isAuth) navigate('/dashboard');
  };

  return (
    <div className="register-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>
      {AuthStore.error && <p style={{ color: 'red' }}>{AuthStore.error}</p>}
      <div className="login-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div className="forgot-password">
        <Link to="/reset-password">Forgot your password?</Link>
      </div>
    </div>
  );
});

export default LoginPage;
