import { Button } from "@mui/material";
import PropTypes from "prop-types";

export const generateColumns = (data, handleRowClick, handleDeleteClick) => {
  if (data.length === 0) return [];

  return [
    {
      accessorKey: "id",
      header: "ID",
      Cell: ({ row }) => (
        <span
          onClick={() => handleRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "profilePic",
      header: "Profile Pic",
      Cell: ({ row }) => (
        <img
          src={row.original.profilePic || "defaultProfilePic.png"} // Default image if profilePic is null
          alt="Profile"
          style={{ borderRadius: "50%", width: "40px", height: "40px" }}
        />
      ),
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      Cell: ({ row }) => (
        <span
          onClick={() => handleRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.fullName}
        </span>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      Cell: ({ row }) => (
        <span
          onClick={() => handleRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.username}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      Cell: ({ row }) => (
        <span
          onClick={() => handleRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.email}
        </span>
      ),
    },
    // Add any other fields that should come in between
    ...Object.keys(data[0])
      .filter(
        (key) =>
          !["id", "profilePic", "fullName", "username", "email"].includes(key)
      )
      .map((key) => ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
        Cell: ({ row }) => (
          <span
            onClick={() => handleRowClick(row.original)}
            style={{ cursor: "pointer" }}
          >
            {row.original[key]}
          </span>
        ),
      })),
    {
      accessorKey: "delete",
      header: "Delete",
      Cell: ({ row }) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(row.original.id);
          }}
          style={{ color: "red" }}
        >
          X
        </Button>
      ),
    },
  ];
};

// PropTypes validation for the row prop inside Cell
generateColumns.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.object.isRequired,
  }),
  data: PropTypes.array.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};
