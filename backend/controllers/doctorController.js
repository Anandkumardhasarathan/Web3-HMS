// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Doctor = require("../models/doctorModel");
// const Appointment = require("../models/appointmentModel");
// const Patient = require("../models/patientModel");
// const mongoose = require("mongoose"); // ✅ Import mongoose

// const JWT_SECRET = "b3f0efeb7984a8ed833bdb928ae20833421aac523dfc534e6b6422620ce9af5ec9f7568be57c8ae826c52ac09aad7d351f6f6ced43ed4c6a53ef041f5d332e5f"; // Replace with an actual secure key

// // Register a new doctor

// exports.loginDoctor = async (req, res) => {
//   try {
//     console.log("Received login request:", req.body); // Debugging

//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "❌ Email and password are required" });
//     }

//     const doctor = await Doctor.findOne({ email: email.trim().toLowerCase() });
//     console.log("Doctor found:", doctor);

//     if (!doctor) {
//       return res.status(400).json({ message: "❌ Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "❌ Invalid email or password" });
//     }

//     const token = jwt.sign({ doctorID: doctor.doctorID, email: doctor.email, role: "doctor" }, JWT_SECRET, { expiresIn: "1h" });

//     res.json({ success: true, message: "✅ Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "❌ Error logging in" });
//   }
// };

// // Get all doctors
// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: "❌ Error fetching doctors" });
//   }
// };

// // Get appointments assigned to a doctor
// exports.getDoctorAppointments = async (req, res) => {
//   try {
//     const doctorID = req.params.doctorID;
//     console.log("Doctor ID received:", doctorID); // 🔹 Debugging step

//     if (!doctorID) {
//       return res.status(400).json({ message: "❌ Missing doctorID in request." });
//     }

//     // Fetch appointments for the doctor
//     const appointments = await Appointment.find({ doctorID });
//     console.log("Appointments fetched:", appointments); // 🔹 Debugging step

//     if (!appointments.length) {
//       return res.status(404).json({ message: "⚠️ No appointments found for this doctor." });
//     }

//     res.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error); // 🔹 Log full error
//     res.status(500).json({ message: "❌ Error fetching appointments", error: error.message });
//   }
// };


// // Get full patient history
// exports.getPatientRecords = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     console.log("Received patientId:", patientId);

//     // Find patient by `patientID` (not `_id`)
//     const patient = await Patient.findOne({ patientID: patientId });

//     if (!patient) {
//       return res.status(404).json({ message: "❌ Patient not found" });
//     }

//     // Debugging: Log fetched patient data
//     console.log("Fetched patient:", patient);

//     res.json({
//       message: "✅ Patient data fetched successfully",
//       patientDetails: {
//         patientID: patient.patientID,
//         name: patient.name,
//         age: patient.age,
//         gender: patient.gender,
//         bloodGroup: patient.bloodGroup,
//         address: patient.address,
//         phoneNumber: patient.phoneNumber,
//         emergencyContact: patient.emergencyContact,
//         allergies: patient.allergies,
//         medicalConditions: patient.medicalConditions,
//         // qrCodeUrl: patient.qrCodeUrl,
//         dateRegistered: patient.dateRegistered
//       },
//       records: patient.records || [] // Return empty array if no records exist
//     });
//   } catch (error) {
//     console.error("❌ Error fetching patient records:", error);
//     res.status(500).json({ message: "❌ Error fetching patient records", error: error.message });
//   }
// };



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

const JWT_SECRET = "b3f0efeb7984a8ed833bdb928ae20833421aac523dfc534e6b6422620ce9af5ec9f7568be57c8ae826c52ac09aad7d351f6f6ced43ed4c6a53ef041f5d332e5f"; // Ensure JWT_SECRET is set in environment variables

// 📌 Doctor Login
// exports.loginDoctor = async (req, res) => {
//   try {
//     console.log("Received login request:", req.body);

//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "❌ Email and password are required" });
//     }

//     const doctor = await Doctor.findOne({ email: email.trim().toLowerCase() });

//     if (!doctor) {
//       return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
//     }

//     const token = jwt.sign({ doctorID: doctor.doctorID, email: doctor.email, role: "doctor" }, JWT_SECRET, { expiresIn: "1h" });

//     res.json({
//       success: true,
//       message: "✅ Login successful",
//       doctorID: doctor.doctorID, // 🔹 Fix: Include doctorID in response
//       token
//     });

//   } catch (error) {
//     console.error("❌ Error during login:", error);
//     res.status(500).json({ success: false, message: "❌ Server error during login" });
//   }
// };

// exports.loginDoctor = async (req, res) => {
//   try {
//     console.log("Received login request:", req.body);

//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "❌ Email and password are required" });
//     }

//     const doctor = await Doctor.findOne({ email: email.trim().toLowerCase() });

//     if (!doctor) {
//       return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, doctor.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
//     }

