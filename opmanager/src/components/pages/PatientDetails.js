import React, { useState } from "react";
import { getPatientDetails } from "../../components/utils/api"; // ✅ Import Axios API
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { motion } from "framer-motion";

const PatientDetails = () => {
  const [patientID, setPatientID] = useState("");
  const [patient, setPatient] = useState(null);

  const handleSearch = async () => {
    if (!patientID) return;
    const data = await getPatientDetails(patientID);
    setPatient(data);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Patient Details
        </Typography>

        {/* Input Field */}
        <TextField
          label="Enter NFT Token ID"
          variant="outlined"
          fullWidth
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="success"
          startIcon={<Search />}
          onClick={handleSearch} // ✅ Fetch Patient Data
          fullWidth
          sx={{ mb: 2 }}
        >
          Search
        </Button>
      </motion.div>

      {/* Patient Info */}
      {patient && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card sx={{ mt: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="secondary">
                {patient.name}
              </Typography>
              <Typography variant="body1">
                <strong>Age:</strong> {patient.age}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {patient.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Blood Group:</strong> {patient.bloodGroup}
              </Typography>
              <Typography variant="body1">
                <strong>Emergency Contact:</strong> {patient.emergencyContact}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default PatientDetails;
