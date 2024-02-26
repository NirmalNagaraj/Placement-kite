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
            <li>The Column name of the CSV file must be "University Roll Num" and "Aggregate %"</li>
            <li>The Register number should be must be 12 number</li>
            <li>The cgpa if 6 it should be enter as "6.0" !!</li>
          </ul>  
        </div>  
      </div> 

      <UploadButton/>
    </div>
    
  );
}

export default StudentForm;
