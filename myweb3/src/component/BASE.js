import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import TokenFactoryABI from './BASE.json';
import './CreateToken.css';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x866e08e6E9970a04F235F0eB39fC0b64D70B7e1a';
const contract = new web3.eth.Contract(TokenFactoryABI, contractAddress);

const blockchainPrices = {
  ethereum: '0.03',
  binance: '0.1',
  polygon: '0.02',
  avalanche: '0.05',
  arbitrum: '0.04',
  dogechain: '0.03'
};

const blockchainLinks = {
  ethereum: '/component/CreateToken',
  binance: '/component/BNB',
  polygon: '/component/Pol',
  avalanche: '/component/avalanche',
  arbitrum: '/component/Arbitrum',
  dogechain: '/component/BASE',
};

const CreateTokenForm = () => {
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    decimals: '',
    totalSupply: '',
    cap: '',
    burnPercentage: '',
    selectedTokenType: '',
    taxes: [],
    description: ''
  });
  const [blockchain, setBlockchain] = useState('ethereum');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdTokenAddress, setCreatedTokenAddress] = useState('');
  const [showAddTax, setShowAddTax] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleTokenTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData(prevData => ({ ...prevData, selectedTokenType: selectedType }));

    if (selectedType === 'mintable-burnable-capped') {
      setShowAddTax(false);
    } else if (selectedType === 'deflationary' || selectedType === 'deflationary-taxable') {
      setShowAddTax(true);
    } else {
      setShowAddTax(false);
    }
  };

  const handleAddTax = () => {
    setFormData(prevData => ({
      ...prevData,
      taxes: [...prevData.taxes, { name: '', percentage: '' }]
    }));
  };
  

  const handleRemoveTax = (index) => {
    const updatedTaxes = formData.taxes.filter((_, i) => i !== index);
    setFormData(prevData => ({ ...prevData, taxes: updatedTaxes }));
  };


  const handleTaxChange = (index, field, value) => {
    const updatedTaxes = [...formData.taxes];
    updatedTaxes[index][field] = value;
    setFormData(prevData => ({ ...prevData, taxes: updatedTaxes }));
  };

  const handleBlockchainChange = (e) => {
    const selectedBlockchain = e.target.value;
    setBlockchain(selectedBlockchain);
    navigate(blockchainLinks[selectedBlockchain]);
  };

  const createTokenHandler = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned. Please ensure MetaMask is connected.');
      }
      const balance = await web3.eth.getBalance(accounts[0]);
