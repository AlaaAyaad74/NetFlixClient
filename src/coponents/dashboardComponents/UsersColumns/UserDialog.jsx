import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "./UserDialog.css"; // Import the custom CSS file for styling
import PropType from "prop-types";

const UserDialog = ({ open, user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPrime: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        password: "",
        confirmPassword: "",
        isPrime: user.isPrime || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const { password, confirmPassword, ...rest } = formData;
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit({ ...rest, id: user.id, password });
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog-paper" }}>
      <DialogTitle className="dialog-title">Edit User</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          className="dialog-input"
        />
        <TextField
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          className="dialog-input"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          className="dialog-input"
        />
        <TextField
          name="password"
          label="New Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          className="dialog-input"
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          className="dialog-input"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isPrime"
              checked={formData.isPrime}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Prime User"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserDialog.propTypes = {
  open: PropType.bool.isRequired,
  user: PropType.object,
  onClose: PropType.func.isRequired,
  onSubmit: PropType.func.isRequired,
};
export default UserDialog;
