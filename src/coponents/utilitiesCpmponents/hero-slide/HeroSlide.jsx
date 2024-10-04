import "./hero-slide.scss"; //
import PropTypes from "prop-types"; //
import tmdbApi, { category, movieType } from "../../../api/tmdbApi"; //
import apiConfig from "../../../api/apiConfig"; //
import { useEffect, useState, useRef } from "react"; // useHistory
// import { Swiper, SwiperSlide } from "swiper/react"; //
import Button, { OutlinedButton } from "../button/Button"; //
import Modal, { ModalContent } from "../modal/Modal"; //
import { useNavigate } from "react-router-dom"; //
// import SwiperCore ,{ Autoplay } from "swiper"; //
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Genres from "../genres/Genres";

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
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
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
  let navigate = useNavigate();

  const item = props.item;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);
    // console.log(videos);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };
  console.log(item.genre_ids);
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
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch Now
            </Button>
            <OutlinedButton onClick={setModalActive}>
              {/* <i className="bx bx-plus"></i> */}
              <span>Watch trailer</span>
            </OutlinedButton>
          </div>
          <div className="genres">
            {(item.genres || item.genre_ids) &&
              (item.genres || item.genre_ids)
                .slice(0, 5)
                .map((item, index) => <Genres key={index} genre={item} />)}
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
      <div className="hero-slide__item__related">thhthhdfdaflklkjhsa</div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);
  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };
  //there is a bug here when closing it still playing until open it again
  //solved by using onclose function as props to modal and call it with x button in modal

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

HeroSlideItem.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
};

TrailerModal.propTypes = {
  item: PropTypes.object,
};

export default HeroSlide;
