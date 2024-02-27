import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

const handleUpload = async () => {
  if (!selectedFile || !companyName) {
    setSnackbarMessage('Please select a file and provide a company name');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    return;
  }

  const formData = new FormData();
  formData.append('pdfFile', selectedFile);
  formData.append('companyName', companyName);
  console.log(selectedFile , companyName);

  try {
    const response = await axios.post('http://localhost:3000/api/update-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('File uploaded successfully:', response.data);
    setSnackbarMessage('File uploaded successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
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
    <div>
      <div>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div>
        <input type="text" placeholder="Company Name" value={companyName} onChange={handleCompanyNameChange} />
      </div>
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
