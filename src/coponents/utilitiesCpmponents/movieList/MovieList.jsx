import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movieList.scss";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// import { Link } from "react-router-dom";
// import Button from "../button/Button";
import tmdbApi, { category as cate } from "../../../api/tmdbApi";
// import apiConfig from "../../api/apiConfig";
import MovieCard from "../movieCard/MovieCard";

const MovieList = (props) => {
  const [movieItems, setMovieItems] = useState([]);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 8000 })]
  );
  const { onCreated, type, category, id, genres } = props;
  console.log(genres);
  useEffect(() => {
    const getMoviesList = async () => {
      let response = null;
      const params = {};
      if (type !== "similar") {
        switch (category) {
          case cate.movie:
            response = await tmdbApi.getMoviesList(type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }

      setMovieItems(response.results);
      if (onCreated) onCreated();
    };

    getMoviesList();
  }, [category, type, id, onCreated]);
  return (
    <div className="hero-slide movie-list">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {movieItems.map((item) => (
              <div key={item.id} className="embla__slide">
                <MovieCard item={item} category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
  children: PropTypes.node,
  onCreated: PropTypes.func,
  genres: PropTypes.array,
};

export default MovieList;
