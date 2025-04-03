const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OPManager = require("../models/opManagerModel");
const Appointment = require("../models/appointmentModel"); // ✅ Import Appointment Model
const Patient = require("../models/patientModel"); // ✅ Import Patient Model
const { sendDoctorNotification } = require("../utils/notificationService"); // ✅ Import Notification Service
require("dotenv").config();

// ✅ OP Manager Login (Uses Credentials Given by Admin)
exports.loginOPManager = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await OPManager.findOne({ email });
  
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: "opManager" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({
        token,
        user: {
          _id: user._id,
          hospitalID: user.hospitalID,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// ✅ Get OP Manager Details
exports.getOPManagerDetails = async (req, res) => {
  try {
    const user = await OPManager.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update OP Manager Profile (Only Name & Phone Number)
exports.updateOPManager = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const updatedUser = await OPManager.findByIdAndUpdate(
      req.user.id,
      { name, phoneNumber },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Book OP Appointment (Assigns a Doctor & Stores in DB)
exports.bookAppointment = async (req, res) => {
  try {
    const { patientID, doctorID, department, appointmentDate } = req.body;

    // Ensure Patient Exists
    const patient = await Patient.findOne({ patientID });
    if (!patient) return res.status(404).json({ message: "Patient not found!" });

    // Create a New Appointment
    const newAppointment = new Appointment({
      patientID,
      doctorID,
      department,
      appointmentDate,
    });

    await newAppointment.save();

    // Notify Doctor via SMS/Email
    await sendDoctorNotification(doctorID, `New appointment scheduled for Patient ID: ${patientID}`);

    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///opmanager registration
// ✅ OP Manager Registration
exports.registerOPManager = async (req, res) => {
  try {
    const { hospitalID, name, phoneNumber, email, password } = req.body;

    // Check if the email or phone number is already registered
    const existingUser = await OPManager.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone number already registered!" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new OP Manager
    const newOPManager = new OPManager({
      hospitalID,
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newOPManager.save();

    res.status(201).json({ message: "OP Manager registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

