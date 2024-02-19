import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard () {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard');
        console.log(response);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
          <p>User: {dashboardData.user}</p>
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
};

export default Dashboard;
