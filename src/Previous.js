import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function PreviousPage() {
  const [previousCompanyData, setPreviousCompanyData] = useState([]);

  useEffect(() => {
    async function fetchPreviousCompanyData() {
      try {
        const response = await axios.get('http://localhost:3000/previous');
        setPreviousCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching previous company data:', error);
      }
    }
    fetchPreviousCompanyData();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h2>Previous Company Data</h2>
      {previousCompanyData.map((company) => (
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
              Criteria: {company.criteria}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PreviousPage;
