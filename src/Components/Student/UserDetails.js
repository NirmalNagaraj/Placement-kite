import React, { useState } from 'react';
import './UserDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserDetailsPage = () => {
  const [gender, setGender] = useState('');
  const [branch, setBranch] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [residence, setResidence] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    gender:'',
    branch:'',
    marks10: '',
    marks12OrDiploma: '',
    cgpa: '',
    backlogs: '',
    historyOfArrears: '',
    mobileNumber: '',
    email: '',
    residence: '',
    address: '',
    degree: '',
    yearOfPassing: '',
    educationLevel: '',
    domain: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (event) => {
    const { value } = event.target;
    setGender(value);
    setFormData({
      ...formData,
      gender: value
    });
  };

  const handleBranchChange = (event) => {
    const { value } = event.target;
    setBranch(value);
    setFormData({
      ...formData,
      branch: value
    });
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
    setFormData({
      ...formData,
      educationLevel: event.target.value
    });
  };

  const handleResidenceChange = (event) => {
    setResidence(event.target.value);
    setFormData({
      ...formData,
      residence: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.post('http://localhost:3000/userDetails', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      if (response.status === 200) {
        console.log('User details submitted successfully');
        // Optionally, reset the form here
        navigate('/dashboard');
      }
      console.log(formData);
      
    } catch (error) {
      console.error('Error submitting user details:', error);
    }
  };
  return (
    <div className='main-div'>
      <h4>User Details</h4>
      <form onSubmit={handleSubmit} className="form-container">
        <div className='form-div'>
          <input type="text" placeholder="Name" name="name" onChange={handleInputChange} />
          
          <select value={gender} onChange={handleGenderChange} name="gender" placeholder="Select Gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select value={branch} onChange={handleBranchChange} name="branch" placeholder="Select Branch">
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="CSBS">CSBS</option>
            <option value="AIDS">AIDS</option>
            <option value="MECH">MECH</option>
            <option value="ECE">ECE</option>
          </select>

          <input type="text" placeholder="10th Mark" name="marks10" onChange={handleInputChange} /> 
          <select value={educationLevel} onChange={handleEducationLevelChange} name="educationLevel" placeholder="Select Education Level">
            <option value="">Select Education Level</option>
            <option value="12">12</option>
            <option value="diploma">Diploma</option>
          </select>

          {(educationLevel === '12' || educationLevel === 'diploma') && (
            <input type="text" placeholder={educationLevel === '12' ? "Marks 12" : "Diploma Marks"} name="marks12OrDiploma" onChange={handleInputChange} />
          )}

          <input type="text" placeholder="CGPA" name="cgpa" onChange={handleInputChange} />
          <input type="text" placeholder="Backlogs" name="backlogs" onChange={handleInputChange} />
          <input type="text" placeholder="History of Arrears" name="historyOfArrears" onChange={handleInputChange} />
          <input type="text" placeholder="Mobile Number" name="mobileNumber" onChange={handleInputChange} />
          <input type="text" placeholder="Email" name="email" onChange={handleInputChange} />

          <select value={residence} onChange={handleResidenceChange} name="residence" placeholder="Select Residence">
            <option value="">Select Residence</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Dayscholar">Dayscholar</option>
          </select>

          <input type="text" placeholder="Address" name="address" onChange={handleInputChange} />
          <input type="text" placeholder="Degree" name="degree" onChange={handleInputChange} />
          <input type="text" placeholder="Year of Passing" name="yearOfPassing" onChange={handleInputChange} />
          <input type="text" placeholder="Domain" name="domain" onChange={handleInputChange} />
        </div>
    
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsPage;
