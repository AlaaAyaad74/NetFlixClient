import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import VideoPlayer from '../coponents/utilitiesCpmponents/VideoPlayer/videoPlayerComponent';
import Button, { OutlinedButton } from '../coponents/utilitiesCpmponents/button/Button';
import AccordionComponent from '../coponents/utilitiesCpmponents/Accordion/AccordionComponent';
import './EpisodeDetailPage.scss';

const EpisodeDetailPage = () => {
  const [seriesData, setSeriesData] = useState(null);  // State to store series data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3331/series/fetch-series/66dc1e103bc76a701b0a5fa3`); // Adjust the ID or make it dynamic
        setSeriesData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching series details');
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Prepare items for AccordionComponent
  const accordionItems = seriesData.seasons.map((season, index) => ({
    title: `Season ${season.seasonNumber}`,
    children: season.episodes.map((episode, idx) => (
      <div key={idx} className="episode-item">
        <h3>{`Episode ${episode.episodeNumber}: ${episode.title}`}</h3>
        <p>{episode.description}</p>
      
      </div>
    ))
  }));

  return (
    <div className="episode-detail-page">
      <div className="container">
        <div className="episode-detail">
          <div className="video-section">
            <VideoPlayer videoSrc={seriesData.video} /> {/* Use trailer video from API */}
          </div>
          <div className="episode-info">
            <h1>{seriesData.name}</h1> {/* Series title */}
            <p>{`Published Year: ${seriesData.yearOfPublish}`}</p> {/* Year of publish */}
            <div className="buttons">
              <Button className="play-button">Play</Button>
              <OutlinedButton className="add-to-watchlist">Add to Watchlist</OutlinedButton>
            </div>
          </div>

          {/* Use AccordionComponent to display seasons and episodes */}
          <AccordionComponent items={accordionItems} />
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;
