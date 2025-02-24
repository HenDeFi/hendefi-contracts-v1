const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy factories first
  console.log("Deploying Factories...");

  const OTokenFactory = await ethers.getContractFactory("OTOKENFactory");
  const oTokenFactory = await OTokenFactory.deploy();
  await oTokenFactory.deployed();
  console.log("OTokenFactory deployed to:", oTokenFactory.address);

  const VTOKENFactory = await ethers.getContractFactory("VTOKENFactory");
  const vtokenFactory = await VTOKENFactory.deploy();
  await vtokenFactory.deployed();
  console.log("VTOKENFactory deployed to:", vtokenFactory.address);

  const VTOKENRewarderFactory = await ethers.getContractFactory(
    "VTOKENRewarderFactory",
  );
  const vtokenRewarderFactory = await VTOKENRewarderFactory.deploy();
  await vtokenRewarderFactory.deployed();
  console.log(
    "VTOKENRewarderFactory deployed to:",
    vtokenRewarderFactory.address,
  );

  const TOKENFeesFactory = await ethers.getContractFactory("TOKENFeesFactory");
  const tokenFeesFactory = await TOKENFeesFactory.deploy();
  await tokenFeesFactory.deployed();
  console.log(
    "TOKENFeesFactory deployed to:",
    tokenFeesFactory.address,
  );

  // Deploy or use existing BASE token: scUSD 
  // For testing, we'll deploy a simple ERC20
  const BaseToken = await ethers.getContractFactory("ERC20");
  const baseToken = await BaseToken.deploy("Base Token", "BASE");
  await baseToken.deployed();
  console.log("Base Token deployed to:", await baseToken.address);

  // Deploy main TOKEN contract
  console.log("Deploying main TOKEN contract...");
  const initialSupply = ethers.utils.parseEther("100000"); // 100000 tokens

  const Token = await ethers.getContractFactory("TOKEN");
  const token = await Token.deploy(
    baseToken.address,
    initialSupply,
    oTokenFactory.address,
    vtokenFactory.address,
    vtokenRewarderFactory.address,
    tokenFeesFactory.address,
  );
  await token.deployed();
  console.log("TOKEN deployed to:", token.address);

  // Log all addresses for verification
  console.log("Deployed Addresses:");
  console.log("-------------------");
  console.log("Base Token:", baseToken.address);
  console.log("OTokenFactory:", oTokenFactory.address);
  console.log("VTOKENFactory:", vtokenFactory.address);
  console.log(
    "VTOKENRewarderFactory:",
    vtokenRewarderFactory.address,
  );
  console.log("TOKENFeesFactory:", tokenFeesFactory.address);
  console.log("Main TOKEN:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
