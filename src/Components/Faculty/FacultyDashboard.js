import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import './FacultyDashboard.css';

export default function FacultyDashboard() {
  const [totalHiring, setTotalHiring] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [companyDrives, setCompanyDrives] = useState([]);

  useEffect(() => {
    async function fetchTotalHiring() {
      try {
        const response = await axios.get('http://localhost:3000/hiring-count');
        setTotalHiring(response.data.totalHiring);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching total hiring count:', error);
      }
    }

    async function fetchCompanyDrives() {
      try {
        const response = await axios.get('http://localhost:3000/previous');
        setCompanyDrives(response.data);
      } catch (error) {
        console.error('Error fetching company drives:', error);
      }
    }

    fetchTotalHiring();
    fetchCompanyDrives();
  }, []);

  return (
    <div className="faculty-dashboard-container">
      <div className="faculty-sidebar">
        <div className="faculty-sidebar-header">
          Faculty Dashboard
        </div>
        <ul className="faculty-sidebar-nav">
          <li>
            <NavLink to="/dashboard-faculty" activeClassName="faculty-active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-company" activeClassName="faculty-active">Add Company</NavLink>
          </li>
          <li>
            <NavLink to="/report" activeClassName="faculty-active">Report</NavLink>
          </li>
          <li>
            <NavLink to="/cgpa-upload" activeClassName="faculty-active">Change CGPA</NavLink>
          </li>
          <li>
            <NavLink to="/update-company" activeClassName="faculty-active">Update Company</NavLink>
          </li>
          <li>
            <NavLink to="/placed" activeClassName="faculty-active">Placed</NavLink>
          </li>
          <li>
            <NavLink to="/student-info" activeClassName="faculty-active">Info</NavLink>
          </li>
        </ul>
      </div>
      <div className="faculty-main-content">
        {totalHiring !== null && (
          <div className="faculty-hiring-count">
            Placed students: {totalHiring} out of {totalCount}
          </div>
        )}
        

<table className="company-drives-table">
  <thead>
    <tr>
      <th>Company Name</th>
      <th>Hired</th>
      <th>Know More</th> {/* New column for the "Know More" link */}
    </tr>
  </thead>
  <tbody>
    {companyDrives.map((drive, index) => (
      <tr key={index}>
        <td>{drive.name}</td>
        <td>{drive.hired}</td>
        <td>
          <Link to="/students-placed">Know More</Link> {/* Link to the "/placed-students" page */}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}
