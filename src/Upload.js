import React, { useState } from 'react';
import axios from 'axios';


function UploadButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.c === 'main') {
        console.log('Data:', response.data.r);
        alert('File uploaded successfully!');
      } else {
        console.error('Unexpected response:', response.data);
        alert('An error occurred while uploading the file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file');
    }
  };

  return (
    <div className='upload'>
      <div className='up-file'>
        <input type="file" onChange={handleFileChange} accept=".csv" id="file-input"/>
        <label for="file-input"> Choose file</label>
      </div>
      <div className='upBtn'>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadButton;