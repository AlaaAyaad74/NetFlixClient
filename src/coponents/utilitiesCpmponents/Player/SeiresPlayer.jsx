import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  PlayArrow,
  Pause,
  Fullscreen,
  FullscreenExit,
  VolumeUp,
  Speed,
  FastForward,
  FastRewind,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import './PlayerStyle.scss'; // Import your styles

const SeriesPlayer = () => {
  const { itemObj } = useParams(); // Get itemObj from the URL
  const episode = JSON.parse(decodeURIComponent(itemObj)); // Parse the episode object

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoUrl = episode.videoUrl; // Use the video URL from the episode object

  // Video controls
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`video-player ${isFullScreen ? 'full' : ''}`}>
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-screen"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls={false} // Custom controls
        ></video>
      ) : (
        <div>Loading video...</div>
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
            <div className="volume-control">
              <Tooltip title="Volume">
                <IconButton style={{ color: '#FFFFFF' }}>
                  <VolumeUp />
                </IconButton>
              </Tooltip>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          <div className="progress-bar">
            <input
              type="range"
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
            <span>{formatTime(currentTime)}</span>
          </div>
          <div className="right-controls">
            <Tooltip title="Speed">
              <IconButton style={{ color: '#FFFFFF' }}>
                <Speed />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fullscreen">
              <IconButton onClick={toggleFullScreen} style={{ color: '#FFFFFF' }}>
                {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Episode Details Section */}
      <div className="episode-details">
        <h2>{episode.episodeTitle}</h2>
        <p>{episode.episodeDesc}</p>
      </div>
    </div>
  );
};

export default SeriesPlayer;
