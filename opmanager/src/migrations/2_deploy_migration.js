// const PatientRegistry = artifacts.require("PatientRegistration");
// module.exports = function(deployer) {
//   deployer.deploy(PatientRegistry);
// };


const PatientNFT = artifacts.require("PatientNFT");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(PatientNFT, accounts[0]); // Ensure accounts[0] is the owner
    const contract = await PatientNFT.deployed();
    console.log("Contract deployed by:", await contract.owner());
};
