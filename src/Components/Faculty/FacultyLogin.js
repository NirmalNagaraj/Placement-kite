// FacultyLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyLogin.css';

import axios from 'axios';
import InputText from '../../InputText'
import InputPass from '../../InputPass';


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
            <InputText
              label="User name"
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputPass // Replace TextField with InputPass component
              label="Enter password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
            
            <button type='submit' className='logBtn'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
