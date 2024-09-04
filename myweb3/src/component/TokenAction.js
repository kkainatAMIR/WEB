import { ethers } from 'ethers';
import CustomTokenABI from "./CustomTokenABI.json";

// Ensure window.ethereum is available
if (!window.ethereum) {
  throw new Error("No Ethereum provider found. Please install MetaMask or another Ethereum wallet.");
}

// Use Web3Provider for interacting with the Ethereum blockchain
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const tokenAddress = "0x3f0c2a75116e65d7d2db9a29c735324b81f5cb53";
const customTokenContract = new ethers.Contract(tokenAddress, CustomTokenABI, signer);

export const mintTokens = async (to, amount) => {
  try {
    console.log("Minting tokens...");
    const tx = await customTokenContract.mint(to, ethers.utils.parseUnits(amount, 18));
    console.log("Transaction sent:", tx);
    await tx.wait();
    console.log("Tokens minted successfully");
    return "Tokens minted successfully";
  } catch (error) {
    console.error("Minting failed", error);
    throw new Error(`Minting failed: ${error.message}`);
  }
};

export const burnTokens = async (amount) => {
  try {
    console.log("Burning tokens...");
    const tx = await customTokenContract.burn(ethers.utils.parseUnits(amount, 18));
    console.log("Transaction sent:", tx);
    await tx.wait();
    console.log("Tokens burned successfully");
    return "Tokens burned successfully";
  } catch (error) {
    console.error("Burning failed", error);
    throw new Error(`Burning failed: ${error.message}`);
  }
};

export const setTax = async (account, tax) => {
  try {
    console.log("Setting tax...");
    const tx = await customTokenContract.setTax(account, tax);
    console.log("Transaction sent:", tx);
    await tx.wait();
    console.log("Tax set successfully");
    return "Tax set successfully";
  } catch (error) {
    console.error("Setting tax failed", error);
    throw new Error(`Setting tax failed: ${error.message}`);
  }
};
