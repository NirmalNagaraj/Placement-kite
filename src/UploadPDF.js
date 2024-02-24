import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Send the file to the server for upload
      const response = await axios.post('http://localhost:3000/api/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle success
      console.log('File uploaded successfully:', response.data);
      alert('File uploaded successfully');
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};

export default UploadPDF;
