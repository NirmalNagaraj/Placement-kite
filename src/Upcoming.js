import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function UpcomingPage() {
  const [upcomingCompanyData, setUpcomingCompanyData] = useState([]);

  useEffect(() => {
    async function fetchUpcomingCompanyData() {
      try {
        const response = await axios.get('http://localhost:3000/upcoming');
        setUpcomingCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching upcoming company data:', error);
      }
    }
    fetchUpcomingCompanyData();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h2>Upcoming Company Data</h2>
      {upcomingCompanyData.map((company) => (
        <Card key={company.id} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {company.name}
            </Typography>
            <Typography color="textSecondary">
              Date: {formatDate(company.date)}
            </Typography>
            <Typography color="textSecondary">
              CTC: {company.ctc}
            </Typography>
            <Typography color="textSecondary">
              Criteria: {company.role}
            </Typography>
            <Typography color="textSecondary">
              Criteria: {company.criteria}
            </Typography>
            <Typography color="textSecondary">
              Role: {company.role}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UpcomingPage;
