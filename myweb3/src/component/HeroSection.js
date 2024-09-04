import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom for navigation

const HeroSection = () => {
  return (
    <section className='hero-section'>
      <div className='hero-content'>
        <h1>The No-Code Smart Contract Toolkit</h1>
        <p>Reliable and Well-Tested: Assisting with smart contract creation since 2019.</p>
        <a href="#get-started" className='cta-button'>Let's Build a Smart Contract</a>
      </div>

      <div className='features'>
        <div className='feature-list'>
          <div className='feature'>
            <Link to="/CreateToken.js">  <h3>CREATE TOKEN</h3></Link>
            <p>Design and mint your custom tokens in minutes.</p>
          </div>
          <div className='feature'>
          <Link to="/TokenSale.js">     <h3>TOKEN SALE</h3>  </Link>
            <p>Design and mint your custom tokens in minutes.</p>
          </div>
          <div className='feature'>
          <Link to="/TokenLock.js">  <h3>TOKEN LOCK</h3></Link>
            <p>Securely lock your tokens to build trust.</p>
          </div>
          {/* <div className='feature'>
            <h3>Create Tokens</h3>
            <p>Design and mint your custom tokens in minutes.</p>
          </div> */}
        </div>
      </div>
{/* 
      <section className='long-sec'>
        <div className="long">
          <h2>TOKEN LANDING PAGE BUILDER</h2>
          <p>TOKEN LANDING PAGE BUILDER ALLOWS YOU TO SELECT FROM EXISTING SMART CONTRACTS - LIKE TOKEN SALES, LOCKS, AND STAKING-PREVIOUSLY CREATED ON DAPPBUILDER TO BUILD A COMPREHENSIVE LANDING PAGE FOR YOUR TOKEN.</p>
        </div>
      </section> */}

      <section className='supported-platforms'>
        <div className='supported-content'>
          <h2>Available On</h2>
          <div className='platforms'>
            <div className='platform'>
              <img src='./images/daap.png' alt='Ethereum' />
              <p>Ethereum</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Binance Smart Chain' />
              <p>Binance Smart Chain</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Base' />
              <p>Base</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Avalanche' />
              <p>Avalanche</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Polygon' />
              <p>Polygon</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Polygon zkEVM' />
              <p>Polygon zkEVM</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Arbitrum One' />
              <p>Arbitrum One</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Dogechain' />
              <p>Dogechain</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Linea Mainnet' />
              <p>Linea Mainnet</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Binance Smart Chain Testnet' />
              <p>Binance Smart Chain Testnet</p>
            </div>
            <div className='platform'>
              <img src='./images/daap.png' alt='Sepolia' />
              <p>Sepolia</p>
            </div>
          </div>
        </div>
      </section> 

      <div>
        <h2 className='mainline'>Earn with DappBuilder</h2>
      </div>  
      <div className='referral-program'>
        <Link to="/Refferal.js">    <h2>Earn with Our Referral Program</h2></Link>
        <p>Share your referral link and earn rewards for every successful referral. It’s that simple!</p>
      </div>
    </section>
  );
}

export default HeroSection;
