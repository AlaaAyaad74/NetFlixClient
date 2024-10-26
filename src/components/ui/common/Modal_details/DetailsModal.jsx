import "./DetailsModal.scss";
import PropTypes from "prop-types";
import View from "./view/View";
import Info from "./info/Info";
import { useState, useEffect } from "react";
import CardListParts from "./cardPartsMovie/CardListParts";
import axios from "axios";

function DetailsModal({ item, setModal }) {
  const [season, setSeason] = useState(0); // Default to the first season
  const [seasonDetails, setSeasonDetails] = useState(null); // For storing fetched season details
  const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    if (item.seasons && !Array.isArray(item.seasons)) {
      fetchSeasonDetails(item.seasons);
    } else if (item.seasons && item.seasons.length > 0) {
      fetchSeasonDetails(item.seasons[season]); // Fetch the season details
    }
  }, [season, item.seasons]); // Fetch when season changes

  const fetchSeasonDetails = async (seasonId) => {
    setLoading(true); // Set loading state
    try {
      console.log(` Season ID: ${seasonId}`);
      const response = await axios.get(
        `http://127.0.0.1:3331/series/fetch-season/${seasonId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSeasonDetails(response.data); // Store fetched season details
    } catch (error) {
      console.error("Error fetching season details:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="main">
      <div className="details_Container">
        {/* Render View and Info components */}
        <View setModal={setModal} item={item} />
        <Info item={item} />

        {/* Conditional rendering for series */}
        {item.seasons && item.seasons.length > 0 ? (
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
                    {Array.isArray(item.seasons) ? (
                      item.seasons.map((seasonId, index) => (
                        <option key={index} value={index}>
                          Season {index + 1}
                        </option>
                      ))
                    ) : (
                      <option value={1}>Season 1</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Loading indicator */}
              {loading && <p>Loading episodes...</p>}

              {/* Render episodes for the selected season */}
              {seasonDetails &&
              seasonDetails.episodes &&
              seasonDetails.episodes.length > 0 ? (
                seasonDetails.episodes.map((episode) => (
                  <CardListParts
                    key={episode._id}
                    itemObj={episode}
                    image={seasonDetails.seasonPoster} // Optional chaining for safety
                  />
                ))
              ) : (
                <p>No episodes available for this season.</p>
              )}
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
  setModal: PropTypes.func.isRequired,
};

export default DetailsModal;
