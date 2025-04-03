import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, CircularProgress, Alert, List, ListItem, ListItemText } from "@mui/material";

const PatientRecords = () => {
  const { nftToken } = useParams();
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/records/${nftToken}`);
        setRecords(response.data);
      } catch (error) {
        setError("Failed to fetch patient records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [nftToken]);

  return (
    <Paper sx={{ padding: "20px", maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
      <Typography variant="h5">📜 Patient Medical Records</Typography>
      {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
        <List>
          {records && records.records.map((record, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={record.diagnosis} secondary={`Date: ${record.date}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PatientRecords;
