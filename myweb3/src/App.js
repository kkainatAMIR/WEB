



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './component/HeroSection'; 
import CreateToken from './component/CreateToken.js'; 
import Navbar from './component/Navbar'; 
import TokenLock from './component/TokenLock';
import TokenSale from './component/TokenSale';
import { WalletProvider } from './component/WalletContext'; 
import Refferal from './component/Refferal';
import BNB from './component/BNB'; // Ensure this is correct
import Pol from './component/Pol'; // Ensure this is correct
// import Avalanche from './component/Avalanche'; // Ensure this is correct
import Arbitrum from './component/Arbitrium'; // Ensure this is correct
// import Dogechain from './component/Dogechain'; // Ensure this is correct

function App() {
  return (
    <WalletProvider> 
                    <Router> 
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route  path="/TokenLock.js" element={<TokenLock />} />
          <Route path="/TokenSale.js" element={<TokenSale />} />
          <Route path="/Refferal.js" element={<Refferal />} />
          <Route path="/component/BNB" element={<BNB />} />
         <Route path='/component/Pol' element={<Pol />}/>
          <Route path="/Arbitrium" element={<Arbitrum />} />
          <Route path="/CreateToken.js" element={<CreateToken />} />
        </Routes>
      </Router> 
    </WalletProvider>
  );
}

export default App;







// import React, { useState, useEffect } from 'react';

// function App() {
//   const [backendData, setBackendData] = useState({ users: [] });

//   useEffect(() => {
//     fetch("/api")
//       .then(response => response.json())
//       .then(data => {
//         setBackendData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {backendData.users.length === 0 ? (
//         <p>LOADING....</p>
//       ) : (
//         backendData.users.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))
//       )}
//     </div>
//   );
// }

// export default App;









