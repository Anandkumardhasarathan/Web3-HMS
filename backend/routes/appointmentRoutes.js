const express = require("express");
const { bookAppointment } = require("../controllers/appointmentController"); // ✅ Ensure correct import
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Ensure the function is properly referenced
router.post("/book-appointment", authMiddleware, bookAppointment);
module.exports = router;
