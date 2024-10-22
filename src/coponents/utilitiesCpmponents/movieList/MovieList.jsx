import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movieList.scss";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import customApi from "../../../api/tmdbApi";
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

  const { onCreated, type, category, id } = props;

  useEffect(() => {
    const getMoviesList = async () => {
      let response = null;
      const params = {}; // Add your parameters if needed
      if (type !== "similar") {
        if (category === "movie") {
          response = await customApi.getMoviesList({ params });
        } else {
          response = await customApi.getSeriesList({ params });
        }
      } else {
        response = await customApi.getMovieDetail(id);
      }

      // Extract the movies or series from the response
      const items = response.series || response.movies || [];

      // Get 10 random items from the list
      const randomItems = getRandomItems(items, 10);

      setMovieItems(randomItems);
      if (onCreated) onCreated();
    };

    getMoviesList();
  }, [category, type, id, onCreated]);

  const getRandomItems = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Return the first `count` items
  };

  return (
    <div className="hero-slide movie-list">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {movieItems.map((item) => (
              <div key={item._id} className="embla__slide">
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
