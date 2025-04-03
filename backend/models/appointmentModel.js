const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  doctorID: { type: Number, required: true },
  department: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
