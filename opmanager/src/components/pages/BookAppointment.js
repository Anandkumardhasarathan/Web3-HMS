import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookAppointment } from "../../components/utils/api";
import { TextField, Button, Container, Typography, MenuItem, Snackbar, Alert, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

const departments = ["General Medicine", "Cardiology", "Dermatology", "Orthopedics", "Pediatrics"];

const BookAppointment = () => {
  const [form, setForm] = useState({ patientID: "", doctorID: "", department: "", appointmentDate: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookAppointment(form);
      setAlert({ open: true, message: response.message, severity: "success" });

      setTimeout(() => {
        navigate("/dashboard"); 
      }, 2000);
    } catch (error) {
      setAlert({ open: true, message: "Failed to book appointment", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          📅 Book an Appointment
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Patient ID"
              name="patientID"
              onChange={handleChange}
              margin="normal"
              required
              sx={{ bgcolor: "rgba(255,255,255,0.3)", borderRadius: "8px" }}
            />
            <TextField
              fullWidth
              label="Doctor ID"
              name="doctorID"
              onChange={handleChange}
              margin="normal"
              required
              sx={{ bgcolor: "rgba(255,255,255,0.3)", borderRadius: "8px" }}
            />

            <TextField
              fullWidth
              select
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ bgcolor: "rgba(255,255,255,0.3)", borderRadius: "8px" }}
            >
              {departments.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              type="date"
              name="appointmentDate"
              onChange={handleChange}
              margin="normal"
              required
              sx={{ bgcolor: "rgba(255,255,255,0.3)", borderRadius: "8px" }}
            />

            <Box display="flex" flexDirection="column" gap={2} mt={3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: "10px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  Confirm Appointment
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: "10px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Back to OP Manager Dashboard
                </Button>
              </motion.div>
            </Box>
          </form>
        </Paper>

        {/* Success/Error Snackbar */}
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
            {alert.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default BookAppointment;
