import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './StudentLogin.css'

const StudentLogin = () => {
  const [universityRollNumber, setUniversityRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { universityRollNumber, password });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      setError(`Error occurred: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className='container'>
        <div className='left'></div>
        <div className='right'>
        <div className='form-group'>
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
        
          <TextField
            label="University Roll Number"
            variant="outlined"
            id="universityRollNumber"
            value={universityRollNumber}
            onChange={(e) => setUniversityRollNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        
        
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="contained" type="submit">Login</Button>
      </form>
        </div>
        
    </div>
        </div>
   
    
  );
};

export default StudentLogin;