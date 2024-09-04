// import React from 'react';
// import { useWallet } from './WalletContext';
// import './Navbar.css';

// const Navbar = () => {
//   const { web3Instance, userAddress, connectWallet, disconnectWallet, errorMessage } = useWallet();

//   const truncateAddress = (address) => {
//     if (!address) return '';
//     return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//   };

//   return (
//     <nav className="main-nav">
//       <div className="logo">
//         <h2>DAPPBUILDER</h2>
//       </div>

//       <div className="menu-link">
//         <ul>
//           <li><a href="#token">TOKEN</a></li>
//           <li><a href="#token-sale">TOKEN SALE</a></li>
//           <li><a href="#lock-token">TOKEN LOCK</a></li>
//           {/* <li><a href="#page-builder">PAGE BUILDER</a></li> */}
//           <li><a href="##">REFERRAL</a></li>
//         </ul>
//       </div>

//       <div className="social-media">
//         <ul className="social desktop">
//           <li>
//             {!web3Instance ? (
//               <button className="connectwallet" onClick={connectWallet}>
//                 Connect Wallet
//               </button>
//             ) : (
//               <>
//                 <span>{truncateAddress(userAddress)}</span>
//                 <button className="disconnectwallet" onClick={disconnectWallet}>
//                   Disconnect Wallet
//                 </button>
//               </>
//             )}
//           </li>
//         </ul>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { useWallet } from './WalletContext';
import './Navbar.css';

const Navbar = () => {
  const { web3Instance, userAddress, connectWallet, disconnectWallet, switchChain, currentChainId, errorMessage } = useWallet();
  const [selectedChain, setSelectedChain] = useState(currentChainId || 1); // Default to Ethereum Mainnet

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleChainChange = (event) => {
    const newChainId = parseInt(event.target.value, 10);
    setSelectedChain(newChainId);
    switchChain(newChainId);
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <h2>DAPPBUILDER</h2>
      </div>

      <div className="menu-link">
        <ul>
          <li><a href="#token">TOKEN</a></li>
          <li><a href="#token-sale">TOKEN SALE</a></li>
          <li><a href="#lock-token">TOKEN LOCK</a></li>
          <li><a href="##">REFERRAL</a></li>
        </ul>
      </div>

      <div className="social-media">
        <ul className="social desktop">
          <li>
            {!web3Instance ? (
              <button className="connectwallet" onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              <>
                <span>{truncateAddress(userAddress)}</span>
                <button className="disconnectwallet" onClick={disconnectWallet}>
                  Disconnect Wallet
                </button>
              </>
            )}
          </li>
        </ul>
        
        {/* Chain Switch Dropdown */}
        {web3Instance && (
          <select value={selectedChain} onChange={handleChainChange} className="chain-switcher">
            <option value={1}>Ethereum</option>
            <option value={56}>Binance Smart Chain</option>
            <option value={97}>Binance smart chain testnet</option>
            <option value={137}>Polygon</option>
            <option value={80002}>Amoy Polygon testnet</option>
            <option value={43114}>Avalanche</option>
            <option value={42161}>Arbitrum</option>
            <option value={11155111}>Switch to Sepolia</option>
            {/* Add more chains as needed */}
          </select>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </nav>
  );
};

export default Navbar;