//     const token = jwt.sign({ doctorID: doctor.doctorID, email: doctor.email, role: "doctor" }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     const response = {
//       success: true,
//       message: "✅ Login successful",
//       doctorID: doctor.doctorID, // 🔹 Ensure doctorID is present
//       token
//     };

//     console.log("Full Login Response:", response); // Debugging log

//     res.json(response);
//   } catch (error) {
//     console.error("❌ Error during login:", error);
//     res.status(500).json({ success: false, message: "❌ Server error during login" });
//   }
// };

exports.loginDoctor = async (req, res) => {
  try {
    console.log("Received login request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "❌ Email and password are required" });
    }

    const doctor = await Doctor.findOne({ email: email.trim().toLowerCase() });

    if (!doctor) {
      return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "❌ Invalid email or password" });
    }

    // 🔹 Updated JWT token to include doctor._id
    const token = jwt.sign(
      {
        doctorID: doctor.doctorID,  // ✅ Use the custom doctorID
        email: doctor.email,
        role: "doctor",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = {
      success: true,
      message: "✅ Login successful",
      doctorID: doctor.doctorID,
      token: token // 🔹 Include token in response
    };

    console.log("Full Login Response:", response); // Debugging log

    res.json(response);
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ success: false, message: "❌ Server error during login" });
  }
};



// 📌 Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "doctorID name email specialization"); // Optimize: Fetch only required fields
    res.json({ success: true, message: "✅ Doctors fetched successfully", doctors });
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "❌ Error fetching doctors" });
  }
};

// 📌 Get doctor’s appointments
// exports.getDoctorAppointments = async (req, res) => {
//   try {
//     let { doctorID } = req.params;

//     if (!doctorID) {
//       return res.status(400).json({ success: false, message: "❌ Missing doctorID in request" });
//     }

//     // Convert doctorID to a number
//     const doctorIDNum = parseInt(doctorID, 10);

//     if (isNaN(doctorIDNum)) {
//       return res.status(400).json({ success: false, message: "❌ doctorID must be a number" });
//     }

//     // Find appointments where doctorID is a number
//     const appointments = await Appointment.find({ doctorID: doctorIDNum })
//       .populate("patientID", "name age gender phoneNumber");

//     if (!appointments.length) {
//       return res.status(200).json({ success: true, message: "⚠️ No appointments found", appointments: [] });
//     }

//     res.json({ success: true, message: "✅ Appointments fetched successfully", appointments });
//   } catch (error) {
//     console.error("❌ Error fetching appointments:", error);
//     res.status(500).json({ success: false, message: "❌ Error fetching appointments", error: error.message });
//   }
// };



// 📌 Get doctor’s appointments


exports.getDoctorAppointments = async (req, res) => {
  try {
    let { doctorID } = req.params;
    console.log("📥 Received doctorID:", doctorID);

    // 🔹 Validate and Convert doctorID
    if (!doctorID || isNaN(doctorID)) {
      return res.status(400).json({ success: false, message: "❌ Invalid or missing doctorID" });
    }
    doctorID = parseInt(doctorID); // Convert doctorID to a number
    console.log("🔢 Converted doctorID to number:", doctorID);

    // 🔹 Debug: Log All Appointments in DB
    const allAppointments = await Appointment.find({});
    console.log("🔎 All Appointments in DB:", allAppointments);

    // 🔹 Fetch Appointments with Matching doctorID
    const appointments = await Appointment.find({ doctorID })
      .populate({
        path: "patientID",
        select: "name age gender phoneNumber",
      })
      .exec();

    console.log("📋 Fetched Appointments for Doctor:", appointments);

    // 🔹 Check if Appointments Exist
    if (!appointments.length) {
      return res.status(200).json({ success: true, message: "⚠️ No appointments found", appointments: [] });
    }

    // 🔹 Send Response
    res.status(200).json({ success: true, message: "✅ Appointments fetched successfully", appointments });

  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "❌ Error fetching appointments", error: error.message });
  }
};

// 📌 Get patient records
exports.getPatientRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ success: false, message: "❌ Missing patient ID" });
    }

    const patient = await Patient.findOne({ patientID: patientId });

    if (!patient) {
      return res.status(404).json({ success: false, message: "❌ Patient not found" });
    }

    res.json({
      success: true,
      message: "✅ Patient data fetched successfully",
      patientDetails: {
        patientID: patient.patientID,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        phoneNumber: patient.phoneNumber,
        emergencyContact: patient.emergencyContact,
        allergies: patient.allergies,
        medicalConditions: patient.medicalConditions,
        dateRegistered: patient.dateRegistered
      },
      records: patient.records || []
    });
  } catch (error) {
    console.error("❌ Error fetching patient records:", error);
    res.status(500).json({ success: false, message: "❌ Error fetching patient records", error: error.message });
  }
};
