import { Button } from "@mui/material";
import PropTypes from "prop-types";

export const generateColumns = (data, handleRowClick, handleDeleteClick) => {
  if (data.length > 0) {
    return Object.keys(data[0]).map((key) => ({
      accessorKey: key.includes("name") ? `${key}` : key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      Cell: ({ row }) => (
        <span
          onClick={() => handleRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {key === "id" ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(row.original.id);
              }}
              style={{ color: "red" }}
            >
              X
            </Button>
          ) : key === "profilePic" ? (
            <img
              src={row.original.profilePic || "defaultProfilePic.png"} // Use a default image if profilePic is null
              alt="Profile"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
          ) : (
            row.original[key]
          )}
        </span>
      ),
    }));
  }
  return [];
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
