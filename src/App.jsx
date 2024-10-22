import { Suspense, useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./config/Routes";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import Header from "./coponents/utilitiesCpmponents/header/Header.jsx";
import Footer from "./coponents/utilitiesCpmponents/footer/Footer.jsx";
import PropTypes from "prop-types";

// Helper component to determine if the current route is a landing page
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // Default to showing the header
  const [showFooter, setShowFooter] = useState(false); // New state for footer visibility

  useEffect(() => {
    const landingPageRoutes = [
      "/",
      "/landing",
      "/landing/",
      "/login",
      "/register",
    ];
    const footerVisibleRoutes = [
      "/home",
      "/about",
      "/contact",
      "/landing/",
      "/",
      "/landing",
    ];

    const currentPath = location.pathname;

    // Check if the current path is a landing page
    setIsLandingPage(landingPageRoutes.includes(currentPath));

    // Dynamically hide the header for any route that contains 'dashboard'
    setShowHeader(!currentPath.includes("dashboard"));

    // Check if the current path should show the footer
    setShowFooter(footerVisibleRoutes.includes(currentPath));
  }, [location]);

  return (
    <>
      {/* Conditionally render Header based on showHeader */}
      {showHeader && (
        <Header isLandingPage={isLandingPage} showHeader={showHeader} />
      )}
      <main>{children}</main>
      {showFooter && <Footer showFooter={showFooter} />}
    </>
  );
};

export const ItemContext = createContext();
const App = () => {
  const [item, setItem] = useState({});
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <ItemContext.Provider value={{ item, setItem }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutWrapper>
            <AppRoutes />
          </LayoutWrapper>
        </Suspense>
      </Router>
    </ItemContext.Provider>
  );
};

LayoutWrapper.propTypes = {
  children: PropTypes.node,
};

export default App;
