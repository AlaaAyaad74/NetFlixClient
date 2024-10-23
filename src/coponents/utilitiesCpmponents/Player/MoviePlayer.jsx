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

const MoviePlayer = () => {
  const { id } = useParams(); // Extract movie ID from URL params
  const videoRef = useRef(null);

  const [movieDetails, setMovieDetails] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Fetch movie video stream URL
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:5000/api/content/stream/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        };

        const response = await axios(config);
        if (response.data && response.data.url) {
          setVideoUrl(response.data.url); // Save the video URL
          console.log('Video URL:', response.data.url);
        } else {
          console.error('Video URL not found in response data');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, [id]);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:3331/movies/fetch-movie/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        };

        const response = await axios(config);
        setMovieDetails(response.data); // Save movie details
        console.log('Movie details:', response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

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

      {/* Movie Details Section */}
      {movieDetails && (
        <div className="movie-details">
          <img src={movieDetails.poster_path} alt={movieDetails.name} className="movie-poster" />
          <div className="movie-info">
            <h2>{movieDetails.name}</h2>
            <p>{movieDetails.overview}</p>
            <div className="movie-metadata">
              <span>{movieDetails.releaseYear}</span>
              <span>{movieDetails.language.join(', ')}</span>
              <span>{movieDetails.genre.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;
