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
    <div>
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          University Roll Number:
          <input 
            type="text" 
            value={universityRollNumber} 
            onChange={(e) => setUniversityRollNumber(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Retrieve Data</button>
      </form>
      {error && <p>{error}</p>}
      {studentDetails && (
        <div>
          <h2>Student Details</h2>
          <pre>{JSON.stringify(studentDetails, null, 2)}</pre>
        </div>
      )}
      {placedInfo && (
        <div>
          <h2>Placed Info</h2>
          <pre>{JSON.stringify(placedInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default StudentInfoPage;
