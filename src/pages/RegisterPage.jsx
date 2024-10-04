import React, { useState } from "react";
import TextFieldComponent from "../coponents/utilitiesCpmponents/TextField/TextFieldComponent";
import Button from "../coponents/utilitiesCpmponents/button/Button";
import "./LoginPage.scss";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");
  
  const navigate = useNavigate(); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

  const handleNameChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstName(value);
      if (!nameRegex.test(value)) {
        setFirstNameError("Please enter a valid first name.");
      } else {
        setFirstNameError("");
      }
    } else if (name === "lastName") {
      setLastName(value);
      if (!nameRegex.test(value)) {
        setLastNameError("Please enter a valid last name.");
      } else {
        setLastNameError("");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nameRegex.test(firstName)) {
      setFirstNameError("Please enter a valid first name.");
      setLoading(false);
      return;
    }

    if (!nameRegex.test(lastName)) {
      setLastNameError("Please enter a valid last name.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.register({  fullName: `${firstName} ${lastName}`, email, password });
      console.log("Registration success:", response);
     
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-container">
          <h1 className="login-title">Sign Up</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <TextFieldComponent
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleNameChange}
              hintText="First Name"
              className="login-input first-name"
            />
            {firstNameError && <p className="error-message">{firstNameError}</p>}
            <div style={{ height: "10px" }}></div>
            <TextFieldComponent
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleNameChange}
              hintText="Last Name"
              className="login-input last-name"
            />
            {lastNameError && <p className="error-message">{lastNameError}</p>}
            <div style={{ height: "10px" }}></div>
            <TextFieldComponent
              type="email"
              value={email}
              onChange={handleEmailChange}
              hintText="Email"
              className="login-input"
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <div style={{ height: "10px" }}></div>
            <TextFieldComponent
              type="password"
              value={password}
              onChange={handlePasswordChange}
              hintText="Password"
              className="login-input"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            <div style={{ height: "10px" }}></div>
            {error && <p className="error-message">{error}</p>}

            <Button className="login-button" disabled={loading} onClick={handleSubmit}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <div className="login-options">
            <span className="login-or">OR</span>
            <div className="login-new">
              Already have an account?{" "}
              <Link to="/login" className="signup-now">
                Log in now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
