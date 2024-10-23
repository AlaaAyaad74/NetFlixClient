import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import customApi from "../../api/tmdbApi";
import "./Details.scss";
import CastList from "./CastList";
import MovieList from "../../coponents/utilitiesCpmponents/movieList/MovieList";
import Genres from "../../coponents/utilitiesCpmponents/genres/Genres";
import { Fab } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DetailsModal from "../../components/ui/common/Modal_details/DetailsModal";
import qs from "query-string";

const Details = () => {
  const { id } = useParams(); // movie/series id
  const navigate = useNavigate(); // Used to navigate to error page
  const location = useLocation(); // Access passed state
  const [item, setItem] = useState(location.state?.item || null); // Use passed item if available
  const [isCreatedChild, setIsCreatedChild] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const parsedItem = qs.parse(location.search);
    if (parsedItem) {
      setItem(parsedItem);
    }
    // Fetch details if item is not passed via state
    else if (!item) {
      const getDetails = async () => {
        try {
          const response = await customApi.getMovieDetail(id);
          if (response) {
            setItem(response);
            window.scrollTo(0, 0); // Scroll to the top of the page
          } else {
            throw new Error("Movie not found");
          }
        } catch (error) {
          console.error("Failed to fetch details:", error);
          navigate("*"); // Navigate to the error page in case of an error
        }
      };

      getDetails();
    }
  }, [id, navigate, location.search]);

  const handleCreatedChild = () => {
    setIsCreatedChild(true);
  };

  const handleWatchNowClick = () => {
    setModal(true);
  };

  // Helper function to determine if the item is a series
  const isSeries = () => {
    return item && item.seasons && item.seasons.length > 0;
  };

  return (
    <>
      {item ? (
        <>
          {/* Banner Section */}
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.img || item.backdrop_path})`,
            }}
          ></div>

          {/* Movie/Series Details Section */}
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.poster_path || item.img})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.name || item.title}</h1>
              {Array.isArray(item.genre) ? (
                item.genre.map((genre, index) => (
                  <Genres key={index}>{genre}</Genres>
                ))
              ) : (
                <Genres>{item.genre}</Genres> // Fallback in case it's not an array
              )}

              <p className="overview">{item.overview || item.desc}</p>

       
            </div>
          </div>

          {/* Similar Section */}
          <div className="container">
            <div className="section mb-3">
              {isCreatedChild && (
                <div className="section__videos__header mb-2">
                  <h2>Similar</h2>
                </div>
              )}
              <MovieList
                category={item.category}
                type="similar"
                id={item._id}
                onCreated={handleCreatedChild}
                genres={Array.isArray(item.genre) ? item.genre : []}
              />
            </div>
          </div>

          {/* Floating "Watch Now" Button */}
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#ff0000",
            }}
            onClick={handleWatchNowClick}
          >
            <PlayArrowIcon sx={{ mr: 1 }} />
            Watch Now
          </Fab>

          {modal && <DetailsModal item={item} setModal={setModal} />}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Details;
