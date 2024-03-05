
import React, { useState } from 'react';
import { TextField } from '@mui/material';

function InputNumber({ label, value, onChange }) {
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
    if (newValue === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      required
      error={error}
      helperText={error ? 'CTC cannot be zero' : ''}
      className='field'
    />
  );
}

export default InputNumber;
