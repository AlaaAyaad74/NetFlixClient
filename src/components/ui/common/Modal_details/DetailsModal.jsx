import "./DetailsModal.scss";
import PropTypes from "prop-types";
import View from "./view/View";
import Info from "./info/Info";
import { useState } from "react";
import CardListParts from "./cardPartsMovie/CardListParts";

function DetailsModal({ item, setModal }) {
 
  const [season, setSeason] = useState(1); // Default to the first season

  
  return (
    <div className="main">
      <div className="details_Container">
        {/* Render View and Info components */}
        <View setModal={setModal} item={item} />
        <Info item={item} />

        {/* Conditional rendering for series */}
        {item.seasons  ? (
          <>
            <div className="sub_wrapper">
              <div className="head_episods">
                <h1>Episodes</h1>
                <div className="selector">
                  <select
                    onChange={(e) => {
                      setSeason(+e.target.value); // Convert value to number
                    }}
                  >
                    {Array.isArray(item.seasons)  ? item.seasons.map((season, index) => (
                      <option key={index} value={index + 1}>
                        Season {index + 1} {/* Index + 1 to show correct season number */}
                      </option>
                    )): <option  >
                    Season 1  {/* Index + 1 to show correct season number */}
                  </option>}
                  </select>
                </div>
              </div>
              {/* Render episodes for the selected season */}
              {/* {item.seasons[season - 1]?.episodes?.map((episode) => (
                <CardListParts
                  key={episode.id}
                  itemObj={episode}
                  image={item.seasons[season - 1]?.seasonPoster} // Optional chaining for safety
                />
              ))} */}
            </div>
          </>
        ) : (
          // Render for movies if no seasons
          <div className="sub_wrapper">
            <h1>Parts</h1>
            {item.parts && item.parts.length > 0 ? (
              item.parts.map((part) => (
                <CardListParts
                  key={part.id}
                  itemObj={part}
                  image={item.parts[0]?.moviePoster} // Display the first movie poster
                />
              ))
            ) : (
              <CardListParts itemObj={item} /> // Fallback for single movie object
            )}
          </div>
        )}
      </div>
    </div>
  );
}

DetailsModal.propTypes = {
  item: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired, // Ensuring setModal is required
};

export default DetailsModal;
