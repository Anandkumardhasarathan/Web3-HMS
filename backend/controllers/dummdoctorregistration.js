exports.registerDoctor = async (req, res) => {
  try {
    const { doctorID, name, specialization, contactNumber, email, address, password } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "❌ Doctor already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ 
      doctorID, 
      name, 
      specialization, 
      contactNumber, 
      email, 
      address, 
      password: hashedPassword 
    });
    await doctor.save();

    res.status(201).json({ success: true, message: "✅ Doctor registered successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering doctor" });
  }
};
