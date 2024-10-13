import React, { useState } from 'react';
import "../../../pages/DashboardView/Authintecation/auth.scss"; // Import the SCSS file

const LoginForm = ({ onSubmit, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input" // Apply existing input styles
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input" // Apply existing input styles
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In as {role}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
