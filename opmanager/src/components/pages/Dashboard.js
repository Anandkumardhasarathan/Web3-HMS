import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { People, Event, LocalHospital } from "@mui/icons-material";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const stats = [
  { label: "Total Patients", value: 120, color: "#BBDEFB", icon: <People fontSize="large" sx={{ color: "#1E88E5" }} /> },
  { label: "Today's Appointments", value: 35, color: "#C8E6C9", icon: <Event fontSize="large" sx={{ color: "#43A047" }} /> },
  { label: "Doctors Available", value: 10, color: "#FFCDD2", icon: <LocalHospital fontSize="large" sx={{ color: "#E53935" }} /> }
];

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Check authentication when component mounts
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
      // If user is not logged in, redirect to login page
      navigate("/opmanager-login");
    }

    // ✅ Prevent back button from logging out
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          p: 4,
          minHeight: "100vh",
          background: "linear-gradient(to right, #E3F2FD, #F1F8E9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: "center", color: "#333" }}>
            🏥 OP Manager Dashboard
          </Typography>
        </motion.div>

        <Grid container spacing={3} justifyContent="center">
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <Card
                  elevation={10}
                  sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    p: 3,
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                        {item.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: "#444" }}>
                        {item.value}
                      </Typography>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
