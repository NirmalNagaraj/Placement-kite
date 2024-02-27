import React, { useState } from 'react';
import { TextField } from '@mui/material';

function InputPass({ label, value, onChange }) {
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    validatePassword(newValue);
  };

  const validatePassword = (password) => {
    const trimmedPassword = password.trim();
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(trimmedPassword)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      type="password"
      value={value}
      onChange={handleChange}
      required
      error={error}
      helperText={error ? 'Password must be at least 8 characters with one special character and one number' : ''}
      className='field'
    />
  );
}

export default InputPass;
