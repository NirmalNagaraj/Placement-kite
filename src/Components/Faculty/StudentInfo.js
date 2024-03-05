import React, { useState } from 'react';
import axios from 'axios';

function StudentInfoPage() {
  const [universityRollNumber, setUniversityRollNumber] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [placedInfo, setPlacedInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch student details from db table
      const studentResponse = await axios.get(`http://localhost:3000/students/info?universityRollNumber=${universityRollNumber}`);
      setStudentDetails(studentResponse.data.studentDetails);

      // Fetch placed info from placed_info table
      const placedResponse = await axios.get(`http://localhost:3000/students/info?universityRollNumber=${universityRollNumber}`);
      setPlacedInfo(placedResponse.data.placedInfo);

      setError('');
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
      setStudentDetails(null);
      setPlacedInfo(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding:"30px 0" }}>
    <h1>Student Information</h1>
    <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
    <label style={{ display: 'block', marginBottom: '0px' }}>
      University Roll Number:
      <input 
        type="text" 
        value={universityRollNumber} 
        onChange={(e) => setUniversityRollNumber(e.target.value)} 
        required 
        style={{ marginLeft: '5px' }}
      />
    </label>
    <br />
    <button type="submit">Retrieve Data</button>
  </form>

  {error && <p>{error}</p>}
  {studentDetails && (
    <div style={{ textAlign: 'left', margin: 'auto', maxWidth: '600px' }}>
      <h2>Student Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(studentDetails[0]).map(([key, value], index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
  {placedInfo && (
    <div style={{ textAlign: 'left', margin: 'auto', maxWidth: '600px' }}>
      <h2>Placed Info</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(placedInfo[0]).map(([key, value], index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


  );
}

export default StudentInfoPage;
