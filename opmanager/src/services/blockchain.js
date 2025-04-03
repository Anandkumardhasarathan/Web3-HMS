import Web3 from "web3";
import contractABI from "./contractABI.json";

const web3 = new Web3("http://localhost:8545");
const contractAddress = "0xYourContractAddress";
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const mintNFT = async (metadataURI, account) => {
  return await contract.methods.mintNFT(account, metadataURI).send({ from: account });
};
