import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import customApi from "../../api/tmdbApi"; // Import your custom API
import "./Details.scss";
import CastList from "./CastList";
import VideosList from "./VideosList";
import MovieList from "../../coponents/utilitiesCpmponents/movieList/MovieList";
import Genres from "../../coponents/utilitiesCpmponents/genres/Genres";
import { Fab } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DetailsModal from "../../components/ui/common/Modal_details/DetailsModal";

const Details = () => {
  const { id } = useParams(); // movie/series id
  const [item, setItem] = useState(null);
  const [isCreatedChild, setIsCreatedChild] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate(); // Used to navigate to error page

  useEffect(() => {
    const getDetails = async () => {
      try {
        let response;
        
        // Fetch movie details from your custom API
        response = await customApi.getMovieDetail(id);

        if (response) {
          setItem(response);
          window.scrollTo(0, 0); // Scroll to the top of the page
        } else {
          throw new Error("Movie not found"); // Trigger error for invalid movie data
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
        navigate("*"); // Navigate to the ErrorPage in case of an error
      }
    };

    getDetails();
  }, [id, navigate]);

  const handleCreatedChild = () => {
    setIsCreatedChild(true);
  };

  const handleWatchNowClick = () => {
    setModal(true);
  };

  return (
    <>
      {item && (
        <>
          {/* Banner Section */}
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.backdrop_path})`,
            }}
          ></div>

          {/* Movie Details Section */}
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.poster_path})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.name}</h1>
              
              <div className="genres">
                {item.genre && item.genre.map((genreId, i) => (
                  <Genres genre={genreId} key={i} />
                ))}
              </div>
              
              <p className="overview">{item.overview}</p>
              
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item._id} />
              </div>
            </div>
          </div>

          {/* Videos and Similar Section */}
          <div className="container">
            <div className="nb-3 section videos">
              {isCreatedChild && (
                <div className="section__videos__header">
                  <h1>Videos</h1>
                </div>
              )}
              <VideosList id={item._id} onCreated={handleCreatedChild} />
            </div>

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
                genres={item.genre}
              />
            </div>
          </div>

          {/* Floating "Watch Now" Button */}
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#ff0000',
            }}
            onClick={handleWatchNowClick}
          >
            <PlayArrowIcon sx={{ mr: 1 }} />
            Watch Now
          </Fab>

          {modal && <DetailsModal item={item} setModal={setModal} />}
        </>
      )}
    </>
  );
};

export default Details;
