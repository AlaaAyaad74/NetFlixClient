import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SeriesDialog from "./seriesDialog"; // Import the SeriesDialog component
import AddSeasonDialog from "./AddSeasonDialog.jsx"; // Import AddSeasonDialog component
import axios from "axios";
import { generateSeriesColumns } from "./seriesColumn"; // Columns generator

const SeriesGrid = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalSeries, setTotalSeries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [seasonDialogOpen, setSeasonDialogOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Function to fetch series data
  const fetchSeries = async (page = 1) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3331/series/series`, {
        params: { page, limit: pageSize },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Replace with your JWT token
        },
      });
      const { series, totalSeries } = response.data;
      setSeriesData(series);
      setTotalSeries(totalSeries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching series:", error);
      setError(true);
      setLoading(false);
    }
  };

  // Effect to fetch series data on page change
  useEffect(() => {
    fetchSeries(currentPage);
  }, [currentPage]);

  // Handle row click to open edit dialog
  const handleRowClick = (series) => {
    setSelectedSeries(series);
    setDialogOpen(true);
  };

  // Handle opening the add season dialog
  const handleAddSeasonClick = (series) => {
    setSelectedSeries(series);
    setSeasonDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSeries(null);
    setSubmitError("");
  };

  // Handle dialog submit (update series)
  const handleDialogSubmit = async (seriesData) => {
    setSubmitting(true);
    try {
      await axios.put(`http://127.0.0.1:3331/series/update-series/${selectedSeries._id}`, seriesData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Replace with your JWT token
          'Content-Type': 'application/json',
        },
      });
      fetchSeries(currentPage); // Refresh the series data
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating series:", error);
      setSubmitError("Failed to update series.");
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch the series columns with add season button
  const columns = useMemo(() => generateSeriesColumns(handleRowClick, handleAddSeasonClick), []);

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
  if (error) return <div>Error: Unable to fetch series</div>;

  return (
    <div className="series-grid">
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={seriesData}
          manualPagination
          rowCount={totalSeries}
          state={{
            pagination: {
              pageIndex: currentPage - 1,
              pageSize: pageSize,
            },
          }}
        />
      </ThemeProvider>

      <SeriesDialog
        open={dialogOpen}
        series={selectedSeries}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        loading={submitting}
        error={submitError}
      />

      <AddSeasonDialog 
        open={seasonDialogOpen}
        series={selectedSeries}
        onClose={() => setSeasonDialogOpen(false)}
        onSubmit={async (seasonData) => {
          // Make API call to add a season here
          await axios.post(`http://127.0.0.1:3331/series/add-season`, { seriesId: selectedSeries._id, ...seasonData }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              'Content-Type': 'application/json',
            },
          });
          fetchSeries(currentPage); // Refresh the series data
          setSeasonDialogOpen(false);
        }}
      />

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * pageSize >= totalSeries}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SeriesGrid;
