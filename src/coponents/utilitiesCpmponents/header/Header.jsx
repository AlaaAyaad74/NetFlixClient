import React, { useState, useEffect, useRef } from "react";
import "./header.scss";
import logo from "../../../assets/Netflix.png";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import SearchField from "../search/SearchField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle"; // MUI Profile Icon
import SearchIcon from "@mui/icons-material/Search"; // MUI Search Icon
 import Button from "@mui/material/Button";

const headerNav = [
  { display: "Home", path: "/home" },
  { display: "Movies", path: "/home/movie" },
  { display: "TV Series", path: "/home/tv" },
 ];

const Header = ({ isLandingPage }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Initialize navigate hook
  const active = headerNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for profile dropdown menu

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to login page on button click
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (menuOption) => {
    handleProfileMenuClose(); // Close the dropdown
    if (menuOption === "Profile") {
      navigate("/Profile");
    } else if (menuOption === "wishlist") {
      navigate("/wishlist");
    } else if (menuOption === "logout") {
      console.log("User logged out");
      navigate("/login");
    }
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="Netflix Logo" />
          </Link>
        </div>

        {!isLandingPage && (
          <ul className="header__nav">
            {headerNav.map((e, i) => (
              <li key={i} className={i === active ? "active" : ""}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            ))}
          </ul>
        )}

        <div className={`header__search ${showSearch ? 'visible' : ''}`}>
          <SearchField onSearchResultClicked={(item) => console.log('Search result clicked:', item)} />
        </div>

        {!showSearch && <div className="header__spacer"></div>}

        {!isLandingPage ? (
          <div className="header__icons">
            <IconButton color="inherit" onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
 

            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>

            {/* Profile Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick("Profile")}>Profile</MenuItem>
              <MenuItem onClick={() => handleMenuClick("wishlist")}>Wish List</MenuItem>
              <MenuItem onClick={() => handleMenuClick("logout")}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button variant="outlined" color="inherit" onClick={handleSignInClick}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
