import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ConfirmationSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const status = query.get('status');

  return (
    <div>
      {status === 'success' ? (
        <div>
        <h1>Email confirmed successfully!</h1>
        <Link href="/login" >
        Log in to account
        </Link>
        </div>
      ) : (
        <h1>Failed to confirm email.</h1>
      )}
    </div>
  );
};

export default ConfirmationSuccess;