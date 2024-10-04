import React, { useState } from "react";
import "./SectionOne.scss";
import Button from "../utilitiesCpmponents/button/Button";
import TextFieldComponent from "../utilitiesCpmponents/TextField/TextFieldComponent";
import iosArrowIcon from "../../assets/Icons/ios-arrow-icon.png"; // Adjust the path if needed

const SectionOne = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <section className="section-one">
      <div className="overlay">
        <div className="content">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h4>Watch anywhere. Cancel anytime.</h4>
          <div className="actions">
            <TextFieldComponent
              hintText="Email address"
              value={text}
              onChange={handleChange}
              type="email"
            />

            <Button className="cta-button">
              Get Started{" "}
              <img src={iosArrowIcon} alt="Arrow Icon" className="arrow-icon" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
