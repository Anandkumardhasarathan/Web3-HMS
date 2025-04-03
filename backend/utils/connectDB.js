const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Web3_Hospital_DB",
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};



// const patientSchema = new mongoose.Schema({
//   patientID: { type: String, unique: true, required: true }, // Unique Patient ID
//   hospitalID: { type: String, ref: "Hospital", required: true }, // Linked to Hospital
//   patientNFT: { type: String, unique: true, required: true }, // NFT-based Unique Identity
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true }, // Gender Field
//   bloodGroup: { type: String, required: false }, // Blood Group
//   address: { type: String, required: true },
//   phoneNumber: { type: String, required: true, unique: true },
//   emergencyContact: { type: String, required: false }, // Emergency Contact Number
//   medicalConditions: { type: String, required: false }, // Chronic illnesses (diabetes, asthma, etc.)
//   allergies: { type: String, required: false }, // Allergic Reactions
//   qrCodeUrl: { type: String, required: false }, // QR Code URL for easy scanning
//   dateRegistered: { type: Date, default: Date.now }
// });

// const Patient = mongoose.model("Patient", patientSchema);

// module.exports = Patient;


module.exports = connectDB;
