import React, { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import SeriesDialog from "./seriesDialog"; 
import AddSeasonDialog from "./AddSeasonDialog"; 
import ViewSeasonsDialog from "./ViewSeasonsDialog"; 
import { generateSeriesColumns } from "./seriesColumn"; 
import "./seriesGrid.scss";

const SeriesGrid = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalSeries, setTotalSeries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [seasonDialogOpen, setSeasonDialogOpen] = useState(false);
  const [viewSeasonsDialogOpen, setViewSeasonsDialogOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [seasonsData, setSeasonsData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [viewSeasonsLoading, setViewSeasonsLoading] = useState(false);
  // Function to fetch series data
  const fetchSeries = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:3331/series/series`, {
        params: { page, limit: pageSize },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSeriesData(response.data.series);
      setTotalSeries(response.data.totalSeries);
    } catch (error) {
      console.error("Error fetching series:", error);
      setError(true);
    } finally {
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

  // Fetch seasons data
  const fetchSeasons = async (series) => {  setViewSeasonsLoading(true);

    try {
      console.log(series._id);
      const response = await axios.get(`http://127.0.0.1:3331/series/fetch-series/${series._id}` , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response.seasons);
      const { seasons } = response.data;
      const seasonDetails = await Promise.all(
        seasons.map(async (seasonId) => {
          const res = await axios.get(`http://127.0.0.1:3331/series/fetch-season/${series._id}?partId=${seasonId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          return res.data;
        })
      );
      setSeasonsData(seasonDetails);
      setViewSeasonsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching seasons:", error);
    } finally {
      setViewSeasonsLoading(false);
    }
  };

  // Handle opening the view seasons dialog
  const handleViewSeasonsClick = (series) => {
    fetchSeasons(series);
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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
      });
      fetchSeries(currentPage);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating series:", error);
      setSubmitError("Failed to update series.");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = useMemo(() => generateSeriesColumns(handleRowClick, handleAddSeasonClick, handleViewSeasonsClick), []);

  const theme = useMemo(
    () => createTheme({ palette: { mode: "dark" } }),
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
          onPaginationChange={({ pageIndex, pageSize }) => {
            setCurrentPage(pageIndex + 1); 
            setPageSize(pageSize); 
          }}
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
          await axios.post(`http://127.0.0.1:3331/series/add-season`, { seriesId: selectedSeries._id, ...seasonData }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              'Content-Type': 'application/json',
            },
          });
          fetchSeries(currentPage);
          setSeasonDialogOpen(false);
        }}
      />

      <ViewSeasonsDialog 
        open={viewSeasonsDialogOpen}
        seasons={seasonsData}
        onClose={() => setViewSeasonsDialogOpen(false)}
        onAddEpisodesClick={(season) => {
          console.log("Add episodes to:", season);
        }}  loading={viewSeasonsLoading}
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
