import { TextField } from "@mui/material";
import React from 'react'
import { useState } from "react";

function Reset(){
    const [rollNum, setRollNum] = useState("");
    const [email, setEmail] = useState("");
    const [emailError , setEmailError] = useState("");
    const [error, setError] = useState("");
  
    const handleRollNumChange = (event) => {
      const inputRollNum = event.target.value.trim(); // Remove leading/trailing spaces
      const rollNumRegex = /^7117\d{8}$/; // Regex to match "7117" followed by 8 digits
      setRollNum(inputRollNum);
      if (!rollNumRegex.test(inputRollNum)|| inputRollNum.length !== 12) {
        setError("University Roll Number should start with '7117' and be 12 digits long");
      } else {
        setError("");
      }
    };
    
    const handleEmailChange = (event) => {
        const inputEmail = event.target.value.trim(); // Remove leading/trailing spaces
        const emailRegex = /^\S+@\S+$/; // Regex to match email format (no spaces and contains @)
        setEmail(inputEmail);
        if (!emailRegex.test(inputEmail) || inputEmail.length <= 10) {
          setEmailError("Email must contain '@', be longer than 10 characters, and have no spaces");
        } else {
          setEmailError("");
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        if (rollNum.length === 12 && email.length > 10 && !error) {
          alert("Successful");
        } else {
          alert("Error: Please check your inputs");
        }
      };
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              helperText={error}
              error={Boolean(error)}
              fullWidth
              required
              type='number'
              id="filled-required-old"
              label="UniversityRollNum"
              value={rollNum}
              onChange={handleRollNumChange}
              inputProps={{ maxLength: 12 }} // Restrict input to 12 characters
            />
    
            <TextField
              helperText={emailError}
              error={Boolean(emailError)}
              fullWidth
              required
              type='text'
              id="filled-required-old"
              label="email"
              value={email}
              onChange={handleEmailChange}
            />
            
            <button>Submit</button>

          </form>
        </div>
      );
    }


export default Reset