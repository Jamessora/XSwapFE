//To approve or reject KYC applications
import { fetchPendingKYC, approveKYC, rejectKYC } from '../../services/kycAdminService.jsx';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import { isAuthenticated } from '../../services/adminAuthService.jsx';
import AdminAuthModal from '../admin/AdminAuthModal.jsx';
const theme = createTheme();
const TableContainerStyled = styled(TableContainer)({
  marginTop: '20px',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '10px',
});

const ButtonReject = styled(Button)(({ theme }) => ({
  backgroundColor: 'red',
  color: 'white',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: theme.palette.error.main,
  },
}));

const ButtonApprove = styled(Button)(({ theme }) => ({
  backgroundColor: 'blue',
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.info.main,
  },
}));
const AdminKYC = () => {
  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'admin') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AdminAuthModal />
  }
  console.log("User authenticated, showing dashboard...");
  
  const [pendingKYC, setPendingKYC] = useState([]);

  useEffect(() => {
    fetchPendingKYC()
      .then(data => {
        setPendingKYC(data);
        console.log(pendingKYC);
      })
      
      .catch(error => {
        console.error('An error occurred:', error.message);
        // Handle the error, e.g., update the state to show an error message
      });
  }, []);

  const handleApprove = (userId) => {
    approveKYC(userId).then(() => {
      // Reload the pending KYC data or update the state
      fetchPendingKYC().then(data => setPendingKYC(data));
    });
  };

  const handleReject = (userId) => {
    rejectKYC(userId).then(() => {
      // Reload the pending KYC data or update the state
      fetchPendingKYC().then(data => setPendingKYC(data));
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <div>
      <h1>Pending KYC Requests</h1>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>ID Type</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingKYC.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.birthday}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.idType}</TableCell>
                <TableCell>{user.idNumber}</TableCell>
                <TableCell>
                  <ButtonContainer>
                  <ButtonApprove onClick={() => handleApprove(user.id)}>Approve</ButtonApprove>
                  <ButtonReject onClick={() => handleReject(user.id)}>Reject</ButtonReject>
                  </ButtonContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </div>
    </ThemeProvider>
  );
  
};

export default AdminKYC;
