import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>You need to be logged in as a trader to view this page</h2>
        <button onClick={navigateToLogin}>Go to Login</button>
      </div>
    </div>
  );
};

export default AuthModal;
