// require('dotenv').config(); // Load environment variables
// const { ethers } = require("ethers"); // Ensure correct import

// const provider = new ethers.JsonRpcProvider(process.env.LOCAL_RPC_URL);

// async function checkConnection() {
//     try {
//         const blockNumber = await provider.getBlockNumber();
//         console.log("Connected to blockchain. Latest block:", blockNumber);
//     } catch (error) {
//         console.error("Error connecting to blockchain:", error);
//     }
// }

// checkConnection();

const owner = await contract.owner();
console.log(`Contract Owner: ${owner}`);
