
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movieList.scss";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import customApi from "../../../api/tmdbApi";
import MovieCard from "../movieCard/MovieCard";
import getUserInfo from "../../../components/helpers/getUserVotes";

const MovieList = (props) => {
  const [movieItems, setMovieItems] = useState([]);
  // const [userRating, setUserRating] = useState({});
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
      try {
        let response = null;
        const params = {};

        if (type !== "similar") {
          response =
            category === "movie"
              ? await customApi.getMoviesList({ params })
              : await customApi.getSeriesList({ params });
        } else {
          response = await customApi.getMovieDetail(id);
        }

        const items = response.series || response.movies || [];
        const randomItems = getRandomItems(items, 10);

        // Fetch user ratings and merge before setting state
        const data = await getUserInfo();
        console.log(data);
        const updatedItems = randomItems.map((movie) => {
          const userVote = data?.votes?.find(
            (vote) => vote.contentId === movie._id
          );
          return userVote
            ? { ...movie, userRating: userVote.userRating }
            : movie;
        });

        setMovieItems(updatedItems);
        if (onCreated) onCreated();
      } catch (error) {
        console.error("Error fetching movies: ", error.message);
      }
    };

    getMoviesList();
  }, [category, type, id, onCreated]);

  const getRandomItems = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  console.log(movieItems);
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
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default MovieList;
