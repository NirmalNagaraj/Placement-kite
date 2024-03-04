import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
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

        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.response);
      }
    };

    fetchUserDetails();
  }, []);

  const renderUserDetails = () => {
    return (
      <div>
        {Object.entries(userDetails).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <ul>
              {Object.entries(value).map(([subKey, subValue]) => (
                <li key={subKey}><strong>{subKey}:</strong> {subValue}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>User Details</h1>
      <a href='/offerLetter'>Upload Documents</a>
      {userDetails ? renderUserDetails() : <p>Loading...</p>}
    </div>
  );
};

export default UserDetails;
