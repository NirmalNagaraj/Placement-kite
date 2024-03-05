import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import CSS file for styling
import {
  AccountCircle as AccountCircleIcon,
  Percent as PercentIcon,
  DateRange as DateRangeIcon,
  Computer as ComputerIcon,
  RequestPage as RequestPageIcon,
  CorporateFare as CorporateFareIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import LogoutButton from '../../Logout';
import KiteLogo from '../../images/kite_logo.png'

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function Dashboard() {
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [upcomingData, setUpcomingData] = useState([]);
  const [userMarks10th, setUserMarks10th] = useState(null);
  const [userMarks12th, setUserMarks12th] = useState(null);
  const [userAggregatePercentage, setUserAggregatePercentage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/verify-user', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        console.log(response);
        setVerifiedUser(response.data.verified);

        if (response.data.verified) {
          // Fetch dashboard data only if the user is verified
          const dashboardResponse = await axios.get('http://localhost:3000/dashboard', {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          });

          console.log(dashboardResponse);
          setDashboardData(dashboardResponse.data);
          setUserMarks10th(dashboardResponse.data.user.marks10th);
          setUserMarks12th(dashboardResponse.data.user.marks12th);
          setUserAggregatePercentage(dashboardResponse.data.user.aggregatePercentage);

          // Fetch upcoming data only if the user is verified
          const upcomingResponse = await axios.get('http://localhost:3000/upcoming', {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          });

          console.log(upcomingResponse);
          setUpcomingData(upcomingResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.response);
      }
    };

    fetchData();
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

  if (!verifiedUser) {
    return (
      <div className="dashboard-con">
        <h1>Looks like you haven't competed your profile!</h1>
        <button><a href='/userDetails'>Setup Profile</a></button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {dashboardData ? (
      <div>
        <div className='nav'>
          {/* <h2 className="dashboard-title">K</h2> */}
          <img src={KiteLogo} alt="logo" height={80}/>
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
              <a href="/Details">Details</a>
            </div>
              <LogoutButton />
          </div>
          <div className="user-info">
            <div className='user-details'>
                
                <div className='Name'><h1>Welcome <span>{dashboardData.user.name}</span> !</h1></div>
               
            </div> 

            <h2 className="upcoming-title">Upcoming Company</h2>
            <div className="upcoming-list"> 
                {filteredUpcomingData.map(company => (
                  <div key={company.id} className="company-card">
                    <div className='p'><CorporateFareIcon fontSize='large'  className='icon-color'/><h3 className="h3">{company.name}</h3></div>
                    <div className='p'><DateRangeIcon className='icon-color'/><p>{formatDate(company.date)}</p></div>
                    <div className='p'><RequestPageIcon className='icon-color'/><p>{company.ctc}</p></div>
                    <div className='p'><ComputerIcon className='icon-color'/><p>{company.role}</p></div>
                    <div className='p'><PercentIcon className='icon-color'/><p>{company.criteria}</p></div>
                    <div className='p'><LinkIcon className='icon-color'/><a href={company.link} target='blank'>Apply link</a></div>
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
