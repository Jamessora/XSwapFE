import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import PersistentDrawerLeft from "../../components/Admin Sidebar";


const AdminCreateTraderPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

  const handleCreateTrader = async () => {
    const payload = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch(`${apiBaseURL}/admin/createTrader`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Trader created successfully");
      } else {
        alert(`Failed to create trader: ${data.message}`);
      }

    } catch (error) {
      console.error("There was an error creating the trader", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PersistentDrawerLeft />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Create Trader</Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
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
                label="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleCreateTrader}>
                Create Trader
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};


export default AdminCreateTraderPage;
