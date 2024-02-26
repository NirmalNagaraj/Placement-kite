import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function ValidatePass() {
  const [universityRollNumber, setuniversityRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/validate', { // Use Axios for POST request
        universityRollNumber,
        password
      });
      if (response.status === 200) { // Check response status
        navigate('/change');
      } else {
        console.error('Validation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>University Roll Number:</label>
        <input
          type="text"
          value={universityRollNumber}
          onChange={(e) => setuniversityRollNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      <a href='/otp'>Forgot password?</a>
    </form>
  );
}

export default ValidatePass;
