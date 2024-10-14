import { useState } from "react";
import TextFieldComponent from "../coponents/utilitiesCpmponents/TextField/TextFieldComponent";
import Button from "../coponents/utilitiesCpmponents/button/Button";
import "./LoginPage.scss";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

 // Import jwt-decode to decode the token

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password regex: at least 8 characters, one uppercase, one number, and one special character
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    // if (!passwordRegex.test(e.target.value)) {
    //   setPasswordError(
    //     "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
    //   );
    // } else {
    //   setPasswordError("");
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   setPasswordError(
    //     "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
    //   );
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await authApi.login({ email, password });
      console.log("Login success:", response);

      // Save the auth token
      localStorage.setItem("authToken", response.token);

      // Decode the token to get the user's role
      const decodedToken = jwtDecode(response.token);

      // Navigate based on the user's role
      if (decodedToken.role === "moderatorAdmin") {
        navigate("/dashboard/moderator"); // Redirect moderators to dashboard
      } else if (decodedToken.role === "user") {
        navigate("/home"); // Redirect regular users to home page
      } else if (decodedToken.role === "usersAdmin") {
        navigate("/dashboard");
      } else {
        navigate("/home"); // Fallback to home for any other roles
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-container">
          <h1 className="login-title">Sign In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <TextFieldComponent
              type="email"
              value={email}
              onChange={handleEmailChange}
              hintText="Email or phone number"
              className="login-input"
            />
            {emailError && <p className="error-message">{emailError}</p>}{" "}
            {/* Display email validation error */}
            <div style={{ height: "10px" }}></div>
            <TextFieldComponent
              type="password"
              value={password}
              onChange={handlePasswordChange}
              hintText="Password"
              className="login-input"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}{" "}
            {/* Display password validation error */}
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display login error */}
            <Button className="login-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="login-options">
            <div className="login-forgot">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
              <label>
                <input type="checkbox" className="remember-me" /> Remember me
              </label>
            </div>
            <span className="login-or">OR</span>
            <div className="login-new">
              New to the app?{" "}
              <Link to="/register" className="signup-now">
                Sign up now.
              </Link>{" "}
              {/* Use Link for navigation */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
