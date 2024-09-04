// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import TokenLockABI from './TokenLockABI.json';
// import './TokenLock.css';

// const contractAddresses = {
//   ethereum: '0x6b0b157aab8ceb7a005f969eca135405406aa651',
//   bsc: '0xC29FFF77dA679ac936b1E3194E8b61f182436c8a',
//   polygon: '0xYourPolygonContractAddress',
//   avalanche: '0xYourAvalancheContractAddress',
//   fantom: '0xYourFantomContractAddress',
//   arbitrum: '0xYourArbitrumContractAddress',
//   optimism: '0xYourOptimismContractAddress',
//   gnosis: '0xYourGnosisContractAddress',
// };

// const TokenLock = () => {
//   const [unlockOption, setUnlockOption] = useState('once');
//   const [firstUnlockPercent, setFirstUnlockPercent] = useState('');
//   const [blockchain, setBlockchain] = useState('ethereum');
//   const [tokenAddress, setTokenAddress] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [description, setDescription] = useState('');
//   const [web3, setWeb3] = useState(null);
//   const [tokenLockContract, setTokenLockContract] = useState(null);

//   const handleUnlockChange = (event) => {
//     setUnlockOption(event.target.value);
//   };

//   const handleFirstUnlockChange = (event) => {
//     setFirstUnlockPercent(event.target.value);
//   };

//   const handleBlockchainChange = (event) => {
//     setBlockchain(event.target.value);
//   };
//   const handleSubmit = async () => {
//     if (!tokenLockContract || !web3) {
//       console.error('Web3 or contract not initialized');
//       return;
//     }
  
//     try {
//       const accounts = await web3.eth.getAccounts();
//       console.log('Accounts:', accounts);
  
//       const lockType = unlockOption === 'once' ? 0 : 1;
//       console.log('Sending transaction with params:', {
//         amount: web3.utils.toWei(quantity, 'ether'),
//         duration: 3600 * 24 * 30,
//         lockType,
//         blockchain
//       });
  
//       const tx = await tokenLockContract.methods.lockTokens(
//         web3.utils.toWei(quantity, 'ether'),
//         3600 * 24 * 30,
//         lockType,
//         blockchain
//       ).send({
//         from: accounts[0],
//         value: web3.utils.toWei('0.01', 'ether'),
//         gas: 500000 // Example gas limit
//       });
  
//       console.log('Transaction successful:', tx);
//       alert('Tokens locked successfully!');
//     } catch (error) {
//       console.error('Error during transaction:', error);
//       alert('Failed to lock tokens.');
//     }
//   };
  
  
//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);

//         // Get contract address based on selected blockchain
//         const currentContractAddress = contractAddresses[blockchain] || contractAddresses['ethereum'];
//         const contractInstance = new web3Instance.eth.Contract(TokenLockABI, currentContractAddress);

//         setWeb3(web3Instance);
//         setTokenLockContract(contractInstance);

//         // Request account access
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//       } else {
//         console.error('Please install MetaMask!');
//       }
//     };

//     initWeb3();
//   }, [blockchain]);

//   return (
//     <div className="token-lock-container">
//       <div className="block-chain">
//         <h1>Create a Token Lock</h1>
//         <label>Select Blockchain</label>
//         <select name="blockchain" id="blockchain-select" onChange={handleBlockchainChange} value={blockchain}>
//           <option value="ethereum">Ethereum</option>
//           <option value="bsc">Binance Smart Chain</option>
//           <option value="polygon">Polygon</option>
//           <option value="avalanche">Avalanche</option>
//           <option value="fantom">Fantom</option>
//           <option value="arbitrum">Arbitrum</option>
//           <option value="optimism">Optimism</option>
//           <option value="gnosis">Gnosis</option>
//         </select>
//       </div>

