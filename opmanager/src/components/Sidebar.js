import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Typography, Divider } from "@mui/material";
import { Dashboard, CalendarToday, Person, Menu, PersonAdd } from "@mui/icons-material";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Book Appointment", icon: <CalendarToday />, path: "/book-appointment" },
    { text: "Patient Details", icon: <Person />, path: "/patient-details" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Patient Registration", icon: <PersonAdd />, path: "/patient-registration" },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} sx={{ position: "fixed", top: 15, left: 15, zIndex: 1300, color: "black" }}>
        <Menu fontSize="large" />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 260,
            height: "100vh",
            background: "rgba(255, 255, 255, 0.2)", // Glassmorphism effect
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.1)",
            p: 2,
          }}
        >
          {/* Sidebar Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "15px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1", letterSpacing: "1px" }}>
              🏥 OP Manager
            </Typography>
          </motion.div>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", mb: 2 }} />

          {/* Sidebar Menu */}
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderRadius: "8px",
                      color: "#333",
                      fontWeight: "500",
                      transition: "0.3s",
                      "&:hover": { backgroundColor: "rgba(13, 71, 161, 0.1)", color: "#0D47A1" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#0D47A1", minWidth: "40px" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
