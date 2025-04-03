const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const { notifyDoctor } = require("../sockets/socketHandler"); // ✅ Import WebSocket Notifier

// ✅ Book an Appointment
const bookAppointment = async (req, res) => {
  try {
    const { patientID, doctorID, department, appointmentDate } = req.body;

    // 🔍 Check if patient exists
    const patientExists = await Patient.findOne({ patientNFT: patientID });
    if (!patientExists) {
      return res.status(404).json({ message: "❌ Patient not found!" });
    }

    // ✅ Save appointment to DB
    const newAppointment = new Appointment({
      patientID,
      doctorID,
      department,
      appointmentDate
    });
    await newAppointment.save();

    // 🔔 Notify Doctor about the new appointment
    notifyDoctor(doctorID, newAppointment);

    res.status(201).json({ message: "✅ Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { bookAppointment };
