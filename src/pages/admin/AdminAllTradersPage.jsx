import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersistentDrawerLeft from '../../components/Admin Sidebar';
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest';
import { isAuthenticated } from '../../services/adminAuthService';
import AdminAuthModal from './AdminAuthModal';
import { apiBaseURL } from '../../services/adminAuthService';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell,  } from '@mui/material';

const AdminAllTradersPage = () => {
  const [traders, setTraders] = useState([]);
  const {makeRequest} = useAuthenticatedRequest();

 

  const fetchTraders = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/admin/allTraders`, 'GET');
      console.log(data);
      setTraders(data);
     
    } catch (error) {
      console.error('Error fetching traders:', error);
    }
  };
  
  useEffect ( () => {
    fetchTraders();
  }, []);
  
  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'admin') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AdminAuthModal />
  }
  console.log("User authenticated, showing dashboard...");

  return (
    <div>
      <PersistentDrawerLeft />
      <h1>All Traders</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>KYC Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traders.map((trader, index) => (
              <TableRow key={index}>
                <TableCell>{trader.id}</TableCell>
                <TableCell><Link to={`/admin/edit-trader/${trader.id}`}>{trader.email}</Link></TableCell>
                <TableCell>{trader.kyc_status}</TableCell>
                <TableCell>{trader.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  
};

export default AdminAllTradersPage;
