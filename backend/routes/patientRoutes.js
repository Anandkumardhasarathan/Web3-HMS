const express = require("express");
const { registerPatient } = require("../controllers/patientController");
const Patient = require("../models/patientModel"); // ✅ Import the model

const router = express.Router();

// ✅ Route to Register a New Patient
router.post("/register", registerPatient);


// ✅ Get Patient Details by NFT Token ID
router.get("/patient/:nftToken", async (req, res) => {
    try {
      const { nftToken } = req.params;
  
      console.log("🔍 Searching for patient with NFT Token:", nftToken);
  
      // ✅ Find patient in MongoDB
      const patient = await Patient.findOne({ patientNFT: nftToken });
  
      if (!patient) {
        return res.status(404).json({ message: "❌ Patient not found!" });
      }
  
      console.log("✅ Patient Found:", patient);
  
      res.json(patient);
    } catch (error) {
      console.error("❌ Error Fetching Patient:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
