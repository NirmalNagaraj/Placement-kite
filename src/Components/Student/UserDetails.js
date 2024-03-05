import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import './UserDetails.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDetailsPage = () => {
  const [gender, setGender] = useState('');
  const [branch, setBranch] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [residence, setResidence] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    gender:'',
    branch:'',
    marks10: '',
    marks12OrDiploma: '',
    cgpa: '',
    backlogs: '',
    historyOfArrears: '',
    mobileNumber: '',
    email: '',
    residence: '', // Added residence to formData
    address: '',
    degree: '',
    yearOfPassing: '',
    educationLevel: '',
    domain: '' // Added educationLevel to formData
  });
  const  navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (event) => {
    const { value } = event.target;
    setGender(value);
    setFormData({
      ...formData,
      gender: value
    });
  };

  const handleBranchChange = (event) => {
    const { value } = event.target;
    setBranch(value);
    setFormData({
      ...formData,
      branch: value
    });
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
    setFormData({
      ...formData,
      educationLevel: event.target.value // Update educationLevel in formData
    });
  };

  const handleResidenceChange = (event) => {
    setResidence(event.target.value);
    setFormData({
      ...formData,
      residence: event.target.value // Update residence in formData
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.post('http://localhost:3000/userDetails', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      if (response.status === 200) {
        console.log('User details submitted successfully');
        // Optionally, reset the form here
        navigate('/dashboard');
      }
      console.log(formData);
      
    } catch (error) {
      console.error('Error submitting user details:', error);
    }
  };

  return (
    <div className='main-div'>
    <Typography variant="h4">User Details</Typography>
    <form onSubmit={handleSubmit} className="form-container">
      
    <div className='form-div'>
      <TextField label="Name" name="name" fullWidth onChange={handleInputChange} />
      
      <FormControl fullWidth>
        <FormLabel component="legend">Gender</FormLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          name="gender"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel component="legend">Branch</FormLabel>
        <Select
          labelId="branch-label"
          id="branch"
          value={branch}
          onChange={handleBranchChange}
          name="branch"
        >
          <MenuItem value="CSE">CSE</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="CSBS">CSBS</MenuItem>
        </Select>
      </FormControl>

      <TextField label="10th Mark" name="marks10" fullWidth onChange={handleInputChange} />

      <FormControl fullWidth>
        <FormLabel component="legend">Mode of Education</FormLabel>
        <Select
          labelId="education-level-label"
          id="education-level"
          value={educationLevel}
          onChange={handleEducationLevelChange}
          name="educationLevel"
        >
          <MenuItem value="12">12</MenuItem>
          <MenuItem value="diploma">Diploma</MenuItem>
        </Select>
      </FormControl>

      {(educationLevel === '12' || educationLevel === 'diploma') && (
        <TextField label={educationLevel === '12' ? "Marks 12" : "Diploma Marks"} name="marks12OrDiploma" fullWidth onChange={handleInputChange} />
      )}

      <TextField label="CGPA" name="cgpa" fullWidth onChange={handleInputChange} />
      <TextField label="Backlogs" name="backlogs" fullWidth onChange={handleInputChange} />
      <TextField label="History of Arrears" name="historyOfArrears" fullWidth onChange={handleInputChange} />
      <TextField label="Mobile Number" name="mobileNumber" fullWidth onChange={handleInputChange} />
      <TextField label="Email" name="email" fullWidth onChange={handleInputChange} />

      <FormControl fullWidth>
        <FormLabel component="legend">Residence</FormLabel>
        <Select
          labelId="residence-label"
          id="residence"
          value={residence}
          onChange={handleResidenceChange}
          name="residence"
        >
          <MenuItem value="Hosteller">Hosteller</MenuItem>
          <MenuItem value="Dayscholar">Dayscholar</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Address" name="address" fullWidth onChange={handleInputChange} />
      <TextField label="Degree" name="degree" fullWidth onChange={handleInputChange} />
      <TextField label="Year of Passing" name="yearOfPassing" fullWidth onChange={handleInputChange} />
      <TextField label="Domain" name="domain" fullWidth onChange={handleInputChange} />
      </div>
  
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </div>
   
  );
};

export default UserDetailsPage;
