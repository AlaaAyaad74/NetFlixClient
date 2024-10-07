import PropTypes from "prop-types";
import "./movieGrid.scss";
import MovieCard from "../movieCard/MovieCard.jsx";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { OutlinedButton } from "../button/Button";
import customApi, {
  category as cate,
  category,
  movieType,
  tvType,
} from "../../../api/tmdbApi.js";
import Input from "../input/Input.jsx";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case cate.movie:
            response = await customApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await customApi.getSeriesList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await customApi.getSeriesList(props.category, { params });
      }
      console.log(response);
     if(response!=null) { 
      if(response.movies!=null && response.movies.length){
        setItems(response.movies);
      }else{
        setItems(response.series);
      }
      setTotalPage(response.total_pages);}
   
    };
    getList();
  }, [props.category, keyword]);

  const loadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case cate.movie:
          response = await customApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await customApi.getSeriesList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await customApi.searchMovies(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };
  return (
    <>
      <div className="section mb-3">
        <MovieSearch keyword={keyword} category={props.category} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadMore">
          <OutlinedButton className="small" onClick={loadmore}>
            Load More
          </OutlinedButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword || "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
      setKeyword("");
    }
  }, [keyword, props.category, navigate]);
  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

MovieGrid.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

MovieSearch.propTypes = {
  keyword: PropTypes.string,
  category: PropTypes.string.isRequired,
};

export default MovieGrid;