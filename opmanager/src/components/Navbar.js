import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Menu as MenuIcon, Event, Person, Logout, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("opManager");
    navigate("/opmanager-login");
    window.history.pushState(null, null, "/opmanager-login");
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: "rgba(255, 255, 255, 0.2)", 
          backdropFilter: "blur(10px)", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "56px", px: 2 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { md: "none" } }}>
            <MenuIcon sx={{ fontSize: "22px" }} />
          </IconButton>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold", 
              fontSize: "15px", 
              letterSpacing: "0.5px", 
              color: "#222",
              ml: { xs: 2, md: 6 } , 
            }}
          >
            🏥 OP Manager
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "30px", alignItems: "center" }}>
            {navLinks.map((item, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.07 }} 
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ListItem 
                  component={Link} 
                  to={item.path} 
                  sx={{ 
                    color: location.pathname === item.path ? "#0D47A1" : "#333",
                    textTransform: "uppercase",
                    fontSize: "12px", 
                    fontWeight: "500",
                    px: 1.5,
                    borderBottom: location.pathname === item.path ? "2px solid #0D47A1" : "none",
                    "&:hover": { color: "#0D47A1", transition: "0.3s ease-in-out" }
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.label} sx={{ ml: 0.8 }} />
                </ListItem>
              </motion.div>
            ))}

            <ListItem 
              onClick={handleLogout} 
              sx={{ 
                cursor: "pointer",
                color: "red", 
                fontWeight: "bold", 
                fontSize: "12px", 
                textTransform: "uppercase",
                "&:hover": { color: "#ff5252", transition: "0.3s ease-in-out" } 
              }}
            >
              <Logout sx={{ mr: 1 }} />
              Logout
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 230, p: 2, background: "#F9F9F9", height: "100vh" }}>
          <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2} sx={{ fontSize: "13px", color: "#444" }}>
            🚀 Menu
          </Typography>
          <Divider />

          <List sx={{ mt: 2 }}>
            {navLinks.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                component={Link} 
                to={item.path} 
                onClick={toggleDrawer(false)}
                sx={{
                  color: location.pathname === item.path ? "#0D47A1" : "#333",
                  fontWeight: "500",
                  fontSize: "12px",
                  py: 1.5,  
                  "&:hover": { backgroundColor: "#E3F2FD" }
                }}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ ml: 0.8 }} />
              </ListItem>
            ))}

            <Divider sx={{ my: 2 }} />

            <ListItem button onClick={handleLogout} sx={{ color: "red", fontWeight: "bold", fontSize: "12px", py: 1.5 }}>
              <Logout />
              <ListItemText primary="Logout" sx={{ ml: 0.8 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

const navLinks = [
  { label: "Book Appointment", path: "/book-appointment", icon: <Event sx={{ fontSize: "16px", color: "#43A047" }} /> },
  { label: "Profile", path: "/profile", icon: <Person sx={{ fontSize: "16px", color: "#E65100" }} /> },
  { label: "Patient Registration", path: "/patient-registration", icon: <PersonAdd sx={{ fontSize: "16px", color: "#8E24AA" }} /> }
];

export default Navbar;
