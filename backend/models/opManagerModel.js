const mongoose = require("mongoose");

const opManagerSchema = new mongoose.Schema({
  hospitalID: { type: String, ref: "Hospital", required: true }, // Linked to Hospital
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Encrypted Password
});

const OPManager = mongoose.model("OPManager", opManagerSchema);
module.exports = OPManager;
