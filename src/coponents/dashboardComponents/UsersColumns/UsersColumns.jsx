import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // Import icons

// Utility function to format timestamps
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};


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
    // Adding "isBlocked" column
    {
      accessorKey: "isBlocked",
      header: "Blocked",
      Cell: ({ row }) => (
        row.original.isBlocked ? (
          <AiOutlineCheckCircle style={{ color: "green" }} size={20} />
        ) : (
          <AiOutlineCloseCircle style={{ color: "red" }} size={20} />
        )
      ),
    },
    // Adding "isPrime" column
    {
      accessorKey: "isPrime",
      header: "Prime",
      Cell: ({ row }) => (
        row.original.isPrime ? (
          <AiOutlineCheckCircle style={{ color: "gold" }} size={20} />
        ) : (
          <AiOutlineCloseCircle style={{ color: "gray" }} size={20} />
        )
      ),
    },
    // Adding timestamp columns if they exist
    {
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      Cell: ({ row }) => formatDate(row.original.updatedAt),
    },
    // Dynamically add other fields, excluding profile picture and already defined fields
    ...Object.keys(data[0])
      .filter(
        (key) =>
          ![
            "id",
            "fullName",
            "username",
            "email",
            "isBlocked",
            "isPrime",
            "createdAt",
            "updatedAt",
            "profilePic" // Exclude profilePic if it exists
          ].includes(key)
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
        accessorKey: "block",
        header: "Block",
        Cell: ({ row }) => {
          const user = row.original;
          const actionText = user.isBlocked ? "Unblock" : "Block"; // Determine action text
          const buttonColor = user.isBlocked ? "green" : "red"; // Set color based on block status
      
          return (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering row click event
                handleDeleteClick(user.id); // Call handleDeleteClick with user ID
              }}
              style={{ color: buttonColor }} // Apply dynamic color
            >
              {actionText} {/* Button text changes based on block status */}
            </Button>
          );
        },
      },
      
  ];
};



// PropTypes validation for the row prop inside Cell
generateColumns.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isBlocked: PropTypes.bool, // Ensure bool type for isBlocked
      isPrime: PropTypes.bool, // Ensure bool type for isPrime
      createdAt: PropTypes.string, // Ensure createdAt is a string
      updatedAt: PropTypes.string, // Ensure updatedAt is a string
    })
  ).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};
