import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import './Previous.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PercentIcon from '@mui/icons-material/Percent';
import ComputerIcon from '@mui/icons-material/Computer';
import LogoutButton from '../../Logout';

function PreviousPage() {
  const [previousCompanyData, setPreviousCompanyData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    async function fetchPreviousCompanyData() {
      try {
        const response = await axios.get('http://localhost:3000/previous');
        setPreviousCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching previous company data:', error);
      }
    }

    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/dashboard', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        console.log(response);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response);
      }
    }

    const fetchData = async () => {
      await fetchDashboardData();
      await fetchPreviousCompanyData();
    };
    
    fetchData();
  }, []);

 const handleQuestionBankClick = async (companyName) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/question-bank/${companyName}`, {
      responseType: 'arraybuffer' // Set response type to arraybuffer to receive binary data
    });
    console.log(response.data); // ArrayBuffer logged in the console

    // Convert the ArrayBuffer to Blob
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    console.log('PDF Blob:', pdfBlob);

    // Create a URL object from the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
    console.log('PDF URL:', pdfUrl);
     window.open(pdfUrl, '_blank');
    // Set the URL of the PDF to be displayed in the iframe
    setSelectedPdf(pdfUrl);
  } catch (error) {
    console.error('Error fetching question bank:', error);
  }
};


  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {dashboardData ? (
        <div className='nav'>
          <img src='' alt="logo"></img>
          <div className='profile'>
            <AccountCircleIcon /><p className='nav-user-name'>{dashboardData.user.name}</p>
          </div>
        </div>
      ) : (
        <h1>Error</h1>
      )}
      
      <div className='section'>
        <div className='left-nav'>
          <div className='dash-items'>
            <a href="https://heartfelt-valkyrie-d1bafe.netlify.app/"><button>Edit Resume</button></a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <LogoutButton/>
        </div>
        <div className="user-info">
          <h2 className='upcoming-title'>Previous Drives</h2>
          <div className='upcoming-list'>
            {previousCompanyData.map((company) => (
              <Card key={company.id} variant="outlined" style={{ marginBottom: '10px' }}>
                <CardContent>
                  <div className='p'>
                    <CorporateFareIcon fontSize='large' className='icon-color'/>
                    <Typography variant="h5" component="h2">
                      {company.name}
                    </Typography>
                  </div>
                  <div className='p'>
                    <DateRangeIcon className='icon-color'/>
                    <Typography color="textSecondary">
                      {formatDate(company.date)}
                    </Typography>
                  </div>
                  <div className='p'>
                    <RequestPageIcon className='icon-color'/>
                    <Typography color="textSecondary">
                      {company.ctc}
                    </Typography>
                  </div>
                  <div className='p'>
                    <PercentIcon className='icon-color'/>
                    <Typography color="textSecondary">
                      {company.criteria}
                    </Typography>
                  </div>
                  <div className='p'>
                    <ComputerIcon className='icon-color'/>
                    <Typography color="textSecondary">
                      {company.role}
                    </Typography>
                  </div>
                  <button onClick={() => handleQuestionBankClick(company.name)}>Question Bank</button>
                  <a href={`/QBlist/${encodeURIComponent(company.name)}`}>View Questions</a>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* {selectedPdf && (
        <div>
          <h3>Question Bank</h3>
          <iframe title="Question Bank PDF" src={selectedPdf} width="100%" height="500px" ></iframe>
        </div>
      )} */}
    </div>
  );
}

export default PreviousPage;
