import css from "./Sidebar.module.css";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";

import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/N.png";

const Sidebar = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the saved role from localStorage
    const storedDecodedToken = JSON.parse(localStorage.getItem("decodedToken"));
    if (storedDecodedToken && storedDecodedToken.role) {
      setUserRole(storedDecodedToken.role);
    }
  }, []);
  return (
    <div className={css.container}>
      <img src={logo} alt="logo" className={css.logo} />

      <div className={css.menu}>
        <NavLink to="/dashboard" className={css.item} title={"Dashboard"}>
          <MdSpaceDashboard size={30} />
        </NavLink>

        <NavLink to="/dashboard/calendar" className={css.item} title="Calendar">
          <AiFillCalendar size={30} />
        </NavLink>

        <NavLink
          to="/dashboard/board"
          className={css.item}
          title="Trello Board"
        >
          <FaTasks size={30} />
        </NavLink>

        {userRole === "movieModerator" && (
          <NavLink
            to="/dashboard/moderator"
            className={css.item}
            title="Moderator"
          >
            <AiOutlineTable size={30} />{" "}
            {/* Replace with any other icon if needed */}
          </NavLink>
        )}

        {userRole === "usersAdmin" && (
          <NavLink
            to="/dashboard/users"
            className={css.item}
            title="Users Admin"
          >
            <AiOutlineTable size={30} />{" "}
            {/* Replace with any other icon if needed */}
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
