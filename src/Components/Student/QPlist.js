import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import './Previous.css';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LogoutButton from '../../Logout';

function QBList() {
  const { companyName } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get-qp?companyName=${companyName}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [companyName]);

const handleDownloadSolution = async (companyName) => {
  try {
    // Fetch the solution data from the /get-qp API endpoint
    const response = await axios.get(`http://localhost:3000/api/get-document/${companyName}`, {
      responseType: 'arraybuffer' // Set response type to arraybuffer to receive binary data
    });

    // Convert the response data to a blob
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

    // Create a blob URL for the blob data
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the blob URL in a new tab
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error downloading solution:', error);
  }
};



  return (
    <div>
      <h2>Question Bank List</h2>
      <Link to="/QuestionBank" className="add-button">Add</Link>

      <h3>Questions for {companyName}</h3>

      <div className='upcoming-list'>
        {questions.map((question, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <div className='p'>
                <CorporateFareIcon fontSize='large' className='icon-color'/>
                <Typography variant="h5" component="h2">
                  {question.company_name}
                </Typography>
              </div>
              <div className='p'>
                <Typography color="textSecondary">
                  Round: {question.round}
                </Typography>
              </div>
              <div className='p'>
                <Typography color="textSecondary">
                  Description: {question.question_description}
                </Typography>
              </div>
              <div className='p'>
                <Typography color="textSecondary">
                  Solution Type: {question.solution_type}
                </Typography>
              </div>
              <div className='p'>
                <button onClick={() => handleDownloadSolution(question.company_name)}>Download Solution</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default QBList;
