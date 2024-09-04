// import React from "react";
// import './Refferal.css';
// const Refferal = () => {
//   return (
//     <div>
//       <div className="h1-main">
//         <h1>Earn with DappBuilder</h1>
//         <h3>
//           Share referral link to our main page or any other page and get 20%
//           from every paid contract creation - instant payouts to your wallet.
//         </h3>
//       </div>
//       <div className="reflink">
//         <div className="ref1">
//           <span className="span1">
//             <p>Variant 1 - link to main page</p>
//           </span>
//           <code>https://dappbuilder.net?ref=YOUR_WALLET_ADDRESS</code>
//           <button>
//             <svg
//               class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
//               focusable="false"
//               aria-hidden="true"
//               viewBox="0 0 24 24"
//               data-testid="ContentCopyIcon"
//                         >
//               <path
//                 d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 
//     2 2h11c1.1 0 2-.9 
//     2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
//               ></path>
//             </svg>
//             <span class="MuiTouchRipple-root css-w0pj6f"></span>
//           </button>
//         </div>
//         <div className="ref1">
//           <span className="span1">
//             <p>Variant 2 - link to token tool page</p>
//           </span>
//           <code>https://dappbuilder.net?ref=YOUR_WALLET_ADDRESS</code>
//           <button>
//             <svg
//               class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
//               focusable="false"
//               aria-hidden="true"
//               viewBox="0 0 24 24"
//               data-testid="ContentCopyIcon"
//                         >
//               <path
//                 d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 
//     2 2h11c1.1 0 2-.9 
//     2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
//               ></path>
//             </svg>
//             <span class="MuiTouchRipple-root css-w0pj6f"></span>
//           </button>
//         </div>
//         <div className="last">
//             <h2 className="main">
//             Main rules
//             </h2>
//             <p>
//             1. You can't refer to yourself - user's wallet must be different from referrer's wallet.  <br />
// 2. Commissions are paid instantly. You can find referral payments in internal transactions - they are paid during the contract creation as a part of creation function.  <br />

// 3. Latest referrer is saved to user's browser local storage (cookies) for unlimited time.
//             </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Refferal;





// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import './Refferal.css';
// import contractABI from './ReferralProgramABI.json.json';

// const contractAddress = "0xf1B89B20E4188E7d02002D2aC9c70d5b7705f6e2";

// const Referral = () => {
//   const [account, setAccount] = useState(null);
//   const [referrerBalance, setReferrerBalance] = useState(0);

//   useEffect(() => {
//     loadBlockchainData();
//   }, []);

//   // Connect to MetaMask and load account data
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const web3 = new Web3(window.ethereum);
//         const accounts = await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error("Error connecting to MetaMask:", error);
//       }
//     } else {
//       alert("Please install MetaMask to use this feature.");
//     }
//   };

//   // Load the blockchain data and interact with the contract
//   const loadBlockchainData = async () => {
//     if (typeof window.ethereum !== "undefined") {
//       const web3 = new Web3(window.ethereum);
//       const accounts = await web3.eth.getAccounts();
//       setAccount(accounts[0]);

//       const contract = new web3.eth.Contract(contractABI, contractAddress);

//       try {
//         const balance = await contract.methods.getReferrerBalance(accounts[0]).call();
//         setReferrerBalance(web3.utils.fromWei(balance, 'ether'));
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       }
//     }
//   };

//   return (
//     <div className="referral-container">
//       <div className="h1-main">
//         <h1>Earn with DappBuilder</h1>
//         <h3>Share referral links and earn rewards for each referral!</h3>
//       </div>

//       <div className="wallet-info">
//         {account ? (
//           <p>Connected Wallet: {account}</p>
//         ) : (
//           <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
//         )}
//       </div>

//       {account && (
//         <div className="referrer-balance">
//           <h3>Your Referrer Balance: {referrerBalance} ETH</h3>
//         </div>
//       )}

//       <div className="reflink-container">
//         <div className="ref-link">
//           <p>Variant 1 - link to main page</p>
//           <code>https://dappbuilder.net?ref={account}</code>
//           <button className="copy-button">
//             <svg viewBox="0 0 24 24">
//               <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
//             </svg>
//             Copy
//           </button>
//         </div>
//         <div className="ref-link">
//           <p>Variant 2 - link to specific page</p>
//           <code>https://dappbuilder.net?ref={account}</code>
//           <button className="copy-button">
//             <svg viewBox="0 0 24 24">
//               <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
//             </svg>
//             Copy
//           </button>
//         </div>
//       </div>

//       <div className="rules-container">
//         <h2>Main Rules</h2>
//         <p>1. You can't refer yourself - the user's wallet must be different from the referrer's wallet.<br />
//            2. Commissions are paid instantly during contract creation.<br />
//            3. Referrer information is stored in the user's local storage for unlimited time.</p>
//       </div>
//     </div>
//   );
// };

// export default Referral;















// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import contractABI from './ReferralProgramABI.json.json'; // Replace with your actual ABI file path

// const contractAddress = "0x0Cf433be26d5dd4D704B101756EAD75776cA1Fd4"; // Replace with your deployed contract address

// const ReferralSystem = () => {
//   const [account, setAccount] = useState(null);
//   const [rewardBalance, setRewardBalance] = useState(0);
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [referrer, setReferrer] = useState("");

