import React, { useState } from 'react';
import "../../../pages/DashboardView/Authintecation/auth.scss"; // Import the SCSS file

const SignupForm = ({ onSubmit, role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle form errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic validation (can be expanded based on your requirements)
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    onSubmit({ name, email, password });
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name" // For better accessibility
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input" // Apply existing input styles
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email" // For better accessibility
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input" // Apply existing input styles
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password" // For better accessibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input" // Apply existing input styles
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <button type="submit" className="login-button">
          Sign Up as {role}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
