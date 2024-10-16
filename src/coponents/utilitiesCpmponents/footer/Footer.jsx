import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = ({ showFooter }) => {
  // Only render the footer if showFooter is true
  if (!showFooter) {
    return null;
  }
  return (
    <footer className="footer">
      <div className="footer__contact">
        <p>Questions? Call 1-844-505-2993</p>
      </div>
      <div className="footer__menus">
        <div className="footer__menu">
          <Link to="/">FAQ</Link>
          <Link to="/">Investor Relations</Link>
          <Link to="/">Buy Gift Cards</Link>
          <Link to="/">Cookie Preferences</Link>
          <Link to="/">Legal Notices</Link>
        </div>
        <div className="footer__menu">
          <Link to="/">Help Center</Link>
          <Link to="/">Jobs</Link>
          <Link to="/">Ways to Watch</Link>
          <Link to="/">Corporate Information</Link>
          <Link to="/">Only on Netflix</Link>
        </div>
        <div className="footer__menu">
          <Link to="/">Account</Link>
          <Link to="/">Netflix Shop</Link>
          <Link to="/">Terms of Use</Link>
          <Link to="/">Contact Us</Link>
          <Link to="/">Do Not Sell or Share Personal Information</Link>
        </div>
        <div className="footer__menu">
          <Link to="/">Media Center</Link>
          <Link to="/">Redeem Gift Cards</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Speed Test</Link>
          <Link to="/">Ad Choices</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
