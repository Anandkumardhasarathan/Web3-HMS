// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Dashboard from "./components/pages/Dashboard";
// import BookAppointment from "./components/pages/BookAppointment";
// import PatientDetails from "./components/pages/PatientDetails";
// import Profile from "./components/pages/Profile";
// import ScanQR from "./components/pages/ScanQR";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import PatientRegistration from "./components/pages/patientRegistration";
// import OPManagerLogin from "./components/pages/OPManagerLogin";

// function AppLayout() {
//   const location = useLocation(); // Get the current route

//   // Hide Navbar & Sidebar only on the login page
//   const hideNavbarSidebar = location.pathname === "/";

//   return (
//     <div className="app-container flex">
//       {/* Show Navbar only if not on "/" */}
//       {!hideNavbarSidebar && <Navbar />}
//       {!hideNavbarSidebar && <Sidebar />}

//       <div className="flex-1">
//         <div className="p-6">
//           <Routes>
//             <Route path="/" element={<OPManagerLogin />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/book-appointment" element={<BookAppointment />} />
//             <Route path="/patient-details" element={<PatientDetails />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/scan-qr" element={<ScanQR />} />
//             <Route path="/patient-registration" element={<PatientRegistration />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Spp() {
//   return (
//     <Router>
//       <AppLayout />
//     </Router>
//   );
// }

// export default Spp;



import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import BookAppointment from "./components/pages/BookAppointment";
import PatientDetails from "./components/pages/PatientDetails";
import Profile from "./components/pages/Profile";
import ScanQR from "./components/pages/ScanQR";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PatientRegistration from "./components/pages/patientRegistration";
import OPManagerLogin from "./components/pages/OPManagerLogin";
import MainDashboard from "./components/pages/MainDashboard";
import DoctorDashboard from "./components/pages/DoctorDashboard";
import NurseDashboard from "./components/pages/NurseDashboard";
import DoctorLogin from "./components/pages/doctorLogin";
import PatientRecords from "./components/pages/PatientRecords";
import DoctorVisitPatientRecord from "./components/pages/doctorVisitsPatientRecord";

function AppLayout() {
  const location = useLocation();
  const hideNavbarSidebar = location.pathname === "/";

  return (
    <div className="app-container flex">
      <div className="flex-1">
        <div className="p-6">
          <Routes>
            <Route path="/opmanager-login" element={<OPManagerLogin />} />
            <Route path="/" element={<MainDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/patient-details" element={<PatientDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan-qr" element={<ScanQR />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/opmanager" element={<Dashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/nurse" element={<NurseDashboard />} />
            <Route path="/doctor-login" element={<DoctorLogin/>}/>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-records/:nftToken" element={<PatientRecords />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patient-details/:patientID" element={<DoctorVisitPatientRecord/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Spp() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default Spp;
