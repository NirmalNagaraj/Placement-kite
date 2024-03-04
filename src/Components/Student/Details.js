import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Detail.css'
import LogoutButton from '../../Logout';
import KiteLogo from '../../images/kite_logo.png'

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/personal-details', {
          headers: {
            Authorization: token ? `Bearer ${token}`: '',
          },
        });
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error.response);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="user-details">
      <div>
        <div className='nav'>
          <img src={KiteLogo} alt="logo" height={80}/>
        </div>
        <div className='section'>
          <div className='left-nav'>
            <div className='dash-items'>
              <a href="https://heartfelt-valkyrie-d1bafe.netlify.app/"><button>Edit Resume</button></a>
              <a href="/previous">Previous Company</a>
              <a href="/validate-change">Change Password</a>
              <a href="/dashboard">Dashboard</a>
            </div>
            <LogoutButton />
          </div>
          <div className="user-info">
            {userDetails ? (
              <div className='profile-setup'>
                <p>Register Number: {userDetails.RegisterNumber}</p>
                <p>Name: {userDetails.Name}</p>
                <p>Gender: {userDetails.Gender}</p>
                <p>Branch: {userDetails.Branch}</p>
                <p>10th Marks: {userDetails.Marks10}</p>
                <p>Mode of Study: {userDetails.ModeOfStudy}</p>
                <p>12th Marks or Diploma: {userDetails.Marks12orDiploma}</p>
                <p>CGPA: {userDetails.CGPA}</p>
                <p>Backlogs: {userDetails.Backlogs}</p>
                <p>History of Arrears: {userDetails.HistoryOfArrears}</p>
                <p>Mobile Number: {userDetails.MobileNumber}</p>
                <p>Email: {userDetails.Email}</p>
                <p>Residence: {userDetails.Residence}</p>
                <p>Address: {userDetails.Address}</p>
                <p>Degree: {userDetails.Degree}</p>
                <p>Year of Passing: {userDetails.YearOfPassing}</p>
                <p>Domain: {userDetails.Domain}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
