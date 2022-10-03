const hre = require("hardhat");

async function main() {
  const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
  const musiciansManager = await MusiciansManager.deploy();

  await musiciansManager.deployed();

  console.log(
    `MusiciansManager deployed to ${musiciansManager.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
