const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation
const router = express.Router();
const Patient = require("../models/patientModel");

// Fetch patient details by patient ID
router.get("/details/:patientID", async (req, res) => {
  try {
    const { patientID } = req.params;
    console.log("🔎 Fetching details for Patient ID:", patientID);

    if (!patientID) {
      return res.status(400).json({ success: false, message: "Patient ID is required" });
    }

    // ✅ Check if the patientID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ success: false, message: "Invalid Patient ID format" });
    }

    // Fetch patient details only (excluding medical records)
    const patient = await Patient.findById(patientID).select("name age gender phoneNumber");

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, message: "Patient details fetched successfully", patient });

  } catch (error) {
    console.error("❌ Error fetching patient details:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
