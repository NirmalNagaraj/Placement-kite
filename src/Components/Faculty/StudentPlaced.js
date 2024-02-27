import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentPlaced.css';

function PlacedStudents() {
  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:3000/students-placed')
      .then(response => {
        setPlacedStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching placed students:', error);
      });
  }, []);

  return (
    <div className="placed-students-container">
      <h1>Placed Students</h1>
      <table className="placed-students-table">
        <thead>
          <tr>
            <th>University Number</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>CTC</th>
          </tr>
        </thead>
        <tbody>
          {placedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.university_number}</td>
              <td>{student.company_name}</td>
              <td>{student.role}</td>
              <td>{student.ctc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacedStudents;
