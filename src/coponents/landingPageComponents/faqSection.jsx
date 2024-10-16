import { useState } from "react";
import AccordionComponent from "../../coponents/utilitiesCpmponents/Accordion/accordionComponent";
import TextFieldComponent from "../utilitiesCpmponents/TextField/TextFieldComponent";
import Button from "../utilitiesCpmponents/button/Button"; // Assuming you have a Button component
import iosArrowIcon from "../../assets/Icons/ios-arrow-icon.png"; // Adjust the path if needed
import "./faqSection.scss";
import PropTypes from "prop-types";
const FaqSection = () => {  
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <section className="faq-section">
      <h1>Frequently Asked Questions</h1>
      <AccordionComponent   />
      <div className="cta-section">
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="cta-form">
          <TextFieldComponent
            hintText="Email address"
            value={text}
            onChange={handleChange}
            type="email"
          />
          <gap style={{ width: "10px" }}></gap>
          <Button className="cta-button">
            Get Started 
            <img src={iosArrowIcon} alt="Arrow Icon" className="arrow-icon" />
          </Button>
        </div>
      </div>
      <div className="divider"></div>
    </section>
  );
};

FaqSection.propTypes = {
  faqItems: PropTypes.array.isRequired,
};
export default FaqSection;
