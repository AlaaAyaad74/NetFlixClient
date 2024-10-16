import React, { useState } from "react";
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

const AddSeasonDialog = ({ open, series, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", episodes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        episodes: formData.episodes.split(",").map((ep) => ep.trim()), // Convert episode string to array
      });
      setFormData({ title: "", episodes: "" }); // Reset form data
    } catch (err) {
      setError("Failed to add season.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Season</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Season Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Episodes (comma separated)"
          name="episodes"
          value={formData.episodes}
          onChange={handleChange}
          fullWidth
          margin="dense"
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
