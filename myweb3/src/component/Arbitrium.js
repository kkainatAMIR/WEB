import React, { useState } from 'react';
import Web3 from 'web3';
import TokenFactoryABI from './ArbitriumABI.json';
import './CreateToken.css';

const web3 = new Web3(window.ethereum);
const contractAddress = '0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005';
const contract = new web3.eth.Contract(TokenFactoryABI, contractAddress);

const blockchainPrices = {
  ethereum: '0.03', 
  binance: '0.1',   
  polygon: '0.02', 
  avalanche: '0.05', 
  arbitrum: '0.04', 
  dogechain: '0.03' 
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
  const [blockchain, setBlockchain] = useState('BNB');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdTokenAddress, setCreatedTokenAddress] = useState('');
  const [showAddTax, setShowAddTax] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleTokenTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData(prevData => ({ ...prevData, selectedTokenType: selectedType }));

    // Manage visibility of fields based on selected token type
    if (selectedType === 'mintable-burnable-capped') {
      setShowAddTax(false); // Hide add tax button
    } else if (selectedType === 'deflationary' || selectedType === 'deflationary-taxable') {
      setShowAddTax(true); // Show add tax button for deflationary types
    } else {
      setShowAddTax(false); // Hide add tax button for other types
    }
  };

  const handleAddTax = () => {
    setFormData(prevData => ({
      ...prevData,
      taxes: [...prevData.taxes, { name: '', percentage: '' }]
    }));
  };

  const handleTaxChange = (index, field, value) => {
    const updatedTaxes = [...formData.taxes];
    updatedTaxes[index][field] = value;
    setFormData(prevData => ({ ...prevData, taxes: updatedTaxes }));
  };

  const createTokenHandler = async () => {
    setLoading(true);
    setError(null);
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
  
      if (accounts.length === 0) {
        setError('No accounts found. Please connect your wallet.');
        setLoading(false);
        return;
      }
  
      const price = blockchainPrices[blockchain];
      const paymentAmount = web3.utils.toWei(price, 'ether'); // Convert price to wei
  
      // Ensure all values are properly converted
      const totalSupply = web3.utils.toWei(formData.totalSupply, 'ether');
      const cap = formData.cap ? web3.utils.toWei(formData.cap, 'ether') : '0'; // Default to 0 if not provided
      const burnPercentage = formData.burnPercentage ? parseInt(formData.burnPercentage, 10) : 0; // Ensure it's an integer
  
      const tokenTypeMap = {
        fixed: 0,
        burnable: 1,
        mintable: 2,
        mintable_burnable: 3,
        mintable_burnable_capped: 4,
        deflationary: 5,
        deflationary_taxable: 6
      };
      const tokenType = tokenTypeMap[formData.selectedTokenType.replace(/ /g, '_')] || 0; // Default to 0 if not mapped
  
      try {
        const response = await contract.methods.createToken(
          formData.tokenName,
          formData.tokenSymbol,
          totalSupply,
          cap,
          burnPercentage,
          tokenType
        ).send({ 
          from: accounts[0], 
          value: paymentAmount,
          gas: 3000000 // Example gas limit
        });
  
        console.log('Token created successfully:', response);
  
        if (response.events && response.events.TokenCreated) {
          const tokenAddress = response.events.TokenCreated.returnValues.tokenAddress;
          setCreatedTokenAddress(tokenAddress);
        } else {
          console.error('TokenCreated event not found.');
        }
      } catch (error) {
        setError(`Error creating token: ${error.message}`);
        console.error('Error creating token:', error);
      }
    } catch (error) {
      setError(`Error requesting accounts: ${error.message}`);
      console.error('Error requesting accounts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
          </div>
        ))}
      </div>

      {/* Right Side: Token Creation Form */}
      <div className="token-form">
        <h2>Create Your Token</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          createTokenHandler();
        }}>
          <input
            type="text"
            name="tokenName"
            placeholder="Token Name*"
            value={formData.tokenName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="tokenSymbol"
            placeholder="Token Symbol*"
            value={formData.tokenSymbol}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="decimals"
            placeholder="Decimals*"
            value={formData.decimals}
            onChange={handleInputChange}
            min="0"
            required
          />
          <input
            type="number"
            name="totalSupply"
            placeholder="Total Supply*"
            value={formData.totalSupply}
            onChange={handleInputChange}
            min="0"
            required
          />
          {formData.selectedTokenType === 'mintable-burnable-capped' && (
            <input
              type="number"
              name="cap"
              placeholder="Cap*"
              value={formData.cap}
              onChange={handleInputChange}
              min="0"
              required
            />
          )}
          {formData.selectedTokenType === 'deflationary' && (
            <input
              type="number"
              name="burnPercentage"
              placeholder="Burn Percentage*"
              value={formData.burnPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
            />
          )}
          {formData.selectedTokenType === 'deflationary-taxable' && (
            <div>
              <input
                type="number"
                name="burnPercentage"
                placeholder="Burn Percentage*"
                value={formData.burnPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
              {formData.taxes.map((tax, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder={`Tax ${index + 1} Name*`}
                    value={tax.name}
                    onChange={(e) => handleTaxChange(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder={`Tax ${index + 1} Percentage*`}
                    value={tax.percentage}
                    onChange={(e) => handleTaxChange(index, 'percentage', e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </div>
              ))}
              {showAddTax && (
                <button type="button" onClick={handleAddTax}>
                  Add Tax
                </button>
              )}
            </div>
          )}
          {/* <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleInputChange}
          /> */}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Token'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {createdTokenAddress && (
          <div>
            <h3>Token Created Successfully!</h3>
            <p>Token Address: {createdTokenAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTokenForm;













