import React, { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form submission or validation here
    console.log('Company Name:', companyName);
    console.log('Uploaded Documents:', uploadedDocuments);
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
            accept=".pdf,.doc,.docx,.jpg,.png"
            required
          />
          <p>(Accepted formats: PDF, DOC, DOCX, JPG, PNG)</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadOfferLetter;
