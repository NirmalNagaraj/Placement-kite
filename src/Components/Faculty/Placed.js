import React, { useState } from 'react';

function PlacementForm() {
  const [companyName, setCompanyName] = useState('');
  const [numStudents, setNumStudents] = useState(0);
  const [studentNames, setStudentNames] = useState([]);

  const handleInputChange = (event) => {
    setNumStudents(parseInt(event.target.value) || 0);
  };

  const handleStudentNameChange = (index, event) => {
    const newStudentNames = [...studentNames];
    newStudentNames[index] = event.target.value;
    setStudentNames(newStudentNames);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Company Name:', companyName);
    console.log('Number of Students:', numStudents);
    console.log('Student Names:', studentNames);
    // Add code to submit the form data
  };

  // Update studentNames array when numStudents changes
  React.useEffect(() => {
    setStudentNames(Array.from({ length: numStudents }, (_, i) => ''));
  }, [numStudents]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Number of Students:
        <input
          type="number"
          value={numStudents}
          onChange={handleInputChange}
          min={0}
          required
        />
      </label>
      <br />
      {studentNames.map((name, index) => (
        <div key={index}>
          <label>
            Student {index + 1} Name:
            <input
              type="text"
              value={name}
              onChange={(e) => handleStudentNameChange(index, e)}
              required
            />
          </label>
          <br />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default PlacementForm;
