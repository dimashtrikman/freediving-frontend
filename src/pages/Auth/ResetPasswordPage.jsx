import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import AuthStore from "../../stores/AuthStore";
import { Link } from 'react-router-dom';

const ResetPasswordPage = observer(() => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthStore.resetPassword(email);
    if (!AuthStore.error) {
      setSubmitted(true);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>

      {submitted ? (
        <p>A password reset link has been sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={AuthStore.isLoading}
            />
          </div>

          <button type="submit" className="reset-button" disabled={AuthStore.isLoading}>
            {AuthStore.isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          {AuthStore.error && <p style={{ color: "red" }}>{AuthStore.error}</p>}
        </form>
      )}

      <div className="back-link">
        Remembered your password? <Link to="/login">Login</Link>
        
      </div>
    </div>
  );
});

export default ResetPasswordPage;
