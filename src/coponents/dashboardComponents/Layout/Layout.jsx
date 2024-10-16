import moment from "moment/moment";
import css from "./Layout.module.css";
import { BiSearch } from "react-icons/bi";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ModeratorApi from "../../../api/moderator"; 
import { useEffect, useState } from "react";

const Layout = () => {
  const { pathname } = useLocation();
  const [userProfile, setUserProfile] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch the user profile data from the API
    const fetchProfileData = async () => {
      try {
        const response = await ModeratorApi.getProfileData();
        if (response.data && response.data.user) {
          // Assuming the response structure is like { data: { user: { fullName, email } } }
          setUserProfile({
            fullName: response.data.user.fullName,
            email: response.data.user.email,
          });
        } else {
          console.warn("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchProfileData(); // Fetch the data when the component mounts
  }, []);

  if (loading) {
    // Display loading indicator while fetching user data
    return <div>Loading profile...</div>;
  }

  return (
    <div className={css.container}>
      <Sidebar />

      {/* Making the dashboard the default route */}
      {pathname === "/" && <Navigate to="/dashboard" />}

      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>
          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.profile}>
           
            <div className={css.details}>
              {/* Display fetched user data */}
              <span>{userProfile.fullName || "User"}</span>
              <span>{userProfile.email || "No email available"}</span>
            </div>
          </div>
        </div>

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

// import moment from "moment/moment";
// import css from "./Layout.module.css";
// import { BiSearch } from "react-icons/bi";
// import Sidebar from "../Sidebar/Sidebar";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

// const Layout = () => {
//   const { pathname } = useLocation();
//   const [userProfile, setUserProfile] = useState({ name: "", email: "" });

//   useEffect(() => {
//     // Retrieve the token from localStorage
//     const token = localStorage.getItem("profileToken");

//     if (token) {
//       try {
//         // Decode the token
//         const decoded = jwtDecode(token);

//         // Check if the required user data exists in the decoded token
//         if (decoded.name && decoded.email) {
//           // Update the user profile state
//           setUserProfile({
//             name: decoded.name, // Adjust according to your token structure
//             email: decoded.email, // Adjust according to your token structure
//           });
//         } else {
//           // Handle the case where the data is missing (optional)
//           console.warn("User data not found in the token.");
//         }
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     } else {
//       // Handle the case where there is no token (optional)
//       console.warn("No profile token found in localStorage.");
//     }
//   }, []);

//   return (
//     <div className={css.container}>
//       <Sidebar />

//       {/* Making the dashboard as the default route */}
//       {pathname === "/" && <Navigate to="/dashboard" />}

//       <div className={css.dashboard}>
//         <div className={css.topBaseGradients}>
//           <div className="gradient-red"></div>
//           <div className="gradient-orange"></div>
//           <div className="gradient-blue"></div>
//         </div>

//         <div className={css.header}>
//           <span>{moment().format("dddd, Do MMM YYYY")}</span>

//           <div className={css.searchBar}>
//             <BiSearch size={20} />
//             <input type="text" placeholder="Search" />
//           </div>

//           <div className={css.profile}>
//             <img src="./profile.png" alt="person image" />
//             <div className={css.details}>
//               {/* Conditional rendering based on userProfile state */}
//               {userProfile.name ? (
//                 <>
//                   <span>{userProfile.name}</span>
//                   <span>{userProfile.email}</span>
//                 </>
//               ) : (
//                 <span>No user data available</span> // Fallback message
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={css.content}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
