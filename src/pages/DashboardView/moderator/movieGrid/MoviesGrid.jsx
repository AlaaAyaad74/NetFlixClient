import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MovieDialog from "./MovieDialog"; // Import the MovieDialog component
import "./MoviesGrid.scss"; // SCSS for the MoviesGrid
import customApi from "../../../../api/tmdbApi"; // Import custom API functions
import { generateMovieColumns } from "./MovieColumns"; // Generate movie columns dynamically

const MoviesGrid = () => {
  // Component state management
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [dialogOpen, setDialogOpen] = useState(false); // Movie dialog open state
  const [selectedMovie, setSelectedMovie] = useState(null); // Movie selection state
  const [submitting, setSubmitting] = useState(false); // Form submission state
  const [submitError, setSubmitError] = useState(""); // Form submission error state

  // Fetch movies from the API
  const fetchMovies = async (page = 1) => {
    try {
      const response = await customApi.getMoviesList({ page, pageSize });
      if (response && response.movies) {
        setMoviesData(response.movies);
        setTotalMovies(response.totalMovies);
      } else {
        throw new Error("Invalid response structure");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(true);
      setLoading(false);
    }
  };

  // Fetch movies when component mounts or page changes
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  // Handle page change in pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
      fetchMovies(newPage);
    }
  };

  // Handle movie row click to open dialog
  const handleRowClick = (movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  // Close the movie dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedMovie(null);
    setSubmitError(""); // Clear any submission errors
  };

  // Handle form submission within the dialog
  const handleDialogSubmit = async (movieData) => {
    console.log("Movie data:", movieData);
    setSubmitting(true);
    setSubmitError(""); // Clear previous error
  
    try {
      const updatedData = movieData;
  
      // Validate and ensure movieDesc is provided
      if (movieData.overview !== selectedMovie.overview) {
        updatedData.movieDesc = movieData.overview || ""; // Default to empty string
      } else if (!selectedMovie.overview) {
        throw new Error("movieDesc is required.");
      }
  
      // Helper function to validate URLs
      const isValidUrl = (url) => {
        const pattern = new RegExp(
          "^(https?:\\/\\/)" + // Protocol
          "((([a-z0-9]\\w*):)?(\\w+@)?)?" + // Optional username:password@
          "(([a-z0-9-]+\\.)+[a-z]{2,})|" + // Domain...
          "localhost|" + // localhost
          "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IPv4
          "\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])" + // IPv6
          "(\\:\\d+)?(\\/[^\\s]*)?$", "i" // Port and path
        );
        return !!pattern.test(url);
      };
  
      // Validate and ensure valid moviePoster URL
      if (movieData.poster_path !== selectedMovie.poster_path) {
        if (isValidUrl(movieData.poster_path)) {
          updatedData.moviePoster = movieData.poster_path;
        } else {
          throw new Error("moviePoster must be a valid URL.");
        }
      }
  
      // Validate and ensure valid videoUrl
      if (movieData.trailer !== selectedMovie.trailer) {
        if (isValidUrl(movieData.trailer)) {
          updatedData.videoUrl = movieData.trailer || ""; // Optional, can be empty
        } else {
          throw new Error("videoUrl must be a valid URL.");
        }
      }
  
      // Compare and set other updated fields (releaseYear, backdrop_path, etc.)
      if (movieData.releaseYear !== selectedMovie.releaseYear) {
        updatedData.releaseYear = movieData.releaseYear || "";
      }
      if (movieData.backdrop_path !== selectedMovie.backdrop_path) {
        updatedData.backdrop_path = movieData.backdrop_path || "";
      }
      if (JSON.stringify(movieData.language) !== JSON.stringify(selectedMovie.language)) {
        updatedData.language = movieData.language || [];
      }
      if (JSON.stringify(movieData.genre) !== JSON.stringify(selectedMovie.genre)) {
        updatedData.genre = movieData.genre || [];
      }
      if (JSON.stringify(movieData.parts) !== JSON.stringify(selectedMovie.parts)) {
        updatedData.parts = movieData.parts || [];
      }
  
      // Ensure movieId is included
      updatedData.movieId = selectedMovie._id;
  
      // Call the API with only the updated fields
      await customApi.updateMovie(selectedMovie._id, updatedData);
      setDialogOpen(false); // Close dialog
      fetchMovies(currentPage); // Refresh movie list
    } catch (error) {
      console.error("Error updating movie:", error);
      setSubmitError(error.message || "Error updating movie. Please try again.");
    } finally {
      setSubmitting(false); // Reset loading state
    }
  };
  

  // Generate columns for the MaterialReactTable
  const columns = useMemo(() => generateMovieColumns(handleRowClick), []);

  // Create theme for Material UI components
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch movies</div>;

  return (
    <div className="movies-grid">
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={moviesData}
          manualPagination // Enable manual pagination
          rowCount={totalMovies} // Total number of rows
          state={{
            pagination: {
              pageIndex: currentPage - 1, // Adjust for 0-based index
              pageSize: pageSize,
            },
          }}
        />
      </ThemeProvider>

      {/* Movie Dialog Component */}
      <MovieDialog
        open={dialogOpen}
        movie={selectedMovie}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        loading={submitting} // Pass loading state
        error={submitError} // Pass submission error
      />

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * pageSize >= totalMovies}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesGrid;