//   useEffect(() => {
//     loadBlockchainData();
//   }, []);

//   const loadBlockchainData = async () => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       setWeb3(web3Instance);

//       const accounts = await web3Instance.eth.getAccounts();
//       setAccount(accounts[0]);

//       const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
//       setContract(contractInstance);

//       // Fetch referrer rewards balance using the getter function
//       try {
//         const reward = await contractInstance.methods.getRewardBalance(accounts[0]).call();
//         setRewardBalance(web3Instance.utils.fromWei(reward, "ether"));
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       }
//     } else {
//       alert("Please install MetaMask!");
//     }
//   };

//   const registerReferral = async () => {
//     if (contract) {
//       try {
//         await contract.methods.registerReferral(referrer).send({ from: account });
//         alert("Referral registered successfully!");
//       } catch (error) {
//         console.error("Error registering referral:", error);
//       }
//     }
//   };

//   const claimReward = async () => {
//     if (contract) {
//       try {
//         await contract.methods.claimReward().send({ from: account });
//         alert("Reward claimed successfully!");
//         // Update reward balance
//         const reward = await contract.methods.getRewardBalance(account).call();
//         setRewardBalance(web3.utils.fromWei(reward, "ether"));
//       } catch (error) {
//         console.error("Error claiming reward:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Referral System</h1>
//       {account ? (
//         <p>Connected Wallet: {account}</p>
//       ) : (
//         <button onClick={loadBlockchainData}>Connect Wallet</button>
//       )}

//       <div>
//         <h3>Your Reward Balance: {rewardBalance} ETH</h3>
//         <button onClick={claimReward}>Claim Reward</button>
//       </div>

//       <div>
//         <h3>Register a Referrer</h3>
//         <input
//           type="text"
//           placeholder="Referrer Address"
//           value={referrer}
//           onChange={(e) => setReferrer(e.target.value)}
//         />
//         <button onClick={registerReferral}>Register Referral</button>
//       </div>
//     </div>
//   );
// };

// export default ReferralSystem;















import React, { useEffect, useState } from "react";
import Web3 from "web3";
import './Refferal.css'; // Import your CSS for styling
import contractABI from './ReferralProgramABI.json'; // Update with the correct ABI file path

const contractAddress = "0x0Cf433be26d5dd4D704B101756EAD75776cA1Fd4"; // Replace with your deployed contract address

const Referral = () => {
  const [account, setAccount] = useState(null);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [referrer, setReferrer] = useState("");

  useEffect(() => {
    loadBlockchainData();
  }, []);

  // Connect to MetaMask and load account data
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);

        // Fetch referrer rewards balance
        const reward = await contractInstance.methods.rewards(accounts[0]).call(); // Use the correct method
        setRewardBalance(web3Instance.utils.fromWei(reward, "ether"));
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  // Load the blockchain data
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);

      const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);

      // Fetch referrer rewards balance
      try {
        const reward = await contractInstance.methods.rewards(accounts[0]).call(); // Ensure method name matches your contract
        setRewardBalance(web3Instance.utils.fromWei(reward, "ether"));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Register a referral
  const registerReferral = async () => {
    if (contract && account) {
      try {
        await contract.methods.registerReferral(referrer).send({ from: account });
        alert("Referral registered successfully!");
      } catch (error) {
        console.error("Error registering referral:", error);
      }
    }
  };

  // Claim reward
  const claimReward = async () => {
    if (contract && account) {
      try {
        await contract.methods.claimReward().send({ from: account });
        alert("Reward claimed successfully!");

        // Update reward balance
        const reward = await contract.methods.rewards(account).call(); // Ensure method name matches your contract
        setRewardBalance(web3.utils.fromWei(reward, "ether"));
      } catch (error) {
        console.error("Error claiming reward:", error);
      }
    }
  };

  return (
    <div className="referral-container">
      <div className="h1-main">
        <h1>Earn with DappBuilder</h1>
        <h3>Share referral links and earn rewards for each referral!</h3>
      </div>

      <div className="wallet-info">
        {account ? (
          <p>Connected Wallet: {account}</p>
        ) : (
          <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
        )}
      </div>

      {account && (
        <div className="referrer-balance">
          <h3>Your Reward Balance: {rewardBalance} </h3>
          <button onClick={claimReward} className="claim-button">Claim Reward</button>
        </div>
      )}

      <div className="reflink-container">
        <div className="ref-link">
          <p>Variant 1 - link to main page</p>
          <code>https://dappbuilder.net?ref={account}</code>
          <button className="copy-button">
            <svg viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>
            Copy
          </button>
        </div>
        <div className="ref-link">
          <p>Variant 2 - link to specific page</p>
          <code>https://dappbuilder.net?ref={account}</code>
          <button className="copy-button">
            <svg viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>
            Copy
          </button>
        </div>
      </div>

      <div className="rules-container">
        <h2>Main Rules</h2>
        <p>
          1. You can't refer yourself - the user's wallet must be different from the referrer's wallet.<br />
          2. Commissions are paid instantly during contract creation.<br />
          3. Referrer information is stored in the user's local storage for unlimited time.
        </p>
      </div>
    </div>
  );
};

export default Referral;
