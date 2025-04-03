const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

// Upload metadata to IPFS using Pinata
async function uploadToIPFS(metadata) {
    const formData = new FormData();
    formData.append("file", JSON.stringify(metadata), { filename: "metadata.json" });

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                "pinata_api_key": PINATA_API_KEY,
                "pinata_secret_api_key": PINATA_SECRET_KEY,
            },
        });
        return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
        console.error("IPFS Upload Error:", error);
        throw new Error("Failed to upload metadata to IPFS.");
    }
}

module.exports = { uploadToIPFS };
