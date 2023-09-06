import React, { useState, useEffect } from 'react';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; 
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import BulkActions from './BulkActions.jsx';
//import PageHeader from './PageHeader.jsx';
import RecentOrders from './RecentOrders.jsx';
import PersistentDrawerLeft from '../../components/Sidebar.jsx';
import { Grid, Container } from '@mui/material';

const TransactionPage = () => {
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
    // Update the URL based on your API endpoint
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
  // <div>
  // <h1>Your Transactions</h1>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Transaction ID</th>
  //           <th>Type</th>
  //           <th>Token</th>
  //           <th>Amount</th>
  //           <th>Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {transactions.map((tx) => (
  //           <tr key={tx.id}>
  //           <td>{tx.id}</td>
  //           <td>{tx.transaction_type}</td>
  //           <td>{tx.token.name}</td>
  //           <td>{tx.transaction_amount}</td>
  //           <td>{tx.transaction_price} USDT</td>
  //         </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>



  // return (
  //   <div>
  //     {/* <PageHeader />
  //     <BulkActions /> */}
  //     <RecentOrdersTable />
  //     {/* <RecentOrders /> */}
  //   </div>
  // );
};

export default withKYCProtection(TransactionPage);
