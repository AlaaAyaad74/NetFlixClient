import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import AddEpisodeDialog from "./AddEpisodeDialog"; // Import the AddEpisodeDialog component
import "./ViewSeasonsDialog.scss"; // Assuming you have the styles in a separate SCSS file

const ViewSeasonsDialog = ({ open, seasons = [], onClose, onAddEpisodesClick, loading }) => {
  const [selectedSeason, setSelectedSeason] = useState(null); // For holding the selected season when adding episodes
  const [addEpisodeDialogOpen, setAddEpisodeDialogOpen] = useState(false); // State to manage the AddEpisodeDialog

  // Open AddEpisodeDialog with the selected season
  const handleAddEpisodesClick = (season) => {
    setSelectedSeason(season); // Store the selected season
    setAddEpisodeDialogOpen(true); // Open the AddEpisodeDialog
  };

  // Close AddEpisodeDialog
  const handleAddEpisodeDialogClose = () => {
    setAddEpisodeDialogOpen(false);
    setSelectedSeason(null); // Clear the selected season when the dialog closes
  };

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
        onClick={() => handleAddEpisodesClick(season)} // Open the AddEpisodeDialog when clicked
        className="add-episodes-btn"
      >
        Add Episodes
      </Button>
    </div>
  );

  return (
    <>
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
          <Button onClick={onClose} className="close-btn">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* AddEpisodeDialog to handle adding new episodes */}
      {selectedSeason && (
        <AddEpisodeDialog
          open={addEpisodeDialogOpen}
          onClose={handleAddEpisodeDialogClose}
          seriesId={seasons[0]?.seriesId} // Pass series ID (assume all seasons are part of the same series)
          seasonId={selectedSeason._id} // Pass selected season ID
          onSubmitSuccess={() => {
            handleAddEpisodeDialogClose(); // Close the dialog on successful submission
            onAddEpisodesClick(selectedSeason); // Trigger the parent function to refresh the view if needed
          }}
        />
      )}
    </>
  );
};

export default ViewSeasonsDialog;
