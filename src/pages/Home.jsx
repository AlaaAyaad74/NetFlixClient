import { Link } from "react-router-dom";
import HeroSlide from "../coponents/utilitiesCpmponents/hero-slide/HeroSlide";
import { OutlinedButton } from "../coponents/utilitiesCpmponents/button/Button";
import MovieList from "../coponents/utilitiesCpmponents/movieList/MovieList";
import { category, movieType } from "../api/tmdbApi";
import customApi from "../api/tmdbApi"; 
import { useEffect, useState } from "react";



const Home = () => {
  const [noData, setnoData] = useState(false);
const fetchData = async (apiMethod, params) => {
  try {
    const response = await customApi[apiMethod](params);
    // Check for empty data scenarios
    if (
      (response.totalMovies === 0 && response.movies.length === 0) ||
      (response.totalSeries === 0 && response.series.length === 0)
    ) setnoData(true);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    setnoData(true);
    return { error: true };
  }finally{
    setnoData(true);
  }
};

useEffect(() => {
  fetchData();
}, []);

  if (noData) {
    return   <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <p style={{ fontSize: "1.5rem", color: "#999" }}>No data to show</p>
  </div>;
  } else {
  return (
    <div>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/home/movie">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/home/movie">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV Shows</h2>
            <Link to="/home/tv">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Shows</h2>
            <Link to="/home/tv">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated} />
        </div>
      </div>
    </div>
  );}
};

export default Home;
