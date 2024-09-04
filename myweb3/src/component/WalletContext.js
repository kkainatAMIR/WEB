// import React, { createContext, useState, useContext, useEffect } from 'react';
// import Web3Modal from 'web3modal';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
// import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       infuraId: "YOUR_INFURA_ID",
//     },
//   },
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: 'DAPPBUILDER',
//       infuraId: "YOUR_INFURA_ID",
//       chainId: 1,
//       darkMode: true,
//     },
//   },
//   injected: {
//     display: {
//       name: "MetaMask",
//       description: "Connect with the MetaMask browser extension",
//     },
//     package: null,
//   },
// };

// const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//   const [web3Instance, setWeb3Instance] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const web3Modal = new Web3Modal({
//     cacheProvider: true,
//     providerOptions,
//   });

//   const connectWallet = async () => {
//     try {
//       const web3ModalInstance = await web3Modal.connect();
//       const provider = new EthersWeb3Provider(web3ModalInstance);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();

//       setWeb3Instance(provider);
//       setUserAddress(address);
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage("Failed to connect wallet. Please try again.");
//     }
//   };

//   const disconnectWallet = async () => {
//     web3Modal.clearCachedProvider();
//     setWeb3Instance(null);
//     setUserAddress("");
//   };

//   useEffect(() => {
//     if (web3Modal.cachedProvider) {
//       connectWallet();
//     }
//   }, []);

//   return (
//     <WalletContext.Provider value={{ web3Instance, userAddress, connectWallet, disconnectWallet, errorMessage }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => useContext(WalletContext);




import React, { createContext, useState, useContext, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "https://mainnet.infura.io/v3/caa6f5d05b3f449eafd183e6d5943f1c",
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'DAPPBUILDER',
      infuraId: "https://mainnet.infura.io/v3/caa6f5d05b3f449eafd183e6d5943f1c",
      chainId: 1,
      darkMode: true,
    },
  },
  injected: {
    display: {
      name: "MetaMask",
      description: "Connect with the MetaMask browser extension",
    },
    package: null,
  },
  options:{
       infuraId : 'https://mainnet.infura.io/v3/caa6f5d05b3f449eafd183e6d5943f1c'
  }
};

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentChainId, setCurrentChainId] = useState(null);

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  const connectWallet = async () => {
    try {
      const web3ModalInstance = await web3Modal.connect();
      const provider = new EthersWeb3Provider(web3ModalInstance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const chainId = (await provider.getNetwork()).chainId;

      setWeb3Instance(provider);
      setUserAddress(address);
      setCurrentChainId(chainId);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = async () => {
    web3Modal.clearCachedProvider();
    setWeb3Instance(null);
    setUserAddress("");
    setCurrentChainId(null);
  };

  const switchChain = async (chainId) => {
    try {
      const provider = web3Instance;
      const networkParams = {
        chainId: `0x${chainId.toString(16)}`, // Convert chain ID to hexadecimal
      };

      if (provider && provider.provider) {
        await provider.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [networkParams],
        });
        setCurrentChainId(chainId);
      }
    } catch (error) {
      console.error("Failed to switch chain", error);
      setErrorMessage("Failed to switch chain. Please try again.");
    }
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <WalletContext.Provider value={{ web3Instance, userAddress, connectWallet, disconnectWallet, switchChain, currentChainId, errorMessage }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
