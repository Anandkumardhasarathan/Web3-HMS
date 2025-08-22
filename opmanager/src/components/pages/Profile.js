import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../components/utils/api";
import { TextField, Button, Container, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", phoneNumber: "" });
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await updateProfile(profile);
  //     setAlert({ open: true, message: "Profile updated successfully!", severity: "success" });
  //   } catch (error) {
  //     setAlert({ open: true, message: "Update failed", severity: "error" });
  //   }
  // };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Profile
        </Typography>

        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <form >
            <TextField 
              fullWidth 
              label="Full Name" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
              margin="normal" 
              required 
            />

            <TextField 
              fullWidth 
              label="Phone Number" 
              name="phoneNumber" 
              value={profile.phoneNumber} 
              onChange={handleChange} 
              margin="normal" 
              required 
            />

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Update Profile
              </Button>
            </motion.div>
          </form>
        )}

        {/* Success/Error Snackbar */}
        <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
            {alert.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default Profile;
