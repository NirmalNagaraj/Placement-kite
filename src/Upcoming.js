import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function UpcomingPage() {
  const [upcomingCompanyData, setUpcomingCompanyData] = useState([]);

  useEffect(() => {
    async function fetchUpcomingCompanyData() {
      try {
        const response = await axios.get('https://localhost:3000/upcoming');
        setUpcomingCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching upcoming company data:', error);
      }
    }
    fetchUpcomingCompanyData();
  }, []);

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
              Date: {company.date}
            </Typography>
            <Typography color="textSecondary">
              CTC: {company.ctc}
            </Typography>
            <Typography color="textSecondary">
              Criteria: {company.criteria}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UpcomingPage;
