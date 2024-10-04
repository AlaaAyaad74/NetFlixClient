import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./Details.scss";
import CastList from "./CastList";
import VideosList from "./VideosList";
import MovieList from "../../coponents/utilitiesCpmponents/movieList/MovieList";
import Genres from "../../coponents/utilitiesCpmponents/genres/Genres";
import { Fab } from "@mui/material"; // Import Material-UI Floating Action Button
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import an icon for the button
import DetailsModal from "../../components/ui/common/Modal_details/DetailsModal";
import series from "../../../data/series";
const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [isCreatedChild, setIsCreatedChild] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getDetails = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0); // what is this for? => scroll to top of the page
    };
    getDetails();
  }, [category, id]);
  console.log(item);
  const handleCreatedChild = () => {
    setIsCreatedChild(true);
  };
  console.log(isCreatedChild);
  const handleWatchNowClick = () => {
    setModal(true)
    console.log("Watch Now clicked!");
  };
  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres
                    .slice(0, 5)
                    .map((genre, i) => <Genres genre={genre} key={i} />)}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="nb-3 section videos">
              {isCreatedChild ? (
                <div className="section__videos__header">
                  <h1>Videos</h1>
                </div>
              ) : null}
              <VideosList id={item.id} onCreated={handleCreatedChild} />
            </div>

            <div className="section mb-3">
              <div className="section__videos__header mb-2">
                {isCreatedChild ? <h2>Similar</h2> : null}
              </div>
              <MovieList
                category={category}
                type="similar"
                id={item.id}
                onCreated={handleCreatedChild}
                genres={item.genres}
              />
            </div>
          </div>
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#ff0000', // Adjust button color as per your theme
            }}
            onClick={handleWatchNowClick}
          >
            <PlayArrowIcon sx={{ mr: 1 }} />
            Watch Now
          </Fab>
          {modal && <DetailsModal item={series[0]} setModal={setModal} />}
        </>
      )}
    </>
  );
};

export default Details;
