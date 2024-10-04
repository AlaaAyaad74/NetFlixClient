import { useState, useEffect, useRef } from "react";
import "./header.scss";
import logo from "../../../assets/Netflix.png";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import IconButton from "../IconButton/IconButton";
import Button from "../button/Button";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import SearchField from "../Search/SearchField";
import PropType from "prop-types";

const headerNav = [
  { display: "Home", path: "/home" },
  { display: "Movies", path: "/home/movie" },
  { display: "TV Series", path: "/home/tv" },
  { display: "Search", path: "/home/search" },
];

const Header = ({ isLandingPage }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Initialize navigate hook
  const active = headerNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
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
              <li key={i} className={`${i === active ? "active" : ""}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            ))}
          </ul>
        )}

        <div className={`header__search ${showSearch ? "visible" : ""}`}>
          <SearchField
            onSearchResultClicked={(item) =>
              console.log("Search result clicked:", item)
            }
          />
        </div>

        {!showSearch && <div className="header__spacer"></div>}

        {!isLandingPage ? (
          <div className="header__icons">
            <IconButton
              icon={faSearch}
              size="20px"
              color="#fff"
              onClick={handleSearchIconClick}
            />
            <IconButton
              icon={faBell}
              size="20px"
              color="#fff"
              onClick={() => console.log("Notifications clicked")}
            />
          </div>
        ) : (
          <Button onClick={handleSignInClick}>Sign In</Button> // Add onClick handler for sign in button
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isLandingPage: PropType.bool,
};

export default Header;
