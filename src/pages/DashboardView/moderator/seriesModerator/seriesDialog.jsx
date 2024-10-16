import React, { useState, useEffect } from "react";
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
import "../../../../coponents/dashboardComponents/UsersColumns/UserDialog.css"; // Import your CSS file

const SeriesDialog = ({ open, series, onClose, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState(series || {});

  useEffect(() => {
    setFormData(series || {});
  }, [series]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: "dialog-paper" }} // Apply custom class for the Dialog paper
    >
      <DialogTitle className="dialog-title">Edit Series Details</DialogTitle>
      <DialogContent className="dialog-content">
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        <TextField
          label="Description"
          name="desc"
          value={formData.desc || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          className="dialog-input"
        />
        <TextField
          label="Release Year"
          name="releaseYear"
          value={formData.releaseYear || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        <TextField
          label="Poster URL"
          name="img"
          value={formData.img || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="dialog-input"
        />
        {/* Add additional fields as necessary */}
        {loading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="dialog-button">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={loading}
          className="dialog-button"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeriesDialog;