console.log('Account Balance:', web3.utils.fromWei(balance, 'ether'));

  
      const account = accounts[0];
      const price = blockchainPrices[blockchain];
      const paymentAmount = web3.utils.toWei(price, 'ether');
      const totalSupply = web3.utils.toWei(formData.totalSupply || '0', 'ether');
      const cap = formData.cap ? web3.utils.toWei(formData.cap, 'ether') : '0'; 
      const burnPercentage = formData.burnPercentage ? parseInt(formData.burnPercentage, 10) : 1;
  
      const tokenTypeMap = {
        fixed: 0,
        burnable: 1,
        mintable: 2,
        mintable_burnable: 3,
        mintable_burnable_capped: 4,
        deflationary: 5,
        deflationary_taxable: 6
      };
      const tokenType = tokenTypeMap[formData.selectedTokenType.replace(/ /g, '_')] || 0;
  
      const response = await contract.methods.createToken(
        formData.tokenName,
        formData.tokenSymbol,
        totalSupply,
        cap,
        burnPercentage,
        tokenType
      ).send({ 
        from: account, 
        value: paymentAmount,
        gas: 300000
      });
  
      if (response.events && response.events.TokenCreated) {
        const tokenAddress = response.events.TokenCreated.returnValues.tokenAddress;
        setCreatedTokenAddress(tokenAddress);
      } else {
        throw new Error('TokenCreated event not found.');
      }
    } catch (error) {
      setError(`Error creating token: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
return(  
    <div className="main-content">
      {/* Left Side: Token Options */}
      <div className="token-options">
        <h2>Token Types</h2>
        {['fixed', 'burnable', 'mintable', 'mintable-burnable', 'mintable-burnable-capped', 'deflationary', 'deflationary-taxable'].map(type => (
          <div key={type}>
            <input
              type="radio"
              id={type}
              name="selectedTokenType"
              value={type}
              checked={formData.selectedTokenType === type}
              onChange={handleTokenTypeChange}
            />
            <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</label>
            {/* Add descriptive text for each token type */}
            <p>
              {type === 'fixed' && 'A fixed supply token has a predetermined maximum supply that cannot be changed.'}
              {type === 'burnable' && 'A burnable token allows for the destruction of tokens to reduce the total supply.'}
              {type === 'mintable' && 'A mintable token allows for the creation of new tokens after the initial deployment.'}
              {type === 'mintable-burnable' && 'A mintable and burnable token combines features of minting and burning.'}
              {type === 'mintable-burnable-capped' && 'A mintable, burnable token with a maximum supply limit.'}
              {type === 'deflationary' && 'A deflationary token reduces its total supply over time, usually by burning a portion of each transaction.'}
              {type === 'deflationary-taxable' && 'A deflationary token that also taxes transactions.'}
            </p>
          </div>
        ))}
      </div>

      {/* Right Side: Token Creation Form */}
      <div className="token-form">
        <h2>Create Token</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            createTokenHandler();
          }}
        >
          <input
            type="text"
            name="tokenName"
            placeholder="Token Name"
            value={formData.tokenName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="tokenSymbol"
            placeholder="Token Symbol"
            value={formData.tokenSymbol}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="decimals"
            placeholder="Decimals"
            value={formData.decimals}
            onChange={handleInputChange}
            min="0"
            required
          />
          <input
            type="number"
            name="totalSupply"
            placeholder="Total Supply"
            value={formData.totalSupply}
            onChange={handleInputChange}
            min="0"
            required
          />
          {formData.selectedTokenType !== 'fixed' && (
            <input
              type="number"
              name="cap"
              placeholder="Cap (if applicable)"
              value={formData.cap}
              onChange={handleInputChange}
              min="0"
            />
          )}
          {formData.selectedTokenType === 'burnable' && (
            <input
              type="number"
              name="burnPercentage"
              placeholder="Burn Percentage"
              value={formData.burnPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
            />
          )}
          {showAddTax && (
            <div>
              <h3>Taxes</h3>
              {formData.taxes.map((tax, index) => (
                <div key={index} className="tax-form">
                  <input
                    type="text"
                    placeholder="Tax Name"
                    value={tax.name}
                    onChange={(e) => handleTaxChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Tax Percentage"
                    value={tax.percentage}
                    onChange={(e) => handleTaxChange(index, 'percentage', e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddTax}>Add Tax</button>
            </div>
          )}

{showAddTax && (
            <div>
              <h3>Taxes</h3>
              {formData.taxes.map((tax, index) => (
                <div key={index} className="tax-entry">
                  <input
                    type="text"
                    placeholder="Tax Name"
                    value={tax.name}
                    onChange={e => handleTaxChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Tax Percentage"
                    value={tax.percentage}
                    onChange={e => handleTaxChange(index, 'percentage', e.target.value)}
                    min="0"
                    max="100"
                  />
                  <button type="button" onClick={() => handleRemoveTax(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={handleAddTax}>Add Tax</button>
            </div>
          )}
          




          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <select name="blockchain" value={blockchain} onChange={handleBlockchainChange}>
            <option value="ethereum">ETHEREUM</option>
            <option value="BNB">BNB</option>
            <option value="polygon">POLYGON</option>
            <option value="avalanche">AVALANCHE</option>
            <option value="arbitrum">ARBITRUM</option>
            <option value="dogechain">BASE</option>
            <option value="dogechain">SOLANA</option>
            <option value="dogechain">Base</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Token'}
          </button>
        </form>
        {createdTokenAddress && (
          <div className="token-address">
            <p>Token Created Successfully!</p>
            <p>Token Address: {createdTokenAddress}</p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateTokenForm;


