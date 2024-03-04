import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/personal-details', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
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
    <div>
      <h2>User Details</h2>
      {userDetails ? (
        <div>
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
  );
};

export default PersonalDetailsPage;
