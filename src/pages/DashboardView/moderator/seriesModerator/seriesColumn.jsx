export const generateSeriesColumns = (onRowClick, onAddSeasonClick, onViewSeasonsClick) => [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "releaseYear",
    header: "Release Year",
  },
  {
    accessorKey: "img",
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
    accessorKey: "seasons",
    header: "Number of Seasons",
    Cell: ({ row }) => (
      <>
        <span>{row.original.seasons.length}</span>
        {row.original.seasons.length > 0 && (
          <button onClick={() => onViewSeasonsClick(row.original)} style={{ margin: "7px", width: "9vw" }}>
            View Seasons
          </button>
        )}
      </>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }) => (
      <>
        <button onClick={() => onRowClick(row.original)} style={{margin: "5px", width: "7vw" }}>Edit</button>
        <button onClick={() => onAddSeasonClick(row.original)} style={{ margin: "5px", width: "7vw" }}>Add Season</button>
      </>
    ),
  },
];
