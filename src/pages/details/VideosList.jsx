import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import "./Details.scss";
import PropTypes from "prop-types";

const VideosList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);
  const { id, onCreated } = props;

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, id);
      setVideos(response.results.slice(0, 5));
    };
    getVideos();
    if (onCreated) onCreated();
  }, [category, id, onCreated]);
  return (
    <>
      {videos.length > 0 && (
        <div className="videos">
          {videos.map((item, i) => (
            <Video key={i} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);
  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        ref={iframeRef}
        width="100%"
        title="video"
        src={`https://www.youtube.com/embed/${item.key}`}
      ></iframe>
    </div>
  );
};

VideosList.propTypes = {
  id: PropTypes.number,
  onCreated: PropTypes.func,
};

Video.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string,
};

export default VideosList;
