import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
// import { getPatientDetails } from "../../components/utils/api";

const ScanQR = () => {
  const [patient, setPatient] = useState(null);

  // const handleScan = async (data) => {
  //   if (data) {
  //     const response = await getPatientDetails(data.text);
  //     setPatient(response);
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <QrScanner />
      {patient && <p>Patient Name: {patient.name}</p>}
    </div>
  );
};

export default ScanQR;
