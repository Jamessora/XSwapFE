import React, { useState, useEffect } from 'react';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; 
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import PersistentDrawerLeft from '../../components/Sidebar.jsx';
//import AccountBalance from './AccountBalance.jsx';


const PortfolioItems = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const { makeRequest } = useAuthenticatedRequest();
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchUpdatedPortfolio = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/portfolio_items`, 'GET');
      console.log("Received data:", data);
      if (Array.isArray(data)) {  // <-- Check if the data is an array
        setPortfolioItems(data);
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching Portfolio:', error);
    }
  };

  useEffect(() => {
    // Fetch portfolio items from the backend
    fetchUpdatedPortfolio();
  }, []);

  return (
    <div>
      <h1>Your Portfolio</h1>
      <PersistentDrawerLeft/>
      <RecentOrdersTable />
      {/* <AccountBalance /> */}
      
      {/* <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
        {portfolioItems.map((item) => (
          <tr key={item.id}>
            <td>{item.token.name}</td>
            <td>{item.amount}</td>
            <td>{item.token.price} USDT</td>
            <td>{item.amount * item.token.price} USDT</td>
          </tr>
        ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default withKYCProtection(PortfolioItems);