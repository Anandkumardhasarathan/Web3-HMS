import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginOPManager } from "../../components/utils/api";
import { TextField, Button, Container, Typography, Snackbar, Alert, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Lock, ArrowBack } from "@mui/icons-material";

const OPManagerLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginOPManager(form.email, form.password);

    if (response.success) {
      setAlert({ open: true, message: "Login successful!", severity: "success" });

      // ✅ Redirect to Dashboard after successful login
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setAlert({ open: true, message: response.message, severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.6)",
            color: "#333",
            textAlign: "center",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            width: 400,
          }}
        >
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              🔑 OP Manager Login
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.7, mb: 3 }}>
              Secure access to hospital management
            </Typography>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<Lock />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  background: "#90CAF9",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  "&:hover": { background: "#64B5F6" },
                }}
              >
                Login
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ArrowBack />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderColor: "#90CAF9",
                  color: "#1976D2",
                  "&:hover": { background: "#E3F2FD" },
                }}
                onClick={() => navigate("/")}
              >
                Back to Main Dashboard
              </Button>
            </motion.div>
          </form>
        </Paper>

        {/* Success/Error Snackbar */}
        <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
            {alert.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
};

export default OPManagerLogin;