//       <section className="main">
//         <div className="input-group">
//           <h2>Token to Lock</h2>
//           <input
//             type="text"
//             placeholder="Token Address"
//             value={tokenAddress}
//             onChange={(e) => setTokenAddress(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <h2>Quantity to Lock</h2>
//           <input
//             type="number"
//             placeholder="Enter token quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//           <p>How many tokens you want to lock.</p>
//         </div>

//         <div className="input-group">
//           <h2>Unlock Terms</h2>
//           <label>
//             <input
//               type="radio"
//               value="once"
//               checked={unlockOption === 'once'}
//               onChange={handleUnlockChange}
//             />
//             Unlock Everything at Once
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="linear"
//               checked={unlockOption === 'linear'}
//               onChange={handleUnlockChange}
//             />
//             Use Linear Vesting
//           </label>

//           {unlockOption === 'once' && (
//             <div className="input-group">
//               <h3>Unlock Date</h3>
//               <input type="datetime-local" />
//               <p>Unlock time (e.g., 08/26/2024 09:39 PM)</p>
//             </div>
//           )}

//           {unlockOption === 'linear' && (
//             <>
//               <div className="input-group">
//                 <h3>Vesting Details</h3>
//                 <label>Start Date</label>
//                 <input type="datetime-local" />
//                 <label>End Date</label>
//                 <input type="datetime-local" />
//                 <p>Tokens will be unlocked gradually from the start date to the end date.</p>
//               </div>

//               <div className="input-group">
//                 <h3>Unlock at TGE / First Unlock (%)</h3>
//                 <input
//                   type="number"
//                   placeholder="Enter % of tokens to unlock at TGE"
//                   value={firstUnlockPercent}
//                   onChange={handleFirstUnlockChange}
//                 />
//                 <p>How many % of tokens will be unlocked at the first unlock / TGE.</p>
//               </div>

//               <div className="input-group">
//                 <h4>From now: 0 mins</h4>
//                 <p>This indicates how much time is left until the first unlock.</p>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="input-group">
//           <h2>Short Description / Name</h2>
//           <input
//             type="text"
//             placeholder="Description or name"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <p>You can add some description or name for this token lock (e.g., 'Team tokens').</p>
//         </div>

//         <div className="cost-section">
//           <h3>Cost: 0 tBNB</h3>
//         </div>

//         <div className="my-token-locks">
//           <h3>My Token Lock Contracts</h3>
//           <p>No token locks found</p>
//         </div>

//         <button onClick={handleSubmit}>Create Token Lock</button>
//       </section>
//     </div>
//   );
// };

// export default TokenLock;


























import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TokenLockABI from './TokenLockABI.json';
import './TokenLock.css';

const contractAddresses = {
  ethereum: '0x6b0b157aab8ceb7a005f969eca135405406aa651',
  bsc: '0xC29FFF77dA679ac936b1E3194E8b61f182436c8a',
  polygon: '0xYourPolygonContractAddress',
  avalanche: '0xYourAvalancheContractAddress',
  fantom: '0xYourFantomContractAddress',
  arbitrum: '0xYourArbitrumContractAddress',
  optimism: '0xYourOptimismContractAddress',
  gnosis: '0xYourGnosisContractAddress',
};

