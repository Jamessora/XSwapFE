import React from 'react';
import { Link } from 'react-router-dom';


const ConfirmationSuccess = () => {
  return (
    <div>
      <h1>Email Confirmed</h1>
      <p>Your email has been successfully confirmed. You can now proceed to login.</p>
      {/* Add navigation link to login page or dashboard */}

      <Link href="/login" >
        Log in to account
      </Link>
    </div>
  );
};

export default ConfirmationSuccess;