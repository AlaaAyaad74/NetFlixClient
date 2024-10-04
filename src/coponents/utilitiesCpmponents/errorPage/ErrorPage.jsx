// src/components/ErrorPage/ErrorPage.jsx
import React from "react";
import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="home-link">
        Go back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
