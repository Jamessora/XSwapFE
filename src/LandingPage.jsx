import React from 'react';
import ButtonUsage from './test';
import PersistentDrawerLeft from './components/Sidebar';
import { Typography, Box } from '@mui/material';

import './LandingPage.css'; // Import your CSS file

const LandingPage = () => {
  return (
    <div className="container">
      <PersistentDrawerLeft />
      
      <div className="header">
      <Typography variant="h1" className="heading" style={{ color: 'white' }}>XSwap</Typography>

        <Typography variant="subtitle1" className="subheading" style={{ color: 'white' }} >Trade for your future</Typography>
      </div>

      <div className="flexContainer">
        <div className="column">
          <Typography variant="h1">Reliability</Typography>
          <Typography variant="body1"></Typography>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button>Click Me!</button>
            <div style={{ display: "none", position: "absolute", backgroundColor: "#f9f9f9", minWidth: "160px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", zIndex: "1" }}>
             
            </div>
          </div>
        </div>

        <div className="column">
          <Typography variant="h1">Secured</Typography>
          <Typography variant="body1"></Typography>
          <Typography variant="body1"></Typography>
        </div>

        <div className="column">
          <Typography variant="h1">Easy to use</Typography>
          <Typography variant="body1"></Typography>
        </div>
      </div>

      <div className="footer">
        <Typography variant="h1">Footer</Typography>
        <Typography variant="body1">Footer information goes here</Typography>
      </div>
    </div>
  );
};

export default LandingPage;
