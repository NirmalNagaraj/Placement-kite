import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput'; // Assuming OTPInput is in the same directory
import './Otp.css';

const OTPVerificationPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      // Send a request to your backend to generate and send OTP via Twilio
      await axios.post('http://localhost:3000/send-otp', { mobileNumber });
      setOTPSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send a request to your backend to verify the OTP
      const response = await axios.post('http://localhost:3000/verify-otp', { mobileNumber, otp });
      if (response.status === 200) {
        navigate('/change');
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className='otp-container'>
      <div>
        <h2>OTP Verification</h2>
        {!otpSent ? (
          <div className='sendotp-div'>
            <label>Enter Mobile Number:</label>
            <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className='sendOtp-int'/>
            <button onClick={handleSendOTP}>Send OTP</button>
          </div>
        ) : (
          <div>
            <label>Enter OTP:</label>
            <OTPInput setOTP={setOTP} />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerificationPage;
