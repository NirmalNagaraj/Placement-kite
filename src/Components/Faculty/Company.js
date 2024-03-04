import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import './Company.css';

function CompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [date, setDate] = useState('');
  const [ctc, setCtc] = useState('');
  const [role, setRole] = useState('');
  const [criteria, setCriteria] = useState('80%');
  const [link, setLink] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/company-data', {
        name: companyName,
        date,
        ctc,
        role,
        criteria,
        link
      });
      console.log(role);
      setSnackbarOpen(true); // Open the Snackbar on successful submission
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); // Close the Snackbar when clicked on the close button
  };

  const handleRoleChange = (event) => {
    console.log("Role:", event.target.value); // Log the value received
    setRole(event.target.value); // Update the state
  };

  return (
    <div className='container'>
      <div className='l'></div>
      <div className='r'>
        <div className='form-group'>
            <h2>Company Form</h2>
            <form onSubmit={handleSubmit} className='form-container'>
              <div className='input-field'>
                <TextField
                  label="Company Name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className='field'
                />
              </div>
              <div className='input-field'>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className='field'
                />
              </div>
              <div className='input-field'>
                <TextField
                  label="CTC"
                  type="number"
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                  className='field'
                />
              </div>
              <div className='input-field'>
                <TextField
                  label="Role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className='field'
                />
              </div>
              <div className='input-field'>
                <FormControl fullWidth >
                  <InputLabel>Criteria</InputLabel>
                  <Select value={criteria} onChange={handleRoleChange} className='field'>
                    <MenuItem value="80%">Overall 80%</MenuItem>
                    <MenuItem value="60%">Overall 60%</MenuItem>
                    <MenuItem value="common">Common for All</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='input-field'>
                <TextField
                  label="Link"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className='field'
                />
              </div>
              <button type="submit" variant="contained" className='logBtn'>Submit</button>
            </form>
        </div>
        
        {/* Snackbar for showing success message */}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Data inserted successfully"
        />
      </div>
    </div>
  );
}

export default CompanyForm;
