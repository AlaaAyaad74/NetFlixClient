// function decodeToken(token) {
//   if (!token) return null;

//   const payload = token.split(".")[1]; // Get the payload part
//   const decodedPayload = JSON.parse(atob(payload)); // Decode the Base64
//   return decodedPayload;
// }

export const fetchUserData = async () => {
  const dummyData = [
    {
      id: 1,
      username: "adminUser",
      email: "admin@example.com",
      password: "$2b$10$OxgyyxTnn35yrokacx6axORcUBs7kEOrdB0vkufXVltckDMhicygC",
      fullName: "Admin User",
      profilePic: null,
      roleId: 1,
      isPrime: true,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "2024-10-12T17:03:07.000Z",
      updatedAt: "2024-10-12T17:03:07.000Z",
    },
    {
      id: 2,
      username: "moderatorUser",
      email: "moderator@example.com",
      password: "$2b$10$OxgyyxTnn35yrokacx6axORcUBs7kEOrdB0vkufXVltckDMhicygC",
      fullName: "Moderator User",
      profilePic: null,
      roleId: 2,
      isPrime: false,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "2024-10-12T17:03:07.000Z",
      updatedAt: "2024-10-12T17:03:07.000Z",
    },
    {
      id: 3,
      username: "movieModeratorUser",
      email: "moviemod@example.com",
      password: "$2b$10$OxgyyxTnn35yrokacx6axORcUBs7kEOrdB0vkufXVltckDMhicygC",
      fullName: "Movie Moderator",
      profilePic: null,
      roleId: 3,
      isPrime: false,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "2024-10-12T17:03:07.000Z",
      updatedAt: "2024-10-12T17:03:07.000Z",
    },
    {
      id: 4,
      username: "rulesAdminUser",
      email: "rulesadmin@example.com",
      password: "$2b$10$OxgyyxTnn35yrokacx6axORcUBs7kEOrdB0vkufXVltckDMhicygC",
      fullName: "Rules Admin",
      profilePic: null,
      roleId: 4,
      isPrime: true,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "2024-10-12T17:03:07.000Z",
      updatedAt: "2024-10-12T17:03:07.000Z",
    },
    {
      id: 5,
      username: "devTeamUser",
      email: "devteam@example.com",
      password: "$2b$10$OxgyyxTnn35yrokacx6axORcUBs7kEOrdB0vkufXVltckDMhicygC",
      fullName: "Dev Team User",
      profilePic: null,
      roleId: 5,
      isPrime: true,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "2024-10-12T17:03:07.000Z",
      updatedAt: "2024-10-12T17:03:07.000Z",
    },
  ];

  // Get the role from localStorage
  // const token = localStorage.getItem("token"); // Retrieve token from local storage
  // const userRole = token ? decodeToken(token).role : null; // Decode the token to get the role

  // let apiUrl = "";
  // if (userRole === "usersAdmin") {
  //   apiUrl = "/api/users"; // Endpoint for fetching users
  // } else if (userRole === "moderatorsAdmin") {
  //   apiUrl = "/api/moderators"; // Endpoint for fetching moderators
  // } else {
  //   console.error("Invalid user role:", userRole);
  //   return [];
  // }

  // try {
  //   // Fetch data from the determined endpoint
  //   const response = await fetch(apiUrl);

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const data = await response.json();

  //   // Merge fetched data with local userData if needed
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return [];
  // }
  return dummyData;
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete user");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const updateUser = async (user) => {
  try {
    const { password, ...rest } = user; // Destructure to get password separately
    const response = await fetch(`/api/users/${rest.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest), // Pass only the user data excluding password
    });
    if (!response.ok) throw new Error("Failed to update user");
    
    // If there's a password, update it separately if needed
    if (password) {
      await fetch(`/api/users/${rest.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

