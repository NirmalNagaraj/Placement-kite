import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';
import './CGPA.css'

function StudentForm() {
  const [universityRollNumber, setUniversityRollNumber] = useState('');
  const [cgpa, setCgpa] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/cgpa', {
        universityRollNumber,
        cgpa
      });
      console.log(response.data.message);
      // Handle success, maybe show a success message to the user
    } catch (error) {
      console.error('Error updating Aggregate %:', error.response.data.error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box className="formContainer">
          <TextField
            label="University Roll Number"
            type='number'
            variant="outlined"
            value={universityRollNumber}
            onChange={(e) => setUniversityRollNumber(e.target.value)}
            className="textField"
          />
          <TextField
            label="CGPA"
            variant="outlined"
            type='float'
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="textField"
          />
          <Button variant="contained" color="primary" type="submit" className="button">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default StudentForm;
