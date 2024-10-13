import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../../api/authApi';
import { useJwt } from 'react-jwt'; // Importing useJwt from react-jwt
import "./auth.scss"; // Import your styles

const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
  
    try {
      const response = await authApi.login({ email, password }); // Adjust your API call accordingly
  
      if (!response) {
        throw new Error('No data received from server.');
      }
  
      const token  = response.token; 
      console.log(token)// Extract token from response
  
      if (!token) {
        throw new Error('No token received. Please check your credentials.');
      }
  
      // Decode the token using react-jwt (assuming useJwt is a custom hook)
      const { decodedToken, isExpired } = useJwt(token);
  
      // Optionally, store user data in local storage or context
      localStorage.setItem('user', JSON.stringify(decodedToken));
  
      // Handle successful login
      if (message === 'Sign-in successful.') {
        console.log('Login successful!');
        // Show success message to user (implement your UI logic here)
        // navigate('/moderator-dashboard'); // Adjust this route as needed
      } else {
        console.warn('Unexpected login response message:', message);
      }
  
      // Redirect to moderator dashboard only after successful login handling
      navigate('/moderator-dashboard'); // Adjust this route as needed
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-container">
          <h2 className="login-title">Login</h2>

          {/* Display error if exists */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleLogin} className="login-form">
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
