// import "./hero-slide.scss";
// import PropTypes from "prop-types";
// import customApi, { category, movieType } from "../../../api/tmdbApi";
// import apiConfig from "../../../api/apiConfig";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Button, { OutlinedButton } from "../button/Button";
// import Modal, { ModalContent } from "../modal/Modal";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import Genres from "../genres/Genres";
// import VideoPlayer from "../../../coponents/utilitiesCpmponents/VideoPlayer/videoPlayerComponent";
// import RatingComponent from "../Rating/oldRating";
// import { Box } from "@mui/material";

// const HeroSlide = () => {
//   const [movieItems, setMovieItems] = useState([]);
//   const [emblaRef] = useEmblaCarousel(
//     {
//       loop: true,
//       align: "start",
//     },
//     [Autoplay({ delay: 3000 })]
//   );

//   useEffect(() => {
//     const getMovies = async () => {
//       const params = { page: 1 };
//       try {
//         const response = await customApi.getMoviesList(movieType.popular, {
//           params,
//         });
//         setMovieItems(response.movies.slice(0, 4));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMovies();
//   }, []);

//   return (
//     <div className="hero-slide">
//       <div className="embla" ref={emblaRef}>
//         <div className="embla__container">
//           {movieItems.map((item) => (
//             <div key={item._id} className="embla__slide">
//               <HeroSlideItem item={item} className={"active"} />
//             </div>
//           ))}
//         </div>
//       </div>
//       {movieItems.map((item) => (
//         <TrailerModal key={item.id} item={item} />
//       ))}
//     </div>
//   );
// };

// const HeroSlideItem = (props) => {
//   const navigate = useNavigate();
//   const item = props.item;
//   const background = item.backdrop_path || apiConfig.image(item.backdrop_path);

//   // New state to control video modal
//   const [isPlayerModalActive, setIsPlayerModalActive] = useState(false);

//   const setModalActive = async () => {
//     const modal = document.querySelector(`#modal_${item.id}`);
//     const videos = await customApi.getVideos(category.movie, item.id);
//     console.log(videos);
//     if (videos.results.length > 0) {
//       const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
//       modal
//         .querySelector(".modal__content > iframe")
//         .setAttribute("src", videoSrc);
//     } else {
//       modal.querySelector(".modal__content").innerHTML = "No trailer";
//     }

//     modal.classList.toggle("active");
//   };

//   const handleWatchNowClick = () => {
//     navigate("/home/movie/" + item._id);
//   };

//   return (
//     <div
//       className={`hero-slide__item ${props.className}`}
//       style={{ backgroundImage: `url(${background})` }}
//     >
//       <div className="hero-slide__item__content container">
//         <div className="hero-slide__item__content__info">
//           <h2 className="title">{item.title}</h2>
//           <div className="overview">{item.overview}</div>

//           <div className="btns">
//             <Button onClick={handleWatchNowClick}>Watch Now</Button>
//             <OutlinedButton onClick={setModalActive}>
//               <span>Watch Trailer</span>
//             </OutlinedButton>
//           </div>
//           <div className="genres">
//             {(item.genres || item.genre_ids) &&
//               (item.genres || item.genre_ids)
//                 .slice(0, 5)
//                 .map((genre, index) => <Genres key={index} genre={genre} />)}
//           </div>
//           {/* Add the RatingComponent here */}
//           <Box
//             sx={{
//               display: "flex",
//               width: "30%",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             {console.log(item, "Rattttting")}
//             <RatingComponent movieId={item._id} userRating={item?.userRating} />
//           </Box>
//         </div>

//         <div className="hero-slide__item__content__poster">
//           <img src={apiConfig.image(item.poster_path)} alt={item.title} />
//         </div>
//       </div>

//       {/* Video Player Modal */}
//       {isPlayerModalActive && (
//         <Modal
//           active={isPlayerModalActive}
//           id={`player_modal_${item.id}`}
//           onClose={() => setIsPlayerModalActive(false)}
//         >
//           <ModalContent>
//             <VideoPlayer
//               videoSrc={item._id} // Assuming this is the video URL
//               title={item.title}
//               description={item.overview}
//               image={item.poster_path}
//             />
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// };

// const TrailerModal = (props) => {
//   const item = props.item;
//   const iframeRef = useRef(null);
//   const onClose = () => {
//     iframeRef.current.setAttribute("src", "");
//   };

//   return (
//     <Modal active={false} id={`modal_${item.id}`}>
//       <ModalContent onClose={onClose}>
//         <iframe
//           ref={iframeRef}
//           width="100%"
//           height="500px"
//           title="trailer"
//         ></iframe>
//       </ModalContent>
//     </Modal>
//   );
// };

// HeroSlideItem.propTypes = {
//   item: PropTypes.object,
//   className: PropTypes.string,
// };

// TrailerModal.propTypes = {
//   item: PropTypes.object,
// };

// export default HeroSlide;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import customApi, { category, movieType } from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";
import getUserInfo from "../../../components/helpers/getUserVotes";
import Button, { OutlinedButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Genres from "../genres/Genres";
import RatingComponent from "../Rating/oldRating";
import { Box } from "@mui/material";
import "./hero-slide.scss";
import PropTypes from "prop-types";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000 }),
  ]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await customApi.getMoviesList(movieType.popular, {
          params,
        });
        const movies = response.movies.slice(0, 4);

        const userVotes = await getUserInfo();
        const updatedMovies = movies.map((movie) => {
          const userVote = userVotes.votes?.find(
            (vote) => vote.contentId === movie._id
          );
          return userVote
            ? { ...movie, userRating: userVote.userRating }
            : movie;
        });

        setMovieItems(updatedMovies);
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
            <div key={item._id} className="embla__slide">
              <HeroSlideItem item={item} className="active" />
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

const HeroSlideItem = ({ item, className }) => {
  const navigate = useNavigate();
  const background = item.backdrop_path || apiConfig.image(item.backdrop_path);

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

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>

          <div className="btns">
            <Button onClick={() => navigate(`/home/movie/${item._id}`)}>
              Watch Now
            </Button>
            <OutlinedButton onClick={setModalActive}>
              Watch Trailer
            </OutlinedButton>
          </div>
          <div className="genres">
            {(item.genres || item.genre_ids)
              ?.slice(0, 5)
              .map((genre, index) => (
                <Genres key={index} genre={genre} />
              ))}
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <p style={{ fontSize: "1.6rem", fontWeight: "700" }}>
              Rate: {Number(item.rating).toFixed(2)}
            </p>
            <p style={{ fontSize: "2rem", fontWeight: "700" }}>
              {item.releaseYear}
            </p>
          </div>
          <Box
            sx={{
              display: "flex",
              width: "30%",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <RatingComponent movieId={item._id} userRating={item?.userRating} />
          </Box>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
};

HeroSlideItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

TrailerModal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HeroSlide;
