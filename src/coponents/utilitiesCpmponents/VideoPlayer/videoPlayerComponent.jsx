import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, FastForward, FastRewind, VolumeUp, Fullscreen, Speed } from '@mui/icons-material';
import AccordionComponent from '../Accordion/AccordionComponent'; // Assuming AccordionComponent is in the same directory
import './VideoPlayer.scss';

const VideoPlayer = ({ episodes }) => {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isVolumeHover, setIsVolumeHover] = useState(false);
  const [isSpeedHover, setIsSpeedHover] = useState(false);

  // Ensure currentEpisode is always defined, using fallback in case of invalid index
  const currentEpisode = episodes[currentEpisodeIndex] || {};

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSpeedChange = (newSpeed) => {
    videoRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleEpisodeChange = (index) => {
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
    videoRef.current.load();
    videoRef.current.play();
  };

  return (
    <div className="video-player">
      {currentEpisode.videoSrc ? (
        <video
          ref={videoRef}
          src={currentEpisode.videoSrc}
          className="video-screen"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls={false} // Custom controls
        ></video>
      ) : (
        <div className="video-screen-fallback">No video available</div> // Fallback UI if videoSrc is missing
      )}
      <div className="controls">
        <div className="control-buttons">
          <div className="left-controls">
            <Tooltip title="Rewind 10s">
              <IconButton onClick={() => skipTime(-10)} style={{ color: '#FFFFFF' }}>
                <FastRewind />
              </IconButton>
            </Tooltip>
            <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
              <IconButton onClick={togglePlay} style={{ color: '#FFFFFF' }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward 10s">
              <IconButton onClick={() => skipTime(10)} style={{ color: '#FFFFFF' }}>
                <FastForward />
              </IconButton>
            </Tooltip>
            <div
              className="volume-control"
              onMouseEnter={() => setIsVolumeHover(true)}
              onMouseLeave={() => setIsVolumeHover(false)}
            >
              <Tooltip title="Volume">
                <IconButton style={{ color: '#FFFFFF' }}>
                  <VolumeUp />
                </IconButton>
              </Tooltip>
              {isVolumeHover && (
                <div className="volume-slider">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="progress-bar">
            <input
              type="range"
              step="0.0000001"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => (videoRef.current.currentTime = e.target.value)}
              style={{
                background: `linear-gradient(to right, #F50723 ${Math.round(
                  (currentTime / duration) * 100
                )}%, #808080 ${Math.round((currentTime / duration) * 100)}%)`,
              }}
            />
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="duration">{formatTime(duration)}</span>
          </div>
          <div className="right-controls">
            <div
              className="speed-control"
              onMouseEnter={() => setIsSpeedHover(true)}
              onMouseLeave={() => setIsSpeedHover(false)}
            >
              <Tooltip title="Speed">
                <IconButton style={{ color: '#FFFFFF' }}>
                  <Speed />
                </IconButton>
              </Tooltip>
              {isSpeedHover && (
                <div className="speed-options">
                  <button onClick={() => handleSpeedChange(0.5)}>0.5x</button>
                  <button onClick={() => handleSpeedChange(0.75)}>0.75x</button>
                  <button onClick={() => handleSpeedChange(1)}>1x</button>
                  <button onClick={() => handleSpeedChange(1.25)}>1.25x</button>
                  <button onClick={() => handleSpeedChange(1.5)}>1.5x</button>
                </div>
              )}
            </div>
            <Tooltip title="Fullscreen">
              <IconButton style={{ color: '#FFFFFF' }}>
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="next-episode">
        {episodes.length > 0 && (
          <>
            <h2>Next Episode</h2>
            <AccordionComponent
              items={episodes.map((episode, index) => ({
                title: episode.title,
                children: (
                  <div
                    className={`episode-item ${
                      index === currentEpisodeIndex ? 'active' : ''
                    }`}
                    onClick={() => handleEpisodeChange(index)}
                  >
                    <img src={episode.image} alt={episode.title} />
                    <div className="episode-details">
                      <div className="episode-description">{episode.description}</div>
                    </div>
                  </div>
                ),
              }))}
            />
          </>
        )}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      videoSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

VideoPlayer.defaultProps = {
  episodes: [], // Default to an empty array if no episodes are passed
};

export default VideoPlayer;
