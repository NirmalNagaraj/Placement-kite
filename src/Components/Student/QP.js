import React, { useState } from 'react';
import axios from 'axios';

function QPUpload() {
  const [companyName, setCompanyName] = useState('');
  const [round, setRound] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [solutionType, setSolutionType] = useState('');
  const [solutionData, setSolutionData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      formData.append('company_name', companyName);
      formData.append('round', round);
      formData.append('question_description', questionDescription);
      formData.append('solution_type', solutionType);
      formData.append('solution_data', solutionData);

      await axios.post('http://localhost:3000/api/upload-qp', formData, { headers });

      setCompanyName('');
      setRound('');
      setQuestionDescription('');
      setSolutionType('');
      setSolutionData('');

      alert('Question uploaded successfully!');
    } catch (error) {
      console.error('Error uploading question:', error);
      alert('An error occurred while uploading the question. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Upload Question Paper</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{marginLeft:'50px'}}>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            style={{ padding: '8px', marginLeft:'50px',border: '1px solid #ccc', borderRadius: '4px' ,width: '400px'}}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Round</label><br></br>
          <input
            type="text"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            required
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' ,width: '400px'}}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Question Description</label><br></br>
          <textarea
            rows="4"
            minLength={4}
            value={questionDescription}
            onChange={(e) => setQuestionDescription(e.target.value)}
            required
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px',width: '400px',resize:'vertical' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Solution</label><br></br>
          <input
            type="text"
            value={solutionType}
            onChange={(e) => setSolutionType(e.target.value)}
            required
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' ,width: '400px'}}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Upload File</label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => setSolutionData(e.target.files[0])}
            required
            style={{ display: 'block', marginBottom: '8px',width:'400px' }}
          />
          <small style={{ color: '#888' }}>Acceptable formats: PDF, JPEG, JPG, PNG</small>
        </div>
        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default QPUpload;