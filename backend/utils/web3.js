const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const contractABI = [ /* ABI of NFT Smart Contract */ ];
const contractAddress = "0xYourContractAddress";

const checkNFTOwnership = async (walletAddress) => {
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const balance = await contract.balanceOf(walletAddress);
  return balance > 0;
};

module.exports = { checkNFTOwnership };
