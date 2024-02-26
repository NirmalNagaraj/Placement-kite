import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import CSS file for styling
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MailIcon from '@mui/icons-material/Mail';
import PercentIcon from '@mui/icons-material/Percent';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BadgeIcon from '@mui/icons-material/Badge';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ComputerIcon from '@mui/icons-material/Computer';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LinkIcon from '@mui/icons-material/Link';
import LogoutButton from './Logout';
import kite_logo from './images/kite_logo.png'

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
      {dashboardData ? (
      <div>
        <div className='nav'>
          {/* <h2 className="dashboard-title">K</h2> */}
          <img src={kite_logo} alt="logo" className='logo-kite'></img>
          <div className='profile'>
          <AccountCircleIcon /><p className='nav-user-name'>{dashboardData.user.name}</p>
          </div>
        </div>
        <div className='section'>
          <div className='left-nav'>
            <div className='dash-items'>
              <a href="https://heartfelt-valkyrie-d1bafe.netlify.app/"><button>Edit Resume</button></a>
              <a href="/previous">Previous Company</a>
              <a href="/validate-change">Change Password</a>
            </div>
              <LogoutButton />
            </div>
          <div className="user-info">
            <div className='user-details'>
                <p className='personal-title'>{dashboardData.message}</p><hr/>
                <div className='p '><BadgeIcon className='icon-color'/><p>{dashboardData.user.name}</p></div>
                <div className='p'><HowToRegIcon className='icon-color'/><p>{dashboardData.user.universityRollNumber}</p></div>
                <div className='p'><MailIcon className='icon-color'/><p>{dashboardData.user.email}</p></div>
                <div className='p'><SummarizeIcon className='icon-color'/><p>{dashboardData.user.marks10th}</p></div>
                <div className='p'><SummarizeIcon className='icon-color'/><p>{dashboardData.user.marks12th}</p></div>
                <div className='p'><PercentIcon className='icon-color'/><p>{dashboardData.user.aggregatePercentage}</p></div>
            </div> 

            <h2 className="upcoming-title">Upcoming Company</h2>
            <div className="upcoming-list"> 
                {filteredUpcomingData.map(company => (
                  <div key={company.id} className="company-card">
                    <div className='p'><CorporateFareIcon fontSize='large'  className='icon-color'/><h3 class="h3">{company.name}</h3></div>
                    <div className='p'><DateRangeIcon className='icon-color'/><p>{formatDate(company.date)}</p></div>
                    <div className='p'><RequestPageIcon className='icon-color'/><p>{company.ctc}</p></div>
                    <div className='p'><ComputerIcon className='icon-color'/><p>{company.role}</p></div>
                    <div className='p'><PercentIcon className='icon-color'/><p>{company.criteria}</p></div>
                    <div className='p'><LinkIcon className='icon-color'/><a href=''>Link</a></div>
                  </div>
                ))}
            </div>  
          </div>
        </div>
        
        </div>
      ) : (
        <p>Unauthorized...</p>
      )}

      
    </div>
  );
}

export default Dashboard;
