import React, { useState } from 'react';
import './PassChange.css';
import TextField from '@mui/material/TextField';

export default function PassChange() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleConfirmPasswordChange = (event) => {
        const { value } = event.target;
        setConfirmPassword(value);

        // Check if passwords match
        if (newPassword !== value) {
            setErrorText("Passwords do not match");
        } else {
            setErrorText("");
        }
    };

    const validatePassword = (value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value) && !/\s/.test(value); // Check for spaces
    };

    const handleBlur = (value) => {
        if (!validatePassword(value)) {
            setErrorText("Password must be at least 8 characters long, contain at least one alphabet, one number, one symbol, and should not contain spaces");
        } else {
            setErrorText("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if passwords match and meet validation criteria
        if (newPassword !== confirmPassword || !validatePassword(newPassword)) {
            alert("Password change unsuccessful. Please check the password fields.");
        } else {
            alert("Password changed successfully!");
        }
    };

    return (
        <div className="center-1">
            <p className="pswrd">Change Password</p><br />
            <p className="para-9">Type and Confirm a secure password for your account</p><br />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            helperText=""
                            fullWidth
                            required
                            type='password'
                            id="filled-required-old"
                            label="Enter old password"
                            className='passInt'
                            value={oldPassword}
                            onChange={(event) => setOldPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            helperText={errorText}
                            fullWidth
                            required
                            type='password'
                            id="filled-required-new"
                            label="Enter new password"
                            className='passInt'
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            onBlur={(event) => handleBlur(event.target.value)}
                            error={errorText !== ''}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            helperText={errorText}
                            fullWidth
                            required
                            type='password'
                            id="filled-required-confirm"
                            label="Re-Enter new password"
                            className='passInt'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onBlur={(event) => handleBlur(event.target.value)}
                            error={errorText !== ''}
                        />
                    </div>
                    <center>
                        <button id="rectangle" type="submit" className="req">Reset Password</button>
                    </center>
                </form>
            </div>
        </div>
    );
}


