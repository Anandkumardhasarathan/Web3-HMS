# Web3-Based Hospital Management System

## Overview
The **Web3-Based Hospital Management System** is designed to manage outpatient and admitted patient data for **Tamil Nadu government hospitals** using **NFT tokens** for registration and record access. The system ensures **secure, decentralized, and transparent** patient management.

## Features
### 🔹 **Patient Registration**
- Patients can log in using **phone number or NFT token**.
- OP Managers can register **new patients** who don’t have an NFT profile.
- The system generates a **permanent NFT token ID** for each patient.
- The NFT ID is **sent to the patient's registered phone number**.
- A **QR code** is generated for easy access to patient details.

### 🔹 **Outpatient Management (OP Manager Dashboard)**
- Scan **QR codes** to fetch patient details.
- Book **OP appointments** and schedule them with available doctors.
- Assign patients to the appropriate **departments** (e.g., Cardiology, General Medicine).
- Check **doctor availability in real-time**.
- Generate a **unique OP ID** for each visit and store it on the **blockchain**.

### 🔹 **Doctor Dashboard**
- **Notifications** for patient appointments.
- View **patient details and medical history**.
- Access **previous patient records** securely.

### 🔹 **Medical Records Storage**
- **MongoDB** is used for secure patient medical record storage.
- Patients can retrieve records using their **NFT token**.

### 🔹 **Blockchain Integration**
- Patient and OP visit records are **immutably stored** on the blockchain.
- Ensures **data security, decentralization, and tamper-proof records**.

## Tech Stack
- **Frontend**: React.js (In Progress)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Blockchain**: Ethereum (Smart Contracts with Truffle & Ganache)
- **Authentication**: NFT-based patient identification
- **Storage**: IPFS for medical records (Future Implementation)

## Usage
1. **Register/Login** using a **phone number or NFT token**.
2. **OP Managers** can add **new patients**, generate **NFT tokens**, and book **appointments**.
3. **Doctors** receive **notifications** and access **patient records**.
4. **All data is stored securely on the blockchain** for **integrity and security**.

## Contributors
- Anandha Kumar - Full-Stack & Blockchain Developer
- Kalai Priyan - Frontend Developer
- Karthi - Blockchain Developer

## License
This project is licensed under the **MIT License**.

