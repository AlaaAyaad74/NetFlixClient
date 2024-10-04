import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";
import "./Details.scss";

const CastList = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const getCasts = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCasts();
  }, [category, props.id]);
  return (
    <>
      <div className="casts">
        {casts.map((item, i) => (
          <div key={i} className="casts__item">
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <div className="casts__item__name">
              <h3>{item.name}</h3>
              <h4>{item.character}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

CastList.propTypes = {
  id: PropTypes.number,
};

export default CastList;
