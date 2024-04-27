import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Questiondetails() {
  const { companyName, id } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/qbdetails?companyName=${companyName}&id=${id}`);
        setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [companyName, id]);

  return (
    <div>
      {companyDetails ? (
        <div>
          <h1>Company Name: {companyDetails.name}</h1>
          <h2>Company Description: {companyDetails.description}</h2>
          {/* Display other details about the company */}
        </div>
      ) : (
        <p>Loading company details...</p>
      )}
    </div>
  );
}
