import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

const AddEpisodeDialog = ({ open, onClose, seriesId, seasonId, onSubmitSuccess }) => {
  const [episodeData, setEpisodeData] = useState({
    episodeNumber: '',
    episodeTitle: '',
    episodeDesc: '',
    time: '',
    episodeImage: '',
    videoUrl: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken'); // Get the auth token
    try {
      const config = {
        method: 'post',
        url: 'http://127.0.0.1:3331/series/add-episode', // Use the API endpoint
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          seriesId,
          seasonId,
          ...episodeData,
        },
      };
      await axios(config);
      onSubmitSuccess(); // Notify the parent component of success
      onClose(); // Close the dialog
    } catch (err) {
      setError('Failed to add episode');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Episode</DialogTitle>
      <DialogContent>
        <TextField
          name="episodeNumber"
          label="Episode Number"
          type="number"
          value={episodeData.episodeNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="episodeTitle"
          label="Episode Title"
          value={episodeData.episodeTitle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="episodeDesc"
          label="Episode Description"
          value={episodeData.episodeDesc}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          name="time"
          label="Duration"
          value={episodeData.time}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="episodeImage"
          label="Episode Image URL"
          value={episodeData.episodeImage}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="videoUrl"
          label="Video URL"
          value={episodeData.videoUrl}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>Submit</Button>
      </DialogActions>
      {error && <p style={{ color: 'red', padding: '0 24px' }}>{error}</p>}
    </Dialog>
  );
};

export default AddEpisodeDialog;
