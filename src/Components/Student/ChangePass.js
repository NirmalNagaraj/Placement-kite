import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import './ChangePass.css'

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      handleOpenSnackbar();
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage

      const response = await axios.post('http://localhost:3000/api/reset-password', {
        newPassword,
        repeatPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in Authorization header
        }
      });

      if (response.status === 200) {
        // Password reset successful
        setSuccessMessage('Password reset successful');
        handleOpenSnackbar();
        setNewPassword('');
        setRepeatPassword('');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Failed to reset password');
      handleOpenSnackbar();
    }
  };

  return (
    <div className='form-container'>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        {successMessage ? (
          <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </MuiAlert>
        ) : (
          <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </MuiAlert>
        )}
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Repeat Password:</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
