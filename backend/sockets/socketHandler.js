// const socketIO = require("socket.io");

// let io;
// const setupSocket = (server) => {
//   io = socketIO(server, {
//     cors: { origin: "*" },
//   });

//   io.on("connection", (socket) => {
//     console.log("🔵 Doctor Connected:", socket.id);

//     socket.on("joinDoctorRoom", (doctorID) => {
//       socket.join(doctorID);
//       console.log(`Doctor ${doctorID} joined their room`);
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Doctor Disconnected");
//     });
//   });
// };

// // 📢 Notify Doctor in Real-Time
// const notifyDoctor = (doctorID, appointment) => {
//   if (io) {
//     io.to(doctorID).emit("newAppointment", appointment);
//   }
// };

// module.exports = { setupSocket, notifyDoctor };


const io = require("../server").io; // ✅ Ensure io instance is correctly imported

// ✅ Notify Doctor about new appointment
const notifyDoctor = (doctorID, appointment) => {
  io.to(doctorID).emit("newAppointment", {
    message: `📅 New Appointment for Doctor ${doctorID}`,
    appointment,
  });
};

module.exports = { notifyDoctor };
