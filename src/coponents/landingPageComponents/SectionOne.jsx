import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./SectionOne.scss";
import Button from "../utilitiesCpmponents/button/Button";
import TextFieldComponent from "../utilitiesCpmponents/TextField/TextFieldComponent";
import iosArrowIcon from "../../assets/Icons/ios-arrow-icon.png"; // Adjust the path if needed

const SectionOne = () => {
  const [email, setEmail] = useState(""); // State for the email input
  const [emailError, setEmailError] = useState(""); // State for email error
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address."); // Set error if invalid
    } else {
      setEmailError(""); // Clear error
      navigate("/register", { state: { email } }); // Navigate to RegisterPage with email
    }
  };

  return (
    <section className="section-one">
      <div className="overlay">
        <div className="content">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h4>Watch anywhere. Cancel anytime.</h4>
          <form onSubmit={handleSubmit} className="actions"> {/* Form element */}
            <div className="input-group"> {/* New div for input and button */}
              <TextFieldComponent
                hintText="Email address"
                value={email}
                onChange={handleChange}
                className = "text-field-component"
                type="email"
              />
              <Button className="cta-button" type="submit">
                Get Started
                <img src={iosArrowIcon} alt="Arrow Icon" className="arrow-icon" />
              </Button>
            </div>
            {emailError && <p className="error-message">{emailError}</p>} {/* Display error message */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
