import React,{ useState, useEffect }  from 'react';
import {Link} from 'react-router-dom'
import PersistentDrawerLeft from '../../components/Admin Sidebar';
import { isAuthenticated } from '../../services/adminAuthService';
import AdminAuthModal from './AdminAuthModal';



const AdminDashboardPage = () => {

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
      
      <h1>Welcome to the Dashboard</h1>
      <p>This is your dashboard page. You can add any content or features you need here.</p>
      
      
      
    </div>
    
    
  );
};




export default AdminDashboardPage;