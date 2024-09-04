// src/contract.js
import {ethers} from 'ethers';
import CustomTokenABI from './CustomTokenABI.json'; 

const contractAddress = '0x2e0504c51538dc2d0029efa7560cf9104e42cb20'; 


let provider;
let contract;

if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  contract = new ethers.Contract(contractAddress, CustomTokenABI, provider.getSigner());
}

export const getContract = () => contract;
export const getProvider = () => provider;
