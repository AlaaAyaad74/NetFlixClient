import React from "react";
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

const MovieDialog = ({ open, movie, onClose, onSubmit, loading, error }) => {
  const [formData, setFormData] = React.useState(movie || {});
  
  React.useEffect(() => {
    setFormData(movie || {}); // Update form data when movie changes
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData); // Submit form data
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog-paper" }}>
      <DialogTitle className="dialog-title">Movie Details</DialogTitle>
      <DialogContent className="dialog-content">
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
          className="dialog-input"
        />
        <TextField
          label="Overview"
          name="overview"
          value={formData.overview || ""}
          onChange={handleChange}
          fullWidth
          multiline
          className="dialog-input"
        />
        <TextField
          label="Release Year"
          name="releaseYear"
          value={formData.releaseYear || ""}
          onChange={handleChange}
          fullWidth
          className="dialog-input"
        />
        <TextField
          label="Poster URL"
          name="poster_path"
          value={formData.poster_path || ""}
          onChange={handleChange}
          fullWidth
          className="dialog-input"
        />
        {loading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDialog;
