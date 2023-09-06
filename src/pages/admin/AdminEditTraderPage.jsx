import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PersistentDrawerLeft from '../../components/Admin Sidebar';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const AdminEditTraderPage = () => {
  const { id } = useParams();
  const [trader, setTrader] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseURL}/admin/trader/${id}`)
      .then(response => response.json())
      .then(data => {
        setTrader(data);
        setEmail(data.email);
        setBalance(data.balance);
        setKycStatus(data.kyc_status);
      });
  }, [id]);

  const handleUpdate = () => {
    fetch(`${apiBaseURL}/admin/updateTrader/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user:{ email, password, balance, kyc_status: kycStatus }}),
      
    })
    
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert("Trader updated successfully.");
      } else {
        alert("Failed to update trader.");
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PersistentDrawerLeft />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Edit Trader</Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Balance"
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>KYC Status</InputLabel>
                <Select
                  value={kycStatus}
                  onChange={(e) => setKycStatus(e.target.value)}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleUpdate}>
                Update Trader
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AdminEditTraderPage;
