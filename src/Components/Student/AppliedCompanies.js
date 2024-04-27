import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './AppliedCompanies.css';

function AppliedCompanies() {
  const [appliedCompanies, setAppliedCompanies] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/appliedCompanies`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setAppliedCompanies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching applied companies:', error.response);
      }
    };

    fetchData();
  }, []);

  const handleReviewSubmit = (companyName) => {
    console.log('Submitting review for company:', companyName);
    // Navigate to AppliedForm.js using navigate function
    navigate(`/appliedForm/${encodeURIComponent(companyName)}`); // Pass companyName as a parameter
  };

  return (
    <div className="re-container">
      <div class="applied-head">
        <h1>Applied Companies</h1>
      </div>
      
      <div className="re-cards-container">
        {appliedCompanies.map(company => (
          <Card key={company.id} className="re-card">
            <CardContent className="re-card-content">
              <Typography variant="h6">Company Name: {company.company_name}</Typography>
              {/* Pass the company name as a parameter */}
              <Button variant="contained" className='review-btn' onClick={() => handleReviewSubmit(company.company_name)}>Submit Review</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AppliedCompanies;
