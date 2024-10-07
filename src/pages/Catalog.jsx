import { useParams } from "react-router-dom";
import PageHeader from "../coponents/utilitiesCpmponents/page-header/PageHeader";
import { category as cate } from "../api/tmdbApi"; // Import your custom API categories
import MovieGrid from "../coponents/utilitiesCpmponents/movie-grid/MovieGrid";
import ErrorPage from "../coponents/utilitiesCpmponents/errorPage/ErrorPage";

const Catalog = () => {
  const { category, keyword } = useParams();
  console.log(category, keyword);

  // Handle invalid categories
  const validCategories = [cate.movie, cate.tv];
  if (!validCategories.includes(category)) {
    // You can redirect to ErrorPage or handle it accordingly
    return <ErrorPage />; // Example of redirection (handle it as you need)
  }

  return (
    <>
      {keyword ? (
        <PageHeader>Search Results for `{keyword}`</PageHeader>
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
