import { useParams } from "react-router-dom";
import PageHeader from "../coponents/utilitiesCpmponents/page-header/PageHeader";
import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../coponents/utilitiesCpmponents/movie-grid/MovieGrid";

const Catalog = () => {
  const { category, keyword, id } = useParams();
  console.log(category, keyword, id);

  // Handle invalid categories
  const validCategories = [cate.movie, cate.tv];
  if (!validCategories.includes(category)) {
    // You can redirect to ErrorPage or handle it accordingly
  }

  return (
    <>
      {keyword ? (
        <PageHeader>Search Results for "{keyword}"</PageHeader>
      ) : (
        <PageHeader>{category === cate.movie ? "Movies" : "TV Series"}</PageHeader>
      )}
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} keyword={keyword} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
