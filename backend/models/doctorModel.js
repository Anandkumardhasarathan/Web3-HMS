const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorID: {
    type: Number,
    required: [true, 'Doctor ID is required'], // ✅ Required field
    // unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;