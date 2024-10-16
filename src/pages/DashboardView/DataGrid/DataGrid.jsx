import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {
  fetchUserData,
  blockUser,
  unblockUser,
  updateUser,
} from "../../../api/usersApi/usersCRUD";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserDialog from "../../../coponents/dashboardComponents/UsersColumns/UserDialog";
import { generateColumns } from "../../../coponents/dashboardComponents/UsersColumns/UsersColumns";
import "./DataGrid.css";

const DataGrid = () => {
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteClick = async (userId) => {
    const user = mergedData.find((u) => u.id === userId); // Find the user in the current state
    const action = user.isBlocked ? "unblock" : "block"; // Determine action based on blocked status

    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        if (user.isBlocked) {
          await unblockUser(userId); // Call the unblock function
          // Update the blocked status in the local state
          setMergedData((prevData) =>
            prevData.map((u) =>
              u.id === userId ? { ...u, isBlocked: false } : u
            )
          );
          alert("User unblocked successfully.");
        } else {
          await blockUser(userId); // Call the block function
          // Update the blocked status in the local state
          setMergedData((prevData) =>
            prevData.map((u) =>
              u.id === userId ? { ...u, isBlocked: true } : u
            )
          );
          alert("User blocked successfully.");
        }
      } catch (error) {
        console.error(`Error ${action}ing user:`, error);
      }
    }
  };

  const columns = useMemo(
    () => generateColumns(mergedData, handleRowClick, handleDeleteClick),
    [mergedData]
  );

  const handleFormSubmit = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      setMergedData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setOpen(false);
      alert("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchUserData();
<<<<<<< HEAD
        console.log("fetchedData", fetchedData);
=======

>>>>>>> 06f5f68 (some changes)
        if (fetchedData.length === 0) throw new Error("No data found");
        const sanitizedData = fetchedData.map(
          ({ password, resetPasswordToken, resetPasswordExpires, ...user }) =>
            user
        );
        setMergedData(sanitizedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch data</div>;

  return (
    <div className="table-container">
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={mergedData} />
      </ThemeProvider>

      <UserDialog
        open={open}
        user={selectedUser}
        onClose={() => setOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DataGrid;
