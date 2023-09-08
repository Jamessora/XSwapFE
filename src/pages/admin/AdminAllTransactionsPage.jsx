import React, { useState, useEffect } from 'react';
import PersistentDrawerLeft from '../../components/Admin Sidebar';
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest';
import { isAuthenticated } from '../../services/adminAuthService';
import AdminAuthModal from './AdminAuthModal';

const AdminAllTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'admin') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AdminAuthModal />
  }
  console.log("User authenticated, showing transactions...");

  useEffect(() => {
    fetch(`${apiBaseURL}/admin/allTransactions`)
      .then(response => response.json())
      .then(data => setTransactions(data.transactions));
  }, []);

  return (
    <div>
      <PersistentDrawerLeft />
      <h1>All Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Transaction Type</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Price</th>
            <th>USD Value</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(transactions) ? transactions.map((t, index) => (
              <tr key={index}>
              <td>{t.user}</td>
              <td>{t.transaction_type}</td>
              <td>{new Date(t.transaction_date).toLocaleDateString()}</td>
              <td>{t.transaction_amount}</td>
              <td>{t.transaction_price}</td>
              <td>{t.usd_value}</td>
            </tr>
           )) : (
            <tr>
              <td colSpan="6">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllTransactionsPage;
