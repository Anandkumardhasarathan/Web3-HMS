const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  // patientID: { type: String, unique: true, required: true },
  patientID: { type: String, required: true, unique: true }, 
  hospitalID: { type: String, ref: "Hospital", required: true }, 
  patientNFT: { type: String, unique: true, required: true }, 
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true }, 
  bloodGroup: { type: String, required: false }, 
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  emergencyContact: { type: String, required: false },
  medicalConditions: { type: [String], required: false }, // ✅ Change to Array of Strings
  allergies: { type: [String], required: false }, // ✅ Change to Array of Strings
  qrCodeUrl: { type: String, required: false }, 
  dateRegistered: { type: Date, default: Date.now }
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
