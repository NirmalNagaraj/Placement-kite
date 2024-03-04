import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './Report.css';
import html2pdf from 'html2pdf.js';

export default function ReportPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    tenthMarks: '',
    twelfthMarks: '',
    currentBacklogs: '',
    cgpa: '',
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/data?tenth=${filters.tenthMarks}&twelfth=${filters.twelfthMarks}&backlogs=${filters.currentBacklogs}&cgpa=${filters.cgpa}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data - ${response.statusText}`);
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    }
  };

  const handleFilterChange = (event, field) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value === '0' ? '' : value, // If input is '0', set it to an empty string
    }));
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('report');

    html2pdf()
      .set({
        margin: 10,
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(input)
      .save();
  };

  return (
    <div className="report-container" id="report">
      <h1>Report</h1>
      <div className="filter-options">
        <div className="filter-row">
          <TextField
            type="number"
            label="10th Marks"
            value={filters.tenthMarks}
            onChange={(e) => handleFilterChange(e, 'tenthMarks')}
            placeholder="Enter value (0-100)"
            max="100"
          />
          <TextField
            type="number"
            label="12th Marks"
            value={filters.twelfthMarks}
            onChange={(e) => handleFilterChange(e, 'twelfthMarks')}
            placeholder="Enter value (0-100)"
            max="100"
          />
        </div>
        <div className="filter-row">
          <TextField
            type="number"
            label="No. of Current Backlogs"
            value={filters.currentBacklogs}
            onChange={(e) => handleFilterChange(e, 'currentBacklogs')}
            placeholder="Enter value"
          />
          <TextField
            type="number"
            label="CGPA"
            value={filters.cgpa}
            onChange={(e) => handleFilterChange(e, 'cgpa')}
            placeholder="Enter value (0-10)"
            max="10"
          />
        </div>
        <Button onClick={handleDownloadPDF} variant="contained" color="primary">
          Download PDF
        </Button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="roles-table">
          <thead>
            <tr>
              <th>S NO</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student['Sl.No.']}</td>
                <td>{student['Student Name']}</td>
                <td>{student['Email ID']}</td>
                <td>{student['Mobile Number']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}