import React, { useState } from "react";
import "../../../../coponents/dashboardComponents/UsersColumns/UserDialog.css"; // Import your CSS file
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

const AddSeasonDialog = ({ open, series, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    seasonTitle: "",
    seasonDesc: "",
    seasonPoster: "",
    releaseYear: "",
    episodes: "", // Keeping this as an empty string for input
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // If no episodes are provided, send an empty array for episodes
      await onSubmit({
        ...formData,
        episodes: formData.episodes ? formData.episodes.split(",").map((ep) => ep.trim()) : [], // Send empty list if no episodes
      });
      // Reset form data
      setFormData({ seasonTitle: "", seasonDesc: "", seasonPoster: "", releaseYear: "", episodes: "" });
      setError("");
    } catch (err) {
      setError("Failed to add season.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog-paper" }}>
      <DialogTitle className="dialog-title">Add Season</DialogTitle>
      <DialogContent className="dialog-content">
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Season Title"
          name="seasonTitle"
          value={formData.seasonTitle}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        <TextField
          label="Season Description"
          name="seasonDesc"
          value={formData.seasonDesc}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        <TextField
          label="Poster URL"
          name="seasonPoster"
          value={formData.seasonPoster}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        <TextField
          label="Release Year"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSeasonDialog;
