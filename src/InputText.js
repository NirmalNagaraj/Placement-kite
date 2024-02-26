import React, { useState } from 'react';
import { TextField } from '@mui/material';

function InputText({ label, type }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const maxLength = type === 'text' ? 30 : Infinity; // Set max length to 30 for type 'text'

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > maxLength) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={inputValue}
      onChange={handleChange}
      error={error}
      helperText={error ? `Input should not exceed ${maxLength} characters` : ''}
      className='field'
    />
  );
}

export default InputText;