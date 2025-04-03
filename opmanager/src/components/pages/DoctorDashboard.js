import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, CircularProgress, Button, Grid, Card, CardContent, CardActions, Alert } from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", preventBackNavigation);
    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    const doctorId = sessionStorage.getItem("doctorId");
    const token = sessionStorage.getItem("doctorToken");

    if (!doctorId || !token) {
      setError("Doctor ID or Token missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctors/appointments/${doctorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Fetched Appointments:", response.data);

      if (response.data?.appointments?.length > 0) {
        setAppointments(response.data.appointments);
      } else {
        setAppointments([]);
        setError("No appointments found.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const preventBackNavigation = () => {
    window.history.pushState(null, null, window.location.pathname);
  };

  return (
    <Paper sx={{ padding: "30px", maxWidth: "900px", margin: "auto", marginTop: "50px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
        🏥 Doctor Dashboard
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : appointments.length === 0 ? (
        <Alert severity="info">No appointments available.</Alert>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appt) => {
            const patient = appt.patientID || {};
            return (
              <Grid item xs={12} sm={6} key={appt._id}>
                <Card sx={{ backgroundColor: "#fff", boxShadow: 3, borderRadius: "12px" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>
                      <Person sx={{ verticalAlign: "middle", marginRight: "8px" }} />
                      {patient.name || "Kalai Priyan" ||"karthi"}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#7f8c8d" }}>
                      Age: {patient.age || "20"} | Gender: {patient.gender || "Male"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#2980b9", fontWeight: "bold", marginTop: "5px" }}>
                      <AccessTime sx={{ verticalAlign: "middle", marginRight: "5px" }} />
                      {new Date(appt.appointmentDate).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/doctor/patient-details/${patient._id}`)}
                      sx={{ borderRadius: "20px", textTransform: "none", padding: "8px 15px" }}
                    >
                      View Past Records
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default DoctorDashboard;
