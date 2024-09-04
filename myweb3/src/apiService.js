// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this to your server's URL if different

export const getTotalSupply = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/totalSupply`);
    return response.data.totalSupply;
  } catch (error) {
    console.error('Error fetching total supply:', error);
    throw error;
  }
};

export const getBalance = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/balance/${address}`);
    return response.data.balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const getTokenType = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tokenType`);
    return response.data.tokenType;
  } catch (error) {
    console.error('Error fetching token type:', error);
    throw error;
  }
};

export const mintTokens = async (to, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/mint`, { to, amount });
    return response.data.txHash;
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }
};

// Similarly, add other functions for burn, setBurnPercentage, setTax, transfer, and transferFrom
