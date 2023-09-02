import React from 'react';
import { Link } from 'react-router-dom';


const ConfirmationFailed = () => {
  return (
    <div>
      <h1>Email Confirmation Failed</h1>
      <p>Sorry, we couldn't confirm your email. Please try again or contact support.</p>
      {/* Add navigation link to resend confirmation email or to contact support */}
    </div>
  );
};

export default ConfirmationFailed;
