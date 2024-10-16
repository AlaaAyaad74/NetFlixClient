// Updated generateSeriesColumns function
export const generateSeriesColumns = (onRowClick, onAddSeasonClick) => [
    {
      accessorKey: "_id", // Series ID
      header: "ID",
    },
    {
      accessorKey: "title", // Series title
      header: "Title",
    },
    {
      accessorKey: "desc", // Series description
      header: "Description",
    },
    {
      accessorKey: "releaseYear", // Release year
      header: "Release Year",
    },
    {
      accessorKey: "img", // Series poster
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
      accessorKey: "seasons", // Seasons count
      header: "Number of Seasons",
      Cell: ({ row }) => <span>{row.original.seasons.length}</span>,
    },
    {
      accessorKey: "actions", // Actions column (edit button)
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <button onClick={() => onRowClick(row.original)}>Edit</button>
          <button onClick={() => onAddSeasonClick(row.original)}>Add Season</button>
        </>
      ),
    },
  ];
  