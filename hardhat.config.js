require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ignition');
require('dotenv').config(); // Note: Ensure this is correctly 'dotenv' not 'dotnev'

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
