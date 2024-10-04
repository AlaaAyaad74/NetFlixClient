import "./DetailsModal.scss";

import PropTypes from "prop-types";
import View from "./view/view";
import Info from "./info/Info";
import { useState } from "react";

import CardListParts from "./cardPartsMovie/CardListParts";

function DetailsModal({ item, setModal }) {
  const [season, setSeason] = useState(1);
  console.log(item.parts);
  return (
    <div className="main">
      <div className="details_Container">
        <View setModal={setModal} item={item} />
        <Info item={item} />
        {item.seasons && (
          <div className="sub_wrapper">
            <div className="head_episods">
              <h1>Episods</h1>
              <div className="selector">
                <select
                  onChange={(e) => {
                    setSeason(e.target.value);

                    console.log(+e.target.value);
                  }}
                >
                  {item.seasons.map((season, index) => (
                    <option key={index} value={index + 1}>
                      Season {season.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/*this modal for Tv show & Series*/}
            {item.seasons[season - 1].episodes.map((ebisode) => (
              <CardListParts
                key={ebisode.id}
                title={ebisode.epissodeTitle}
                year={ebisode.releaseYear}
                description={ebisode.episodeDescription}
                image={item.seasons[season - 1].seasonPoster}
              />
            ))}
          </div>
        )}

        {/*this modal for Movies*/}
        {item.parts && (
          <div className="sub_wrapper">
            <div className="head_episods">
              <h1>Parts</h1>
            </div>
            {/*this modal for Tv show & Series*/}
            {item.parts.map((part) => (
              <CardListParts
                key={part.id}
                id={part.id}
                title={part.movieTitle}
                year={part.releaseYear}
                description={part.movieDesc}
                image={item.parts[season - 1].moviePoster}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
DetailsModal.propTypes = {
  item: PropTypes.object.isRequired,
  setModal: PropTypes.func,
};
export default DetailsModal;
