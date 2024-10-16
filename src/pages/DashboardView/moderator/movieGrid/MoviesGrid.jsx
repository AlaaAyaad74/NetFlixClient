import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MovieDialog from "./MovieDialog"; // Import the MovieDialog
import "./MoviesGrid.scss"; // SCSS for the MoviesGrid
import customApi from "../../../../api/tmdbApi"; // Ensure your API file has the necessary functions
import { generateMovieColumns } from "./MovieColumns"; // Import the movie columns generator

const MoviesGrid = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie
  const [submitting, setSubmitting] = useState(false); // State for form submission
  const [submitError, setSubmitError] = useState(""); // State for submission error

  const fetchMovies = async (page = 1) => {
    try {
      const response = await customApi.getMoviesList({ page, pageSize });
      console.log(response); // Log the full response to see its structure
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

  useEffect(() => {
    fetchMovies(currentPage); // Fetch movies when the component mounts
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage); // Update current page
      fetchMovies(newPage); // Fetch new movies based on page
    }
  };

  const handleRowClick = (movie) => {
    console.log("Row clicked:", movie);
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    console.log("Dialog closed");
    setDialogOpen(false);
    setSelectedMovie(null);
    setSubmitError(""); // Clear any submission errors
  };

  const handleDialogSubmit = async (movieData) => {
    console.log("Submitting movie data:", movieData);
    setSubmitting(true); // Set loading state for submission
    setSubmitError(""); // Clear previous error
  
    try {
      // Prepare the data according to the expected format
      const updatedData = {};
  
      // Helper function to validate URLs
      const isValidUrl = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z0-9]\\w*):)?(\\w+@)?)?' + // username:password@
          '((([a-z0-9-]+\\.)+[a-z]{2,})|' + // domain...
          'localhost|' + // localhost...
          '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IPv4
          '\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])' + // IPv6
          '(\\:\\d+)?(\\/[^\\s]*)?$','i'); // port and path
        return !!pattern.test(url);
      };
  
      // Compare and set updated fields
      if (movieData.name !== selectedMovie.name) {
        updatedData.movieTitle = movieData.name;
      }
      if (movieData.overview !== selectedMovie.overview) {
        updatedData.movieDesc = movieData.overview || ""; // Default to empty string
      }
      if (movieData.poster_path !== selectedMovie.poster_path) {
        if (isValidUrl(movieData.poster_path)) {
          updatedData.moviePoster = movieData.poster_path;
        } else {
          throw new Error("Invalid poster URL");
        }
      }
      if (movieData.trailer !== selectedMovie.trailer) {
        if (isValidUrl(movieData.trailer)) {
          updatedData.videoUrl = movieData.trailer || ""; // Optional, can be empty
        } else {
          throw new Error("Invalid video URL");
        }
      }
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
      updatedData.movieDesc = movieData.movieDesc || "";
  
  
    
  
      // Call the API with only the updated fields
      await customApi.updateMovie(selectedMovie._id, updatedData);
      
      setDialogOpen(false); // Close dialog
      fetchMovies(currentPage); // Refresh movie list
    } catch (error) {
      console.error("Error updating movie:", error);
      setSubmitError(error.message || "Error updating movie. Please try again."); // Set error message
    } finally {
      setSubmitting(false); // Reset loading state
    }
  };
  

  const columns = useMemo(() => generateMovieColumns(handleRowClick), []); // Use the generated columns

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
      },
    }), []
  );

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
          enableRowSelection // Enable row selection if needed
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

      {/* Optional: Add pagination controls if needed */}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * pageSize >= totalMovies}>Next</button>
      </div>
    </div>
  );
};

export default MoviesGrid;
