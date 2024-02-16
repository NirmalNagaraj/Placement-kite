// ReportPage.js
import React, { useState, useEffect } from 'react';
import './Report.css'

export default function ReportPage() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      if (!response.ok) {
        throw new Error(`Failed to fetch data - ${response.statusText}`);
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    }
  };

  return (
    <div>
      <h1>Report</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="roles-table">
          <thead>
            <tr>
              {Object.keys(roles[0] || {}).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index}>
                {Object.values(role).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
}