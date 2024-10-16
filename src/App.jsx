import { Suspense, useEffect, useState } from "react";
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
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false); // New state for footer visibility

  useEffect(() => {
    // Define the landing page routes and the header/footer display routes
    const landingPageRoutes = ["/", "/landing/", "/login", "/register"];
    const headerVisibleRoutes = [
      "/dashboard/moderator",
      "/dashboard/add-movie",
      "/dashboard/upload-content/:movieId",
      "/dashboard",
      "/dashboard/users",
    ];
    const footerVisibleRoutes = ["/home", "/about", "/contact","/landing/","/","/landing"];  

    // Check if the current path is a landing page
    const currentPath = location.pathname;
    setIsLandingPage(landingPageRoutes.includes(currentPath));

    // Check if the current path should show the header
    setShowHeader(headerVisibleRoutes.some((route) => 
      route === currentPath || route.includes(":")
    ));

    // Check if the current path should show the footer
    setShowFooter(footerVisibleRoutes.includes(currentPath));
  }, [location]);

  return (
    <>
      {/* Pass true to Header if it's the landing page, otherwise false */}
      <Header isLandingPage={isLandingPage} showHeader={!showHeader} />
      <main>{children}</main>
      <Footer showFooter={showFooter} /> {/* Updated to use showFooter state */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <LayoutWrapper>
          <AppRoutes />
        </LayoutWrapper>
      </Suspense>
    </Router>
  );
};

LayoutWrapper.propTypes = {
  children: PropTypes.node,
};

export default App;
