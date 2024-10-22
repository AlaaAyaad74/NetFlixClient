import "./hero-slide.scss";
import PropTypes from "prop-types";
import customApi, { category, movieType } from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { OutlinedButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Genres from "../genres/Genres";
import VideoPlayer from "../../../components/Player/Player";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 3000 })]
  );

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await customApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.movies.slice(0, 4));
        console.log(response.movies[0]._id);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {movieItems.map((item) => (
            <div key={item.id} className="embla__slide">
              <HeroSlideItem item={item} className={"active"} />
            </div>
          ))}
        </div>
      </div>
      {movieItems.map((item) => (
        <TrailerModal key={item.id} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  const navigate = useNavigate();
  const item = props.item;
  const background = item.backdrop_path || apiConfig.image(item.backdrop_path);
  console.log(item._id);
  console.log("===========================");

  // New state to control video modal
  const [isPlayerModalActive, setIsPlayerModalActive] = useState(false);

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await customApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  const handleWatchNowClick = () => {
    navigate("/home/movie/" + item._id);
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            {/* Modify the onClick handler to use the new function */}
            <Button onClick={handleWatchNowClick}>Watch Now</Button>
            <OutlinedButton onClick={setModalActive}>
              <span>Watch Trailer</span>
            </OutlinedButton>
          </div>
          <div className="genres">
            {(item.genres || item.genre_ids) &&
              (item.genres || item.genre_ids)
                .slice(0, 5)
                .map((genre, index) => <Genres key={index} genre={genre} />)}
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.image(item.poster_path)} alt="" />
        </div>
      </div>

      {/* Video Player Modal */}
      {isPlayerModalActive && (
        <Modal
          active={isPlayerModalActive}
          id={`player_modal_${item.id}`}
          onClose={() => setIsPlayerModalActive(false)}
        >
          <ModalContent>
            <VideoPlayer
              videoSrc={item._id} // Assuming this is the video URL
              title={item.title}
              description={item.overview}
              image={item.poster_path}
            />
          </ModalContent>
        </Modal>
      )}
    </div>
);
};

const TrailerModal = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

HeroSlideItem.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
};

TrailerModal.propTypes = {
  item: PropTypes.object,
};

export default HeroSlide;
