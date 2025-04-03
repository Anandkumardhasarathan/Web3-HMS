import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
// import {registerPatient} from "../components../utils/api"; // ✅ Added the import statement

const PatientRegistration = () => {
  const [form, setForm] = useState({
    hospitalID: "HOSPITAL1223",
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    phoneNumber: "",
    emergencyContact: "",
    medicalConditions: "",
    allergies: "",
  });

  const [responseMsg, setResponseMsg] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/patients/register", form, {
        headers: {
          Authorization: "Bearer 0c1b7b11.6be27fe490184a7b97f6825a7b756873",
          "Content-Type": "application/json",
        },
      });

      setResponseMsg({ type: "success", text: "Patient Registered Successfully!" });
      setForm({
        hospitalID: "HOSPITAL1223",
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        address: "",
        phoneNumber: "",
        emergencyContact: "",
        medicalConditions: "",
        allergies: "",
      });
    } catch (error) {
      setResponseMsg({ type: "error", text: "Failed to Register Patient!" });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: "center" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Patient Registration
        </Typography>

        {responseMsg && <Alert severity={responseMsg.type}>{responseMsg.text}</Alert>}

        <Card sx={{ mt: 2, p: 3, boxShadow: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Age" type="number" name="age" value={form.age} onChange={handleChange} required sx={{ mb: 2 }} />

              <TextField select fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange} required sx={{ mb: 2 }}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField fullWidth label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={form.emergencyContact} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Medical Conditions (comma separated)" name="medicalConditions" value={form.medicalConditions} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Allergies (comma separated)" name="allergies" value={form.allergies} onChange={handleChange} sx={{ mb: 2 }} />

              <Button type="submit" variant="contained" color="primary" startIcon={<PersonAdd />} fullWidth>
                Register Patient
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default PatientRegistration;
