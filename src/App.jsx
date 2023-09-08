import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import KYCPage from './pages/auth/KYCPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TradingPage from './pages/trader/TradingPage.jsx';
import PortfolioItems from './pages/Portfolio/PortfolioPage.jsx';
import TransactionPage from './pages/transaction/TransactionsPage.jsx';
import AdminKYC from './pages/auth/adminKYCPage.jsx';
import AdminCreateTraderPage from './pages/admin/AdminCreateTraderPage.jsx'
import AdminEditTraderPage from  './pages/admin/AdminEditTraderPage.jsx'
import AdminAllTradersPage from  './pages/admin/AdminAllTradersPage.jsx'
import AdminAllTransactionsPage from  './pages/admin/AdminAllTransactionsPage'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminSignupPage from './pages/admin/AdminSignupPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
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
        <Route path="/trade" element={<TradingPage/>} />
        <Route path="/portfolio" element={<PortfolioItems/>} />
        <Route path="/transactions" element={<TransactionPage/>} />

        {/* Admin Views */}
        
        <Route path="/admin/login" element ={<AdminLoginPage/>} />
        <Route path="/admin/signup" element ={<AdminSignupPage/>} />
        <Route path="/admin/dashboard" element ={<AdminDashboardPage/>} />
        <Route path="/admin/kyc-approvals" element={<AdminKYC/>} />
        <Route path="/admin/create-trader" element={<AdminCreateTraderPage/>} />
        <Route path="/admin/edit-trader/:id" element={<AdminEditTraderPage/>} />
        <Route path="/admin/all-traders" element={<AdminAllTradersPage/>} />
        <Route path="/admin/all-transactions" element={<AdminAllTransactionsPage/>} />

        {/* Confirmation Email */}
        <Route path="/confirmation-success" element={<ConfirmationSuccess />} />
        

        
      </Routes>
    </Router>
 
  );
}
export default App


//usecontext to access the current user for all routes to be applied