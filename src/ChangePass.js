import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setErrorMessage('Passwords do not match');
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
        // You can redirect the user to a success page or perform any other action
        console.log('Password reset successful');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
