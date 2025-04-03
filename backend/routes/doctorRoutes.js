const express = require("express");
const { 
  getDoctorAppointments, 
  getPatientRecords, 
  // registerDoctor, 
  loginDoctor, 
  getDoctors 
} = require("../controllers/doctorController");

const { authMiddleware, doctorAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Doctor Registration
// router.post("/register", registerDoctor);

// ✅ Doctor Login
router.post("/login", loginDoctor);

// ✅ Get all registered doctors
router.get("/", authMiddleware, getDoctors);

// ✅ Get doctor-specific appointments (Only doctors can access)
router.get("/appointments/:doctorID", authMiddleware, doctorAuth, getDoctorAppointments);

// ✅ Fetch a patient's medical records (Only doctors can access)
router.get("/patient-records/:patientId", authMiddleware, doctorAuth, getPatientRecords);

module.exports = router;
