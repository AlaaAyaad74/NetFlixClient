import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./config/Routes";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import Header from "./coponents/utilitiesCpmponents/header/Header.jsx";
import Footer from "./coponents/utilitiesCpmponents/footer/Footer.jsx";
import PropType from "prop-types";

// Helper component to determine if the current route is a landing page
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    // Define the landing page route(s)
    const landingPageRoutes = ["/", "/landing", "/login"];

    // Set isLandingPage to true if the current path matches landing page routes
    setIsLandingPage(landingPageRoutes.includes(location.pathname));
  }, [location]);

  return (
    <>
      {/* Pass true to Header if it's the landing page, otherwise false */}
      <Header isLandingPage={isLandingPage} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const App = () => {
  localStorage.setItem("authToken", "motaz");
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
  children: PropType.node,
};

export default App;
