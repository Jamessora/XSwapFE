import React, { useState, useEffect } from 'react';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; 
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import PersistentDrawerLeft from '../../components/Sidebar.jsx';

import { isAuthenticated } from '../../services/authService.jsx';
import AuthModal from '../trader/AuthModal.jsx';

const PortfolioItems = () => {

  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'user') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AuthModal />
  }
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
  
    </div>
  );
};

export default withKYCProtection(PortfolioItems);
