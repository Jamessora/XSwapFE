import React,{ useState, useEffect }  from 'react';
import {Link} from 'react-router-dom'
import { fetchKYCStatus } from '../services/kycService.jsx';
import PersistentDrawerLeft from '../components/Sidebar.jsx';
import AuthModal from './trader/AuthModal.jsx';
import { isAuthenticated } from '../services/authService.jsx';


const DashboardPage = () => {
  const [kycStatus, setKYCStatus] = useState(null);

  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'user') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AuthModal />
  }

  useEffect(() => {
    fetchKYCStatus()
      .then(status => setKYCStatus(status))
      .catch(error => console.error('Error fetching KYC status:', error));
  }, []);

  return (
    <div>
      <PersistentDrawerLeft />
      
      <h1>Welcome to the Dashboard</h1>
      <p>This is your dashboard page. You can add any content or features you need here.</p>
      <Link to="/kyc">Go to KYC Page</Link>
      {/* Add other dashboard components or content as needed */}
      <p>KYC Status: {kycStatus ? kycStatus : 'Please verify your account, KYC is required before trading...'}</p>
      {kycStatus == 'approved' && <Link to="/trade">Go to Trading Page</Link>}
    </div>
    
    
  );
};




export default DashboardPage;