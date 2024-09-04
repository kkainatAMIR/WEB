import React, { useState } from 'react';
import './TokenSale.css'; // Ensure you have the correct path

const TokenPriceSettings = ({ priceOption, setPriceOption }) => {
    const handleOptionChange = (event) => {
        setPriceOption(event.target.value);
    };

    return (
        <div>
            <label>Token Price Option:</label>
            <div>
                <input
                    type="radio"
                    id="fixed-date"
                    name="price-option"
                    value="fixed-date"
                    checked={priceOption === 'fixed-date'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="fixed-date">Set Date</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="unlimited"
                    name="price-option"
                    value="unlimited"
                    checked={priceOption === 'unlimited'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="unlimited">Unlimited</label>
            </div>
        </div>
    );
};

function TokenSale() {
    const [formData, setFormData] = useState({
        tokenAddress: '',
        currency: 'USDC', // Default currency
        tokenPrice: '',
        startDate: '',
        endDate: '',
        softcap: '',
        hardcap: '',
        minContribution: '',
        maxContribution: '',
        claimTime: '',
        releasePercentage: '',
        vestingPeriod: '',
        emergencyWithdrawal: 'No',
        penaltyPercentage: '',
        minutesBeforeEnd: '',
        referralPercentage: '',
        logoURL: '',
        description: '',
        websiteURL: '',
        facebookURL: '',
        telegramURL: '',
        twitterURL: '',
        instagramURL: '',
        githubURL: '',
        youtubeURL: '',
        additionalLink1: '',
        additionalLink2: '',
        creationCost: '0 tBNB',
    });

    const [priceOption, setPriceOption] = useState('unlimited'); // Default price option

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCurrencyChange = (currency) => {
        setFormData({
            ...formData,
            currency,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to your backend or smart contract
        console.log(formData); // For debugging
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Token Sale</h2>
            
            {/* Token Information */}
            <h2 className='Mid-line'>Token Address</h2>
            <label>Token Address:</label>
            <input type="text" name="tokenAddress" value={formData.tokenAddress} onChange={handleChange} required />
            <p>Address of the token that you want to sell</p>
            <button type="button" onClick={() => {/* Function to choose from my tokens */}}>Choose from my tokens</button>
          
            {/* Currency Selector */}
            <h2 className='Mid-line'>Currency to Raise</h2>
            <div>
                <button type="button" onClick={() => handleCurrencyChange('tBNB')} className={formData.currency === 'tBNB' ? 'active' : ''}>Native currency (tBNB)</button>
                <button type="button" onClick={() => handleCurrencyChange('USDT')} className={formData.currency === 'USDT' ? 'active' : ''}>USDT</button>
                <button type="button" onClick={() => handleCurrencyChange('USDC')} className={formData.currency === 'USDC' ? 'active' : ''}>USDC</button>
                <button type="button" onClick={() => handleCurrencyChange('Another')} className={formData.currency === 'Another' ? 'active' : ''}>Another</button>
            </div>

            {/* Token Price Option */}
            <TokenPriceSettings priceOption={priceOption} setPriceOption={setPriceOption} />

            {/* Token Price */}
            <label>Token Price:</label>
            <input type="text" name="tokenPrice" value={formData.tokenPrice} onChange={handleChange} required />

            {/* Dates */}
            <label>Start Date:</label>
            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
            
            <label>End Date:</label>
            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />

            {/* Caps */}
            <label>Softcap:</label>
            <input type="number" name="softcap" value={formData.softcap} onChange={handleChange} />
            
            <label>Hardcap:</label>
            <input type="number" name="hardcap" value={formData.hardcap} onChange={handleChange} />

            {/* Contribution Limits */}
            <label>Min. Contribution:</label>
            <input type="number" name="minContribution" value={formData.minContribution} onChange={handleChange} />
            
            <label>Max. Contribution:</label>
            <input type="number" name="maxContribution" value={formData.maxContribution} onChange={handleChange} />

            {/* Tokens Distribution */}
            <label>Claim Time:</label>
            <input type="datetime-local" name="claimTime" value={formData.claimTime} onChange={handleChange} />
            
            <label>Release %:</label>
            <input type="number" name="releasePercentage" value={formData.releasePercentage} onChange={handleChange} />
            
            <label>Vesting Period (days):</label>
            <input type="number" name="vestingPeriod" value={formData.vestingPeriod} onChange={handleChange} />

            {/* Emergency Withdrawal */}
            <label>Emergency Withdrawal Allowed:</label>
            <select name="emergencyWithdrawal" value={formData.emergencyWithdrawal} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            
            <label>Penalty Percentage:</label>
            <input type="number" name="penaltyPercentage" value={formData.penaltyPercentage} onChange={handleChange} />

            <label>Minutes Before End for Withdrawal:</label>
            <input type="number" name="minutesBeforeEnd" value={formData.minutesBeforeEnd} onChange={handleChange} />

            {/* Referral Program */}
            <label>Referral Percentage:</label>
            <input type="number" name="referralPercentage" value={formData.referralPercentage} onChange={handleChange} />

            {/* Token Sale Information */}
            <label>Logo URL:</label>
            <input type="text" name="logoURL" value={formData.logoURL} onChange={handleChange} />
            
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            
            <label>Website URL:</label>
            <input type="text" name="websiteURL" value={formData.websiteURL} onChange={handleChange} />
            
            <label>Facebook URL:</label>
            <input type="text" name="facebookURL" value={formData.facebookURL} onChange={handleChange} />
            
            <label>Telegram URL:</label>
            <input type="text" name="telegramURL" value={formData.telegramURL} onChange={handleChange} />
            
            <label>Twitter/X URL:</label>
            <input type="text" name="twitterURL" value={formData.twitterURL} onChange={handleChange} />
            
            <label>Instagram URL:</label>
            <input type="text" name="instagramURL" value={formData.instagramURL} onChange={handleChange} />
            
            <label>Github URL:</label>
            <input type="text" name="githubURL" value={formData.githubURL} onChange={handleChange} />
            
            <label>YouTube URL:</label>
            <input type="text" name="youtubeURL" value={formData.youtubeURL} onChange={handleChange} />
            
            <label>Additional Link 1:</label>
            <input type="text" name="additionalLink1" value={formData.additionalLink1} onChange={handleChange} />
            
            <label>Additional Link 2:</label>
            <input type="text" name="additionalLink2" value={formData.additionalLink2} onChange={handleChange} />

            {/* Contract Creation Options */}
            <label>Creation Cost:</label>
            <input type="text" name="creationCost" value={formData.creationCost} disabled />

            <button type="submit">Create Token Sale</button>
        </form>
    );
}

export default TokenSale;
