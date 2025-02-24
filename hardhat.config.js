const { config } = require("dotenv");

require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require("solidity-coverage");

/*===================================================================*/
/*===========================  SETTINGS  ============================*/

const CHAIN_ID = 2061; // bera testnet

/*===========================  END SETTINGS  ========================*/
/*===================================================================*/

config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
// const SCAN_API_KEY = process.env.SCAN_API_KEY || "";
// const RPC_URL = process.env.RPC_URL || "";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
         // yul: true
        }
      },
    },
  },
  networks: {
    hardhat: {},
    // mainnet: {
    //   url: RPC_URL,
    //   chainId: CHAIN_ID,
    //   //gasPrice: 1000000000,
    //   accounts: [PRIVATE_KEY],
    // },
    Sonic_mainnet:{
      url: "https://rpc.soniclabs.com/",
      accounts: [PRIVATE_KEY],
    },
    Sonic_testnet:{
      url: "https://rpc.blaze.soniclabs.com",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: "ED2NED96C214Y891MR98PZZ1Q45VTFYZRV",
      base: "1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1",
      baseSepolia: "1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1", 
      holesky: "ED2NED96C214Y891MR98PZZ1Q45VTFYZRV",
      bscTestnet: "1UME8V5UP4AZHYDF7RWC78GTIXXRPJHTQY",
      sonic: "RT48MY249ECGSEXYRHFHKC2TRMSJEV3W74",
      sonicTestnet: "RT48MY249ECGSEXYRHFHKC2TRMSJEV3W74"
    },
    customChains: [
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org"
        }
      }
    ],
  },
  
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 300000,
  },
};
