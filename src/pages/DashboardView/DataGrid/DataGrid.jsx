import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {
  fetchUserData,
  deleteUser,
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setMergedData((prevData) =>
          prevData.filter((user) => user.id !== userId)
        );
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Adjust the columns based on new metadata
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
        if (fetchedData.length === 0) throw new Error("No data found");
        setMergedData(fetchedData);
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
