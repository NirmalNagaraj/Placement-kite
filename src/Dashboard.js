// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import CSS file for styling
import LogoutButton from './Logout';


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [upcomingData, setUpcomingData] = useState([]);
  const [userMarks10th, setUserMarks10th] = useState(null);
  const [userMarks12th, setUserMarks12th] = useState(null);
  const [userAggregatePercentage, setUserAggregatePercentage] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/dashboard', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        console.log(response);
        setDashboardData(response.data);
        setUserMarks10th(response.data.user.marks10th);
        setUserMarks12th(response.data.user.marks12th);
        setUserAggregatePercentage(response.data.user.aggregatePercentage);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response);
      }
    };

    const fetchUpcomingData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upcoming');
        console.log(response);
        setUpcomingData(response.data);
      } catch (error) {
        console.error('Error fetching upcoming data:', error.response);
      }
    };

    fetchDashboardData();
    fetchUpcomingData();
  }, []);

  // Filter upcoming data based on user's eligibility criteria or common criteria
  const filteredUpcomingData = upcomingData.filter(company => {
    if (company.criteria === 'common') {
      return true; // Always show common criteria
    } else {
      const companyCriteria = parseFloat(company.criteria);
      // Check if user satisfies the criteria based on marks and aggregate percentage
      if (companyCriteria === 60) {
        return userMarks10th >= 60 && userMarks12th >= 60 && userAggregatePercentage >= 6;
      } else if (companyCriteria === 80) {
        return userMarks10th >= 80 && userMarks12th >= 80 && userAggregatePercentage >= 8;
      } else {
        return true; // Include other criteria
      }
    }
  });

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2> 
      {dashboardData ? (
        <div className="user-info"> 
          <p>{dashboardData.message}</p>
          <p>User: {dashboardData.user.name}</p>
          <p>University Roll Number: {dashboardData.user.universityRollNumber}</p>
          <p>Email: {dashboardData.user.email}</p>
          <p>Marks - 10th: {dashboardData.user.marks10th}</p>
          <p>Marks - 12th: {dashboardData.user.marks12th}</p>
          <p>Aggregate %: {dashboardData.user.aggregatePercentage}</p>
          <LogoutButton />
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}

      <h2 className="upcoming-title">Upcoming Company Data</h2>
      <div className="upcoming-list"> 
        {filteredUpcomingData.map(company => (
          <div key={company.id} className="company-card">
            <h3>{company.name}</h3>
            <p>Date: {formatDate(company.date)}</p>
            <p>CTC: {company.ctc}</p>
            <p>Role: {company.role}</p>
            <p>Criteria: {company.criteria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
