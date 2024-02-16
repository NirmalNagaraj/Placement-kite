import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPass.css'
import Password from './images/Password.png'
import TextField from '@mui/material/TextField';


export default function ResetPass(){
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Regular expression to validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]*[a-zA-Z][a-zA-Z0-9._%+-]*@kgkite\.ac\.in$/;

        // Check if the email matches the specified regular expression pattern
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email');
            return;
        }

        // If email is valid, clear error message
        setErrorMessage('');

        // Process further if needed
        navigate('/PassChange');
        console.log("Valid Email:", email);
    };

    return (
        <div className="center">
            <center className="img1"><img src={Password} alt="password-reset" /></center>
            <p className="para">Reset Your Password</p>
            <hr color="black" />
            <p className="para1">Forgot Your Password</p><br />
            <p className="para2">Please enter the mail address you'd like your password reset information sent to</p><br />
            <form onSubmit={handleSubmit} className='form' action='POST'>
                <TextField
                    fullWidth
                    helperText={errorMessage}
                    error={errorMessage ? true : false}
                    id="demo-helper-text-aligned-no-helper"
                    label="Enter Email"
                    value={email}
                    onChange={handleChange}
                />
                <center><button type='submit' id="rectangle">Request Reset Link</button></center><br />
                <center className="link"><a href="">Back To Login</a></center>
            </form>
        </div>
    );
}