import * as dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-deploy"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: 1800000,
  },
  networks: {
    sepolia: {
      url: "https://rpc-sepolia.rockx.com",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

export default config
