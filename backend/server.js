const express = require("express");
const http = require("http"); // ✅ Required for WebSockets
const socketIo = require("socket.io"); // ✅ WebSockets
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDB");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const opManagerRoutes = require("./routes/opManagerRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ✅ Create HTTP Server
const io = socketIo(server, { cors: { origin: "*" } }); // ✅ Initialize WebSocket

// ✅ Export WebSocket instance for other files
module.exports.io = io;

// ✅ Handle WebSocket Connections
io.on("connection", (socket) => {
  console.log(`✅ Doctor Connected: ${socket.id}`);

  // ✅ Handle Doctor Joining a Room (Using Doctor ID)
  socket.on("joinDoctorRoom", (doctorID) => {
    socket.join(doctorID);
    console.log(`📢 Doctor ${doctorID} joined room`);
  });

  // ✅ Handle Disconnection
  socket.on("disconnect", () => {
    console.log(`❌ Doctor Disconnected: ${socket.id}`);
  });
});

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/patient-fetch", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/op-managers", opManagerRoutes);
app.use("/api/doctors", doctorRoutes);

// ✅ Default Route (Catch all other requests)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


