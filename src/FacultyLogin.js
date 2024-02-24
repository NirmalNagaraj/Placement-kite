// FacultyLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyLogin.css';
import TextField from '@mui/material/TextField';
import axios from 'axios';


function FacultyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/faculty/login', { username, password });
      console.log(response.data);
      if (response.status === 200) {
        navigate('/add-company'); 
      } 
    } catch (error) {
      console.error(error.response.data); // Handle login error
    }
  };

  return (
    <div className='container'>
      <div className='left'>
        <h1>Left</h1>
      </div>
      <div className='right'>
        <div className='form-group'>
          <h1>Faculty Login</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              helperText=""
              fullWidth
              required
              type='text'
              label="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              helperText=""
              fullWidth
              required
              type='password'
              label="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='logBtn'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
