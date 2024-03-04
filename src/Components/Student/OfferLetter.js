import React, { useState } from 'react';
import axios from 'axios';

const UploadOfferLetter = () => {
  const [companyName, setCompanyName] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState(null);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleDocumentsChange = (event) => {
    // Assuming you want to handle single file uploads
    const file = event.target.files[0];
    setUploadedDocuments(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Create form data
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('pdfFile', uploadedDocuments);

    try {
      // Send POST request to /offerLetter route with token in headers
      const response = await axios.post('http://localhost:3000/offerLetter', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error uploading offer letter:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Company Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={handleCompanyNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="uploadedDocuments">Upload Documents:</label>
          <input
            type="file"
            id="uploadedDocuments"
            onChange={handleDocumentsChange}
            accept=".pdf"
            required
          />
          <p>(Accepted formats: PDF only)</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadOfferLetter;
