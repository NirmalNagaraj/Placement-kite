// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

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
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {dashboardData ? (
        <div>
          <p>{dashboardData.message}</p>
          <p>User: {dashboardData.user.name}</p>
          <p>University Roll Number: {dashboardData.user.universityRollNumber}</p>
          <p>10th Marks: {dashboardData.user.tenthMarks}%</p>
          <p>12th Marks: {dashboardData.user.twelfthMarks}%</p>
          <p>CGPA: {dashboardData.user.cgpa}%</p>

          {dashboardData.upcomingEvents && dashboardData.upcomingEvents.length > 0 ? (
            <div>
              <h3>Upcoming Events</h3>
              {dashboardData.upcomingEvents.map((event) => (
                <div key={event.id}>
                  <p>Company: {event.name}</p>
                  <p>Date: {event.date}</p>
                  <p>CTC: {event.ctc}</p>
                  <p>Role: {event.role}</p>
                  <p>Criteria: {event.criteria}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
}

export default Dashboard;
