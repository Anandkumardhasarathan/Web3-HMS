import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { LocalHospital, Person, Healing, ArrowBack } from "@mui/icons-material";

const MainDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #dfe9f3, #ffffff)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.6)",
            color: "#333",
            textAlign: "center",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🚑 Hospital Management System
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.7, mb: 3 }}>
            Securely manage hospital operations with ease.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {[  
              { label: "OP Manager", path: "/opmanager-login", color: "#ADD8E6", icon: <Person /> },
              { label: "Doctor", path: "/doctor-login", color: "#90EE90", icon: <LocalHospital /> },
              { label: "Nurse", path: "/nurse", color: "#FFB6C1", icon: <Healing /> },
            ].map((btn, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={btn.icon}
                  sx={{
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    background: btn.color,
                    color: "#333",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": { background: "#fff", color: btn.color, border: `2px solid ${btn.color}` },
                  }}
                  onClick={() => navigate(btn.path)}
                >
                  {btn.label}
                </Button>
              </motion.div>
            ))}

            {/* 🔙 Back to Main Dashboard Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* <Button
                variant="outlined"
                fullWidth
                startIcon={<ArrowBack />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => navigate("/")} // Adjust route as needed
              >
                Back to Main Dashboard
              </Button> */}
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MainDashboard;
