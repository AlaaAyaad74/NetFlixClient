import React, { useState, useEffect, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import SeriesDialog from "./SeriesDialog"; 
import AddSeasonDialog from "./AddSeasonDialog"; 
import ViewSeasonsDialog from "./ViewSeasonsDialog"; 
import { generateSeriesColumns } from "./seriesColumn"; 
import "./seriesGrid.scss";

// Base URL for all API requests
const BASE_URL = "http://127.0.0.1:3331/series";

// API Utility to handle fetching series
const fetchSeriesData = async (page, pageSize, setSeriesData, setTotalSeries, setError, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/series`, {
      params: { page, limit: pageSize },
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
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

// API Utility to fetch season details
const fetchSeasonDetails = async (series, setSeasonsData, setViewSeasonsLoading) => {
  setViewSeasonsLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/fetch-series/${series._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    const { seasons } = response.data;

    const seasonDetails = await Promise.all(
      seasons.map(async (seasonId) => {
        const res = await axios.get(`${BASE_URL}/fetch-season/${series._id}?partId=${seasonId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        return res.data;
      })
    );

    setSeasonsData(seasonDetails);
  } catch (error) {
    console.error("Error fetching seasons:", error);
  } finally {
    setViewSeasonsLoading(false);
  }
};

const SeriesGrid = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalSeries, setTotalSeries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dialogType, setDialogType] = useState(null); // Unified dialog state
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [seasonsData, setSeasonsData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [viewSeasonsLoading, setViewSeasonsLoading] = useState(false);

  useEffect(() => {
    fetchSeriesData(currentPage, pageSize, setSeriesData, setTotalSeries, setError, setLoading);
  }, [currentPage, pageSize]);

  // Callback for row click to open edit dialog
  const handleRowClick = useCallback((series) => {
    setSelectedSeries(series);
    setDialogType("edit");
  }, []);

  // Callback for opening the add season dialog
  const handleAddSeasonClick = useCallback((series) => {
    setSelectedSeries(series);
    setDialogType("addSeason");
  }, []);

  // Fetch seasons data and open the view seasons dialog
  const handleViewSeasonsClick = useCallback((series) => {
    fetchSeasonDetails(series, setSeasonsData, setViewSeasonsLoading);
    setDialogType("viewSeasons");
  }, []);

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogType(null);
    setSelectedSeries(null);
    setSubmitError("");
  };

  // Handle dialog submit (update series)
  const handleDialogSubmit = async (seriesData) => {
    setSubmitting(true);
    try {
      await axios.put(`${BASE_URL}/update-series/${selectedSeries._id}`, seriesData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      fetchSeriesData(currentPage, pageSize, setSeriesData, setTotalSeries, setError, setLoading);
      setDialogType(null);
    } catch (error) {
      console.error("Error updating series:", error);
      setSubmitError("Failed to update series.");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = useMemo(
    () => generateSeriesColumns(handleRowClick, handleAddSeasonClick, handleViewSeasonsClick),
    [handleRowClick, handleAddSeasonClick, handleViewSeasonsClick]
  );

  const theme = useMemo(() => createTheme({ palette: { mode: "dark" } }), []);

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

      {/* Dialog for editing series */}
      {dialogType === "edit" && (
        <SeriesDialog
          open={dialogType === "edit"}
          series={selectedSeries}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
          loading={submitting}
          error={submitError}
        />
      )}

      {/* Dialog for adding a season */}
      {dialogType === "addSeason" && (
        <AddSeasonDialog
          open={dialogType === "addSeason"}
          series={selectedSeries}
          onClose={handleDialogClose}
          onSubmit={async (seasonData) => {
            await axios.post(`${BASE_URL}/add-season`, { seriesId: selectedSeries._id, ...seasonData }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json",
              },
            });
            fetchSeriesData(currentPage, pageSize, setSeriesData, setTotalSeries, setError, setLoading);
            setDialogType(null);
          }}
        />
      )}

      {/* Dialog for viewing seasons */}
      {dialogType === "viewSeasons" && (
        <ViewSeasonsDialog
          open={dialogType === "viewSeasons"}
          seasons={seasonsData}
          onClose={handleDialogClose}
          onAddEpisodesClick={(season) => console.log("Add episodes to:", season)}
          loading={viewSeasonsLoading}
        />
      )}

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
