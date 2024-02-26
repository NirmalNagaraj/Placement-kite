import React from 'react';
import './CGPA.css'
import UploadButton from '../../Upload';

function StudentForm() {
  return (
    <div>
      <div className='instruction-section'>
        <h1 className='file-title'>Upload CSV File</h1>
        <div className='instruction'>
          <h1>Note!!</h1>
          <ul className='imp-list'>
            <li>The Column name of the CSV file must be "University Roll Number" and "Aggregate %"</li>
            <li>The Register number should be 12 number</li>
            <li>The cgpa should contain 2 decimal points max !!</li>
          </ul>  
        </div>  
      </div> 

      <UploadButton/>
    </div>
    
  );
}

export default StudentForm;