import React from "react";

export const generateMovieColumns = (onRowClick) => [
  {
    accessorKey: "_id", // Accessor for the ID
    header: "ID",
  },
  {
    accessorKey: "name", // Accessor for movie name
    header: "Movie Name",
  },
  {
    accessorKey: "overview", // Accessor for movie overview
    header: "Overview",
  },
  {
    accessorKey: "releaseYear", // Accessor for release year
    header: "Release Year",
  },
  {
    accessorKey: "first_air_date", // Accessor for release date
    header: "Release Date",
  },
  {
    accessorKey: "poster_path", // Accessor for poster
    header: "Poster",
    Cell: ({ cell }) => (
      <img
        src={cell.getValue()}
        alt="Poster"
        style={{ width: "100px", height: "auto" }}
      />
    ),
  },
  {
    accessorKey: "actions", // Add actions column
    header: "Actions",
    Cell: ({ row }) => (
      <button onClick={() => onRowClick(row.original)}>Edit</button>
    ),
  },
];
