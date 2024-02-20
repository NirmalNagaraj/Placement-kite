import React from 'react'
import './FacultyLogin.css'
import TextField from '@mui/material/TextField';


function FacultyLogin(){
  return (
    <div className='container'>
        <div className='left'>
            <h1>Left</h1>
        </div>
        <div className='right'>
            <div className='form-group'>
                <h1>Faculty Login</h1>
                <form>
                <TextField
                helperText=""
                fullWidth
                required
                type='text'
                id="filled-required-old"
                label="User name"
                />

                <TextField
                            helperText=""
                            fullWidth
                            required
                            type='password'
                            id="filled-required-old"
                            label="Enter password"
                           
                />

                <button type='submit' className='logBtn'>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FacultyLogin