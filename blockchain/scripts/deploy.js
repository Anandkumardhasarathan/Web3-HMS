const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying with account: ${deployer.address}`);

    // ✅ Deploy contract correctly
    const PatientNFT = await hre.ethers.getContractFactory("PatientNFT");
    const patientNFT = await PatientNFT.deploy(); // ❌ Removed extra parameters

    await patientNFT.waitForDeployment(); // ✅ Ensures deployment is complete
    console.log(`✅ PatientNFT deployed to: ${await patientNFT.getAddress()}`);
}

main().catch((error) => {
    console.error("❌ Deployment Error:", error);
    process.exit(1);
});
