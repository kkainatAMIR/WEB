import Web3 from 'web3';

// Initialize Web3 with Alchemy provider
const alchemyId = 'https://eth-mainnet.g.alchemy.com/v2/p4ZuaGN0LfApkvLe4oye_U80avLehSde';
const web3 = new Web3(new Web3.providers.HttpProvider(alchemyId));

const tokenFactoryAddress = '0x9f08ce26b266f3cddebf6de35c77fa4ab19af815';
const tokenFactoryAbi = [
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "burnPercentage",
          "type": "uint256"
        },
        {
          "internalType": "enum CustomToken.TokenType",
          "name": "tokenType",
          "type": "uint8"
        }
      ],
      "name": "createToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "name": "TokenCreated",
      "type": "event"
    }
  ]
];

// Create a new contract instance
const tokenFactoryContract = new web3.eth.Contract(tokenFactoryAbi, tokenFactoryAddress);

export const createToken = async (tokenType, tokenName, tokenSymbol, totalSupply, cap, burnPercentage) => {
  try {
    // Ensure the provider is set
    if (!window.ethereum) {
      throw new Error('No Ethereum provider detected.');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const senderAddress = accounts[0];

    const tokenTypeEnum = {
      "fixedSupply": 0,
      "burnable": 1,
      "mintableBurnable": 2,
      "mintableBurnableCapped": 3,
      "deflationary": 4,
      "deflationaryTaxable": 5
    };
    
    const standardizedTokenType = tokenType.replace('-', '');
    
    if (!Object.keys(tokenTypeEnum).includes(standardizedTokenType)) {
      throw new Error(`Invalid token type: ${tokenType}`);
    }

    const tokenTypeValue = tokenTypeEnum[standardizedTokenType];
    const burnPercentageValue = parseInt(burnPercentage, 10);
    const capValue = parseInt(cap, 10);

    console.log('Creating token with parameters:', {
      tokenName,
      tokenSymbol,
      totalSupply,
      capValue,
      burnPercentageValue,
      tokenTypeValue
    });

    const tx = await tokenFactoryContract.methods.createToken(
      tokenName,
      tokenSymbol,
      totalSupply,
      capValue,
      burnPercentageValue,
      tokenTypeValue
    ).send({ from: senderAddress });

    console.log('Transaction hash:', tx.transactionHash);
    return tx.transactionHash;
  } catch (error) {
    console.error('Error creating token:', error.message);
    return null;
  }
};
