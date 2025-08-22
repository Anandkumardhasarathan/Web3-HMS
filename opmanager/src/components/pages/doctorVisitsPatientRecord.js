// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Paper, Typography, CircularProgress, Alert } from "@mui/material";

// const DoctorVisitPatientRecord = () => {
//   const { patientID } = useParams();
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPatientDetails();
//   }, []);

//   const fetchPatientDetails = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get(`http://localhost:5000/api/patients/details/${patientID}`);
//       console.log("Fetched Patient Details:", response.data);

//       if (response.data.success) {
//         setPatient(response.data.patient);
//       } else {
//         setError("Patient details not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching patient details:", error);
//       setError("Failed to load patient details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ padding: "30px", maxWidth: "600px", margin: "auto", marginTop: "50px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
//       <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
//         🏥 Patient Details
//       </Typography>

//       {loading ? (
//         <CircularProgress sx={{ display: "block", margin: "auto" }} />
//       ) : error ? (
//         <Alert severity="error">{error}</Alert>
//       ) : (
//         <>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>
//             {patient?.name}
//           </Typography>
//           <Typography variant="body1" sx={{ color: "#7f8c8d", marginBottom: "10px" }}>
//             Age: {patient?.age} | Gender: {patient?.gender}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#2980b9", fontWeight: "bold" }}>
//             Phone: {patient?.phoneNumber || "N/A"}
//           </Typography>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default DoctorVisitPatientRecord;
import React from "react";

import { Card, CardContent, Typography, Grid, Paper, Box, Divider } from "@mui/material";

const DoctorVisitPatientRecords = () => {
  const patient = {
    patientID: "2ce79d7b-5da0-47dd-906b-0efee3c53928",
    hospitalID: "HOSPITAL1223",
    patientNFT: "2",
    name: "Karthi",
    age: 21,
    gender: "Male",
    bloodGroup: "B+",
    address: "Karur",
    phoneNumber: "8428308414",
    emergencyContact: "8766545768",
    medicalConditions: ["Good"],
    allergies: ["tumor"],
    qrCodeUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAHQAAAB0CAYAAABUmhYnAAAA...",
    dateRegistered: "2025-03-27T05:09:07.773+00:00",
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: "auto", my: 4, p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        Patient Details
      </Typography>
      
      <Card sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
        <CardContent>
          {/* Row 1 - Patient & Hospital ID */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography><strong>Patient ID:</strong> {patient.patientID}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography><strong>Hospital ID:</strong> {patient.hospitalID}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Row 2 - NFT, Name, Age, Gender, Blood Group */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography><strong>Patient NFT:</strong> {patient.patientNFT}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><strong>Name:</strong> {patient.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography><strong>Age:</strong> {patient.age}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography><strong>Gender:</strong> {patient.gender}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Row 3 - Address, Phone, Emergency Contact */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Address:</strong> {patient.address}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography><strong>Phone:</strong> {patient.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography><strong>Emergency:</strong> {patient.emergencyContact}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Row 4 - Medical Conditions & Allergies */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Medical Conditions:</strong> {patient.medicalConditions.join(", ")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Allergies:</strong> {patient.allergies.join(", ")}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Row 5 - Date Registered & QR Code */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography><strong>Date Registered:</strong> {new Date(patient.dateRegistered).toLocaleString()}</Typography>
            </Grid>
            
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default DoctorVisitPatientRecords;
