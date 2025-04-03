// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, Paper, Typography, Box, CircularProgress, Alert } from "@mui/material";
// import { motion } from "framer-motion";
// import { Lock, Person, ArrowBack } from "@mui/icons-material";

// const DoctorLogin = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle Input Change
//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   // Handle Login Request
//   const handleLogin = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/doctors/login", credentials, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Login Response:", response.data); // Debugging

//       if (response.status === 200) {
//         alert("Login Successful!");

//         if (response.data.doctorId) {
//           localStorage.setItem("doctorId", response.data.doctorId);
//           localStorage.setItem("doctorToken", response.data.token);
//           console.log("Stored Doctor ID:", localStorage.getItem("doctorId")); // Debugging
//         } else {
//           console.error("Doctor ID is missing in the response!");
//           setError("Doctor ID not received. Please try again.");
//           return;
//         }

//         navigate("/doctor-dashboard");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       setError(error.response?.data?.message || "Invalid Credentials! Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to right, #dfe9f3, #ffffff)",
//       }}
//     >
//       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
//         <Paper
//           elevation={10}
//           sx={{
//             padding: "30px",
//             borderRadius: "20px",
//             backdropFilter: "blur(10px)",
//             background: "rgba(255, 255, 255, 0.7)",
//             color: "#333",
//             textAlign: "center",
//             width: "350px",
//             boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             👨‍⚕️ Doctor Login
//           </Typography>

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <Box component="form" display="flex" flexDirection="column" gap={2} mt={2}>
//             <TextField label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} fullWidth variant="outlined" InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
//             <TextField label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} fullWidth variant="outlined" InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }} />

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }} onClick={handleLogin} disabled={loading}>
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//               </Button>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button variant="outlined" fullWidth startIcon={<ArrowBack />} sx={{ mt: 1, py: 1.2, fontSize: "0.9rem", fontWeight: "bold" }} onClick={() => navigate("/")}>
//                 Back to Main Dashboard
//               </Button>
//             </motion.div>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Box>
//   );
// };

// export default DoctorLogin;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box, CircularProgress, Alert, Card, CardContent, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Lock, Person, ArrowBack, Visibility, CheckCircle } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/doctors/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200 && response.data.success) {
        alert("✅ Login Successful!");
  
        const { token } = response.data;
  
        // 🔹 Decode JWT token to extract doctorId
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
  
        if (!decodedToken || !decodedToken.doctorID) {
          setError("❌ Doctor ID not found in token. Please try again.");
          return;
        }
  
        const doctorId = Number(decodedToken.doctorID);
        console.log("Extracted Doctor ID:", doctorId);
  
        // 🔹 Store doctorId & token in session storage
        sessionStorage.setItem("doctorId", doctorId);
        sessionStorage.setItem("doctorToken", token);
  
        // 🔹 Fetch appointments after login
        await fetchAppointments(doctorId, token);
  
        navigate("/doctor-dashboard");
      } else {
        setError(response.data.message || "❌ Invalid Credentials! Please try again.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.response?.data?.message || "❌ Invalid Credentials! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async (doctorId, token) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors/appointments/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Appointments:", response.data);
    } catch (error) {
      console.error("❌ Error fetching appointments:", error.response?.data || error);
    }
  };
    


  // Handle marking patient as "Checked"
  const handleCheckPatient = async (appointmentId) => {
    try {
      await axios.post(`http://localhost:5000/api/appointments/${appointmentId}/check`);
      alert("Patient Checked Successfully!");
      setAppointments((prev) =>
        prev.map((appointment) => (appointment._id === appointmentId ? { ...appointment, checked: true } : appointment))
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
      setError("Error marking patient as checked.");
    }
  };

  // Handle viewing past records
  const handleViewRecords = (nftId) => {
    navigate(`/patient-records/${nftId}`);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #dfe9f3, #ffffff)",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <Paper
          elevation={10}
          sx={{
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.7)",
            color: "#333",
            textAlign: "center",
            width: "400px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            👨‍⚕️ Doctor Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} fullWidth variant="outlined" InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
            <TextField label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} fullWidth variant="outlined" InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }} />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }} onClick={handleLogin} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outlined" fullWidth startIcon={<ArrowBack />} sx={{ mt: 1, py: 1.2, fontSize: "0.9rem", fontWeight: "bold" }} onClick={() => navigate("/")}>
                Back to Main Dashboard
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>

      {/* Show Appointments if Available */}
      {appointments.length > 0 && (
        <Box sx={{ mt: 3, width: "80%" }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>📅 Appointments Assigned</Typography>
          {appointments.map((appointment) => (
            <Card key={appointment._id} sx={{ mb: 2, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CardContent>
                <Typography><strong>Patient:</strong> {appointment.patientName}</Typography>
                <Typography><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</Typography>
                <Typography><strong>Time:</strong> {appointment.time}</Typography>
                {appointment.checked && <Typography color="green"><strong>✔️ Checked</strong></Typography>}
              </CardContent>
              <Box>
                <IconButton color="success" onClick={() => handleCheckPatient(appointment._id)} disabled={appointment.checked}>
                  <CheckCircle />
                </IconButton>
                <IconButton color="primary" onClick={() => handleViewRecords(appointment.nftId)}>
                  <Visibility />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DoctorLogin;
