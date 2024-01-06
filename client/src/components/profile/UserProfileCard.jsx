import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
} from "@mui/material";

const UserProfileCard = ({ user }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // You can implement logic to update the user profile in the database here
    setEditing(false);
    // Make API call to update the user profile (using fetch or axios)
    // For simplicity, let's assume a successful update
    // You may want to handle errors and loading states in a real-world application
  };

  const handleCancel = () => {
    setEditing(false);
    // Optionally, reset the editedUser state to discard changes
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Card
      sx={{ className: "bg-slate-100" }}
      className="bg-slate-100 border border-blue-200 hover:shadow-xl hover:shadow-blue-400 hover:bg-blue-100 hover:text-white hover:transition-transform hover:-translate-x-2 hover:translate-y-2"
    >
      <CardContent>
        <div className="felx flex-col justify-center space-y-10 w-80">
          <div className=" w-full h-auto rounded-full">
            <img
              src={user.img}
              alt="User"
              style={{ width: "100%", height: "auto", borderRadius: "50%" }}
            />
          </div>

          <Typography variant="h5" component="div">
            {user.fullName}
          </Typography>
          <Typography color="textSecondary">{user.email}</Typography>
          <Typography fontSize={14} color="textSecondary">
            {"Country "}
            <Typography fontSize={20} color="textPrimary">
              {user.country}
            </Typography>
          </Typography>
          <Typography fontSize={14} color="textSecondary">
            {"City "}
            <Typography fontSize={20} color="textPrimary">
              {user.city}
            </Typography>
          </Typography>
          <Typography fontSize={14} color="textSecondary">
            {"Phone Number "}
            <Typography fontSize={20} color="textPrimary">
              {user.phone}
            </Typography>
          </Typography>

          <Button onClick={handleEditClick}>Edit</Button>
        </div>

        <Modal open={isEditing} onClose={handleCancel}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px",
              p: 2,
            }}
          >
            <Typography variant="h6" component="div">
              Edit Profile
            </Typography>
            <form>
              <TextField
                label="Full Name"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  marginY: 1,
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  marginY: 1,
                }}
              />
              <TextField
                label="Country"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  marginY: 1,
                }}
              />
              <TextField
                label="City"
                name="city"
                value={editedUser.city}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  marginY: 1,
                }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  marginY: 1,
                }}
              />
              <div className=" space-x-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
