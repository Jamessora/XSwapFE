import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import KYCPage from './pages/auth/KYCPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminKYC from './pages/auth/adminKYCPage.jsx';
import TradingPage from './pages/trader/TradingPage.jsx';
import PortfolioItems from './pages/Portfolio/PortfolioPage.jsx';
import TransactionPage from './pages/transaction/TransactionsPage.jsx';
import AdminCreateTraderPage from './pages/admin/AdminCreateTraderPage.jsx'
import AdminEditTraderPage from  './pages/admin/AdminEditTraderPage.jsx'
import AdminAllTradersPage from  './pages/admin/AdminAllTradersPage.jsx'
import AdminAllTransactionsPage from  './pages/admin/AdminAllTransactionsPage'
import LandingPage from './LandingPage.jsx';

import ConfirmationSuccess from './pages/auth/ConfirmationSuccess.jsx';

import './App.css'




function App() {
  return (
    
    <Router>
      <Routes>
      
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logout" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/kyc" element={<KYCPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="admin/kyc" element={<AdminKYC/>} />
        <Route path="/trade" element={<TradingPage/>} />
        <Route path="/portfolio" element={<PortfolioItems/>} />
        <Route path="/transactions" element={<TransactionPage/>} />

        {/* Admin Views */}
        <Route path="/AdminCreateTrader" element={<AdminCreateTraderPage/>} />
        <Route path="/admin/editTrader/:id" element={<AdminEditTraderPage/>} />
        <Route path="/AdminAllTraders" element={<AdminAllTradersPage/>} />
        <Route path="/AdminAllTransactions" element={<AdminAllTransactionsPage/>} />

        {/* Confirmation Email */}
        <Route path="/confirmation-success" element={<ConfirmationSuccess />} />
        

        
      </Routes>
    </Router>
 
  );
}
export default App


//usecontext to access the current user for all routes to be applied