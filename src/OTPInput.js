import React, { useState, useRef } from 'react';

const OTPInput = ({ setOTP }) => {
  const [otp, setLocalOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setLocalOTP(newOTP);
    setOTP(newOTP.join('')); // Concatenate OTP digits and set it as the OTP state

    if (index < otp.length - 1 && e.target.value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="otp-input"
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
