import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './Company.css'

function CompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [date, setDate] = useState('');
  const [ctc, setCtc] = useState('');
  const [role, setRole] = useState('');
  const [criteria, setCriteria] = useState('80%');
  const [role, setRole] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/company-data', {
        name: companyName,
        date,
        ctc,
        role,
        criteria
      });
      alert('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Company Form</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='input-field'>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className='field'
          />
        </div>
        <div className='input-field'>
          <TextField
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
            type="number"
            label="CTC"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            required
            className='field'
          />
        </div>
        <div className='input-field'>
          <TextField
            type="text"
            label="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className='field'
          />
        </div>
        <div className='input-field'>
          <FormControl>
            <InputLabel>Criteria</InputLabel>
            <Select value={criteria} onChange={(e) => setCriteria(e.target.value)} className='field'>
              <MenuItem value="80%">80%</MenuItem>
              <MenuItem value="60%">60%</MenuItem>
              <MenuItem value="common">Common</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='input-field'>
          <TextField
            type="text"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className='field'
          />
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default CompanyForm;
