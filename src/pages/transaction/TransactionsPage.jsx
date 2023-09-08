import React, { useState, useEffect } from 'react';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; 
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import BulkActions from './BulkActions.jsx';
//import PageHeader from './PageHeader.jsx';
import RecentOrders from './RecentOrders.jsx';
import PersistentDrawerLeft from '../../components/Sidebar.jsx';
import { Grid, Container } from '@mui/material';
import AuthModal from '../trader/AuthModal.jsx';
import { isAuthenticated } from '../../services/authService.jsx';

const TransactionPage = () => {

  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'user') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AuthModal />
  }

  const [transactions, setTransactions] = useState([]);
  const { makeRequest } = useAuthenticatedRequest();
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;



  const fetchUpdatedTransactions = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/transactions`, 'GET');
      console.log("Received data:", data);
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    // Fetch transactions from the backend

    fetchUpdatedTransactions();
  }, []);

  return (
    <div>
      <PersistentDrawerLeft />
      <h1>Your Transactions</h1>
      {/* <PageHeader /> */}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
 
      <Grid item xs={12}>
      
      <RecentOrders />
      </Grid>
      </Grid>
      </Container>

      </div>
  );
  



  
};

export default withKYCProtection(TransactionPage);
