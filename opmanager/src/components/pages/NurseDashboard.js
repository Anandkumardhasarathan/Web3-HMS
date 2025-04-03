import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NurseDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">👩‍⚕️ Nurse Dashboard</Typography>
      <Button variant="contained" color="success" sx={{ mt: 5 }} onClick={() => navigate("/main-dashboard")}>
        Back to Main Dashboard
      </Button>
    </Container>
  );
};

export default NurseDashboard;
