import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
import './ViewSeasonsDialog.scss'; // Assuming you have the styles in a separate SCSS file

const ViewSeasonsDialog = ({ open, seasons = [], onClose, onAddEpisodesClick, loading }) => {
  const renderSeasonContent = (season) => (
    <div key={season._id} className="season-content">
      <h3>{season.seasonTitle}</h3>
      <p>{season.seasonDesc}</p>
      <p>Release Year: {season.releaseYear}</p>
      <img
        src={season.seasonPoster}
        alt={`Poster of ${season.seasonTitle}`}
        className="season-poster"
      />
      <Button
        variant="contained"
        onClick={() => onAddEpisodesClick(season)}
        className="add-episodes-btn"
      >
        Add Episodes
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose} className="dialog-container">
      <DialogTitle className="dialog-title">Seasons</DialogTitle>
      <DialogContent className="dialog-content">
        {loading ? (
          <div className="loading-container">
            <CircularProgress color="inherit" />
          </div>
        ) : Array.isArray(seasons) && seasons.length > 0 ? (
          seasons.map(renderSeasonContent)
        ) : (
          <p className="no-seasons">No seasons available for this series.</p>
        )}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} className="close-btn">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewSeasonsDialog;
