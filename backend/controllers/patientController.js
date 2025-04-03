const Patient = require("../models/patientModel");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const twilio = require("twilio");
const axios = require("axios");
const { ethers } = require("ethers");
require("dotenv").config();

// ✅ Load Smart Contract
const contractArtifact = require("../../blockchain/artifacts/contracts/PatientNFT.sol/PatientNFT.json");

// ✅ Ethers.js Provider & Wallet
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ Update if redeployed
const contract = new ethers.Contract(contractAddress, contractArtifact.abi, wallet);

console.log("✅ Blockchain connection established!");

// ✅ Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

// ✅ Pinata API Configuration
const PINATA_JWT = process.env.PINATA_JWT;

// ✅ Register Patient Controller
const registerPatient = async (req, res) => {
  try {
    const {
      hospitalID,
      name,
      age,
      gender,
      bloodGroup,
      address,
      phoneNumber,
      emergencyContact,
      medicalConditions,
      allergies,
    } = req.body;

    console.log("📌 Received Patient Registration Request:", req.body);

    // ✅ Check if Patient Already Exists
    const existingPatient = await Patient.findOne({ phoneNumber });
    if (existingPatient) {
      console.warn("⚠️ Patient already registered:", existingPatient.patientNFT);
      return res.status(400).json({ message: "Patient already registered!" });
    }

    // ✅ Upload Metadata to IPFS via Pinata
    console.log("🔄 Uploading metadata to IPFS...");
    const pinataResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        name: `Patient ${name}`,
        description: `Patient NFT for ${name}, age ${age}. Medical records securely stored.`,
        attributes: [
          { trait_type: "Hospital ID", value: hospitalID },
          { trait_type: "Age", value: age },
          { trait_type: "Gender", value: gender },
          { trait_type: "Blood Group", value: bloodGroup },
          { trait_type: "Emergency Contact", value: emergencyContact },
        ],
        image: "https://example.com/patient-nft-placeholder.png",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );

    if (!pinataResponse.data || !pinataResponse.data.IpfsHash) {
      throw new Error("❌ Failed to upload metadata to IPFS");
    }

    const metadataURI = `ipfs://${pinataResponse.data.IpfsHash}`;
    console.log("✅ Metadata uploaded to IPFS:", metadataURI);

    // ✅ Mint NFT using Smart Contract
    console.log("🔄 Minting NFT on blockchain...");
    const tx = await contract.mintNFT(wallet.address, metadataURI);
    const receipt = await tx.wait();

    // ✅ Extract tokenId from the transaction event logs
    const event = receipt.events?.find(e => e.event === "NFTMinted");

    if (!event) {
      console.error("❌ No NFTMinted event found in logs.");
      throw new Error("NFT Minting Failed - No tokenId found.");
    }

    const patientNFT = event.args.tokenId.toString(); // ✅ Extract tokenId
    console.log("✅ NFT Minted Successfully! Token ID:", patientNFT);

    // ✅ Generate QR Code
    const qrCodeData = `NFT_ID:${patientNFT}`;
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
    console.log("✅ QR Code Generated Successfully");

    // ✅ Save Patient in Database
    const newPatient = new Patient({
      patientID: uuidv4(),
      hospitalID,
      patientNFT,
      name,
      age,
      gender,
      bloodGroup,
      address,
      phoneNumber,
      emergencyContact,
      medicalConditions,
      allergies,
      qrCodeUrl,
    });

    await newPatient.save();
    console.log("✅ Patient Saved Successfully");

    // ✅ Send NFT Token via Twilio SMS
    try {
      console.log("📤 Sending SMS to:", phoneNumber);
      await client.messages.create({
        body: `Welcome to TN Government Hospital! Your NFT Patient ID: ${patientNFT}. Use this QR code for future visits.`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      console.log("✅ SMS Sent Successfully!");
    } catch (twilioError) {
      console.error("❌ Twilio SMS Error:", twilioError);
    }

    return res.status(201).json({
      message: "Patient registered successfully!",
      patientNFT,
      qrCodeUrl,
    });
  } catch (error) {
    console.error("❌ Error Registering Patient:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerPatient };
