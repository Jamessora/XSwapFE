import React from 'react';

import { fetchKYCStatus } from '../../services/kycService.jsx'; 
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService.jsx';
import AuthModal from '../trader/AuthModal.jsx'; 

export const withKYCProtection = (WrappedComponent) => {

 

  return class extends React.Component {
    state = {
      kycStatus: null,
      loading: true,
    };

    componentDidMount() {
      fetchKYCStatus().then((status) => {
        this.setState({ kycStatus: status, loading: false });
      });
    }

    render() {
      console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
      console.log("Checking authentication status...");
      
      if(!isAuthenticated() || localStorage.getItem('role') !== 'user') {
        console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
        return <AuthModal />
      }
      const { kycStatus, loading } = this.state;

      if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching KYC status
      }
      if (kycStatus !== 'approved') {
        
        return <div><Link to={`/dashboard`}> 
         Sumit KYC First, Go back.
        </Link>

        </div>
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