const TokenLock = () => {
  const [unlockOption, setUnlockOption] = useState('once');
  const [firstUnlockPercent, setFirstUnlockPercent] = useState('');
  const [blockchain, setBlockchain] = useState('ethereum');
  const [tokenAddress, setTokenAddress] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [web3, setWeb3] = useState(null);
  const [tokenLockContract, setTokenLockContract] = useState(null);

  const handleUnlockChange = (event) => {
    setUnlockOption(event.target.value);
  };

  const handleFirstUnlockChange = (event) => {
    setFirstUnlockPercent(event.target.value);
  };

  const handleBlockchainChange = (event) => {
    setBlockchain(event.target.value);
  };

  const handleSubmit = async () => {
    if (!tokenLockContract || !web3) {
      console.error('Web3 or contract not initialized');
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Accounts:', accounts);

      const lockType = unlockOption === 'once' ? 0 : 1;
      console.log('Sending transaction with params:', {
        amount: web3.utils.toWei(quantity, 'ether'),
        duration: 3600 * 24 * 30,
        lockType,
        blockchain,
      });

      const tx = await tokenLockContract.methods.lockTokens(
        web3.utils.toWei(quantity, 'ether'),
        3600 * 24 * 30,
        lockType,
        blockchain
      ).send({
        from: accounts[0],
        value: web3.utils.toWei('0.01', 'ether'),
        gas: 500000, // Example gas limit
      });

      console.log('Transaction successful:', tx);
      alert('Tokens locked successfully!');
    } catch (error) {
      console.error('Error during transaction:', error);
      alert('Failed to lock tokens.');
    }
  };

  const calculateRemainingTime = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else {
      return 'Unlock time reached';
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);

        // Get contract address based on selected blockchain
        const currentContractAddress = contractAddresses[blockchain] || contractAddresses['ethereum'];
        const contractInstance = new web3Instance.eth.Contract(TokenLockABI, currentContractAddress);

        setWeb3(web3Instance);
        setTokenLockContract(contractInstance);

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        console.error('Please install MetaMask!');
      }
    };

    initWeb3();
  }, [blockchain]);

  useEffect(() => {
    if (unlockDate) {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime(unlockDate));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [unlockDate]);

  return (
    <div className="token-lock-container">
      <div className="block-chain">
        <h1>Create a Token Lock</h1>
        <label>Select Blockchain</label>
        <select name="blockchain" id="blockchain-select" onChange={handleBlockchainChange} value={blockchain}>
          <option value="ethereum">Ethereum</option>
          <option value="bsc">Binance Smart Chain</option>
          <option value="polygon">Polygon</option>
          <option value="avalanche">Avalanche</option>
          <option value="fantom">Fantom</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
          <option value="gnosis">Gnosis</option>
        </select>
      </div>

      <section className="main">
        <div className="input-group">
          <h2>Token to Lock</h2>
          <input
            type="text"
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>

        <div className="input-group">
          <h2>Quantity to Lock</h2>
          <input
            type="number"
            placeholder="Enter token quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <p>How many tokens you want to lock.</p>
        </div>

        <div className="input-group">
          <h2>Unlock Terms</h2>
          <label>
            <input
              type="radio"
              value="once"
              checked={unlockOption === 'once'}
              onChange={handleUnlockChange}
            />
            Unlock Everything at Once
          </label>
          <label>
            <input
              type="radio"
              value="linear"
              checked={unlockOption === 'linear'}
              onChange={handleUnlockChange}
            />
            Use Linear Vesting
          </label>

          {unlockOption === 'once' && (
            <div className="input-group">
              <h3>Unlock Date</h3>
              <input
                type="datetime-local"
                onChange={(e) => setUnlockDate(e.target.value)}
              />
              <p>Unlock time (e.g., 08/26/2024 09:39 PM)</p>
            </div>
          )}

          {unlockOption === 'linear' && (
            <>
              <div className="input-group">
                <h3>Vesting Details</h3>
                <label>Start Date</label>
                <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date</label>
                <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} />
                <p>Tokens will be unlocked gradually from the start date to the end date.</p>
              </div>

              <div className="input-group">
                <h3>Unlock at TGE / First Unlock (%)</h3>
                <input
                  type="number"
                  placeholder="Enter % of tokens to unlock at TGE"
                  value={firstUnlockPercent}
                  onChange={handleFirstUnlockChange}
                />
                <p>How many % of tokens will be unlocked at the first unlock / TGE.</p>
              </div>
            </>
          )}
        </div>

        <div className="input-group">
          <h2>Short Description / Name</h2>
          <input
            type="text"
            placeholder="Description or name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="remaining-time">
          {remainingTime && <p>Time remaining until unlock: {remainingTime}</p>}
        </div>

        <button onClick={handleSubmit}>Create Token Lock</button>
      </section>
    </div>
  );
};

export default TokenLock;
