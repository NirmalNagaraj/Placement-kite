import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './UploadPDF.css'

function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [hiring, setHiring] = useState('');
  const [studentInfo, setStudentInfo] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleHiringChange = (event) => {
    setHiring(event.target.value);
    // Generate input fields for each hired student
    const numStudents = parseInt(event.target.value) || 0;
    const newStudentInfo = [];
    for (let i = 0; i < numStudents; i++) {
      newStudentInfo.push({ studentNumber: '', role: '', ctc: '' });
    }
    setStudentInfo(newStudentInfo);
  };

  const handleStudentInfoChange = (index, field, value) => {
    const newStudentInfo = [...studentInfo];
    newStudentInfo[index][field] = value;
    setStudentInfo(newStudentInfo);
  };

  const handleUpload = async () => {
    if (!selectedFile || !companyName || !hiring) {
      setSnackbarMessage('Please select a file, provide a company name, and specify the number of hires');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    formData.append('companyName', companyName);
    formData.append('hiring', hiring);

    try {
      // Send the PDF file, company name, and hiring value to /api/update-pdf
      const response = await axios.post('http://localhost:3000/api/update-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data);
      setSnackbarMessage('File uploaded successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Also send the hiring value to /hiring-update
      await axios.post('http://localhost:3000/hiring-update', { companyName, hiring });

      // Send student information to /placement-info
      await axios.post('http://localhost:3000/placement-info', { companyName, studentInfo });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSnackbarMessage('Company not found in the database');
      } else {
        setSnackbarMessage('Error uploading file');
      }
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='pdf-container'>
      <div>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div>
        <input type="text" placeholder="Company Name" value={companyName} onChange={handleCompanyNameChange} />
      </div>
      <div>
        <input type="number" placeholder="Hired" value={hiring} onChange={handleHiringChange} />
      </div>
      {/* Generate input fields for each hired student */}
      {studentInfo.map((student, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Student ${index + 1} Number`}
            value={student.studentNumber}
            onChange={(e) => handleStudentInfoChange(index, 'studentNumber', e.target.value)}
          />
          <input
            type="text"
            placeholder={`Student ${index + 1} Role`}
            value={student.role}
            onChange={(e) => handleStudentInfoChange(index, 'role', e.target.value)}
          />
          <input
            type="text"
            placeholder={`Student ${index + 1} CTC`}
            value={student.ctc}
            onChange={(e) => handleStudentInfoChange(index, 'ctc', e.target.value)}
          />
        </div>
      ))}
      <div>
        <button onClick={handleUpload}>Upload PDF</button>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UploadPDF;
