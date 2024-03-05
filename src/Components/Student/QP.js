import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

function QPUpload() {
  const [companyName, setCompanyName] = useState('');
  const [round, setRound] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [solutionType, setSolutionType] = useState('');
  const [solutionData, setSolutionData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Retrieve authorization token from localStorage
      const token = localStorage.getItem('token');
      
      // Set headers with authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };

      // Create a FormData object to send file data
      const formData = new FormData();
      formData.append('company_name', companyName);
      formData.append('round', round);
      formData.append('question_description', questionDescription);
      formData.append('solution_type', solutionType);
      formData.append('solution_data', solutionData);

      // Send data to the backend server with headers
      await axios.post('http://localhost:3000/api/upload-qp', formData, { headers });

      // Reset form fields after successful submission
      setCompanyName('');
      setRound('');
      setQuestionDescription('');
      setSolutionType('');
      setSolutionData('');

      // Optionally, display a success message to the user
      alert('Question uploaded successfully!');
    } catch (error) {
      // Handle error responses from the server
      console.error('Error uploading question:', error);
      alert('An error occurred while uploading the question. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" gutterBottom>Upload Question Paper</Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Round"
            variant="outlined"
            fullWidth
            value={round}
            onChange={(e) => setRound(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Question Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={questionDescription}
            onChange={(e) => setQuestionDescription(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Solution"
            variant="outlined"
            fullWidth
            value={solutionType}
            onChange={(e) => setSolutionType(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => setSolutionData(e.target.files[0])}
            required
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default QPUpload;
