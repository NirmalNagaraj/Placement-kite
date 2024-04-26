import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

function AppliedCompanies() {
  const [appliedCompanies, setAppliedCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/appliedCompanies', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setAppliedCompanies(response.data);
      } catch (error) {
        console.error('Error fetching applied companies:', error.response);
      }
    };

    fetchData();
  }, []);

  const handleReviewSubmit = (companyId) => {
    console.log('Submitting review for company:', companyId);
  };

  return (
    
      {appliedCompanies.map(company => (
        <Card key={company.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">Company Name: {company.company_name}</Typography>
            <Button variant="contained" onClick={() => handleReviewSubmit(company.id)}>Submit Review</Button>
          </CardContent>
        </Card>
      ))}
   
    )
}

export default AppliedCompanies;
