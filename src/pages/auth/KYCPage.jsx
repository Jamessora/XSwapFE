import React, { useState } from 'react';
import { submitKYC } from '../../services/kycService';
import PersistentDrawerLeft from '../../components/Sidebar';
import { TextField, Button, Grid, Typography, Link, Avatar, CssBaseline, Container, Box } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const KYCPage = () => {
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs (You can add more validation logic here)
    if (!fullName || !birthday || !address || !idType || !idNumber) {
      setError('All fields are required');
      return;
    }
    
      // Clear any existing error
      setError('');

      const kycData = { fullName, birthday, address, idType, idNumber };
      console.log('Submitting KYC data:', kycData); // Add this line
      // TODO: Send the KYC data to your server for processing
      // You'll need to define a function to make the API call
  
      // For now, just alert the user that the form was submitted
      alert('KYC form submitted!');
      try {
        const response = await submitKYC(kycData);
        alert(response.message); 
      } catch (err) {
        setError('An error occurred while submitting the KYC data. Please try again.'); // Handle error
        console.error(err); 
      }
  };

  return (
    
    <ThemeProvider theme={theme}>
      <PersistentDrawerLeft/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            KYC Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              required
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="birthday"
              label="Birthday"
              name="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              id="idType"
              label="ID Type"
              name="idType"
              select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="">Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="drivers_license">Driver's License</option>
              {/* Add other ID types as needed */}
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              required
              id="idNumber"
              label="ID Number"
              name="idNumber"
              autoComplete="id"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
    // <div>
    //   <PersistentDrawerLeft />
    // <form onSubmit={handleSubmit}>
    //   <h1> KYC Form</h1>
    //   <label>
    //     Full Name:
    //     <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
    //   </label>
    //   <label>
    //     Birthday:
    //     <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
    //   </label>
    //   <label>
    //     Address:
    //     <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
    //   </label>
    //   <label>
    //     ID Type:
    //     <select value={idType} onChange={e => setIdType(e.target.value)}>
    //       <option value="">Select ID Type</option>
    //       <option value="passport">Passport</option>
    //       <option value="drivers_license">Driver's License</option>
    //       {/* Add other ID types as needed */}
    //     </select>
    //   </label>
    //   <label>
    //     ID Number:
    //     <input type="text" value={idNumber} onChange={e => setIdNumber(e.target.value)} />
    //   </label>
    //   <button type="submit">Submit</button>
    // </form>
    //  {error && <p>{error}</p>} {/* Display the error message if there is one */}
    //  </div>
  );
};

export default KYCPage;
