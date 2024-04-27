import React, { useState } from 'react';
import './AppliedForm.css';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters

function AppliedForm() {
  const { companyName } = useParams(); // Extract companyName from URL params
  const [selectedRound, setSelectedRound] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/submitReview/${companyName}`, {
        role: selectedRound, // Use selectedRound as role
        review: reviewText // Use reviewText as review
      });
      console.log(response.data);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="review-form">
      <h2>Review Form for {companyName}</h2>
      <FormControl fullWidth>
        <InputLabel id="rounds-label">Select Round</InputLabel>
        <Select
          labelId="rounds-label"
          id="rounds"
          value={selectedRound}
          onChange={handleRoundChange}
        >
          <MenuItem value="aptitude">Aptitude</MenuItem>
          <MenuItem value="technical">Technical</MenuItem>
          <MenuItem value="groupDiscussion">Group Discussion</MenuItem>
          {/* Add more rounds as needed */}
        </Select>
      </FormControl>
      <TextField
        id="review-text"
        label="Enter Review"
        multiline
        fullWidth
        value={reviewText}
        onChange={handleReviewTextChange}
      />
      <Button variant="contained" onClick={handleSubmitReview}>Submit</Button>
    </div>
  );
}

export default AppliedForm;
