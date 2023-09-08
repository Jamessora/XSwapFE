import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthModal = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>You need to be logged in as an admin to view this page</h2>
        <button onClick={navigateToLogin}>Go to Login</button>
      </div>
    </div>
  );
};

export default AdminAuthModal;
