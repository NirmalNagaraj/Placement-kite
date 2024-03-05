import React, { useState } from 'react';
import './GpaCalculator.css';

function GpaCalculator(){
  const subjects = ['DS','DS Lab','DPCO','FDS','FDS Lab','OOPS','OOPS Lab','PD','DM'];
  const [subjectCredits, setSubjectCredits] = useState({});
  const [subjectGrades, setSubjectGrades] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleAddSubject = (subject) => {
    setSelectedSubjects([...selectedSubjects, subject]);
    setSubjectCredits({ ...subjectCredits, [subject]: 0 });
    setSubjectGrades({ ...subjectGrades, [subject]: 0 });
  };

  const handleCreditChange = (subject, credits) => {
    setSubjectCredits({ ...subjectCredits, [subject]: parseFloat(credits) });
  };

  const handleGradeChange = (subject, grade) => {
    setSubjectGrades({ ...subjectGrades, [subject]: parseFloat(grade) });
  };

  const handleCalculate = () => {
    const totalGradePoints = selectedSubjects.reduce((total, subject) => total + (subjectCredits[subject] * subjectGrades[subject]), 0);
    const totalCredits = selectedSubjects.reduce((total, subject) => total + subjectCredits[subject], 0);
    const gpa = totalGradePoints / totalCredits;
    alert(`Your GPA is: ${gpa.toFixed(2)}`);
  };

  return (
    <div className="cgpa-container">
      <h1>GPA Calculator</h1>
      <div className="input-section">
        <label className='select-label'>Select Subject:</label>
        <select
          className='select-tag'
          value=""
          onChange={(e) => handleAddSubject(e.target.value)}
        >
          <option value="" disabled>Select Subject</option>
          {subjects.map((subject, index) => (
            <option value={subject} key={index}>{subject}</option>
          ))}
        </select>
      </div>
      {selectedSubjects.map((subject, index) => (
        <div key={index} className="subject-section">
          <div className="input-section">
            <label>{subject} Credits:</label>
            <select
              className='select-tag'
              value={subjectCredits[subject]}
              onChange={(e) => handleCreditChange(subject, parseFloat(e.target.value))}
            >
              <option value="0">Select Credits</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="input-section">
            <label>{subject} Grade:</label>
            <select
              className='select-tag'
              value={subjectGrades[subject]}
              onChange={(e) => handleGradeChange(subject, e.target.value)}
            >
              <option value="11">Select Grade</option>
              <option value="10">O</option>
              <option value="9">A+</option>
              <option value="8">A</option>
              <option value="7">B+</option>
              <option value="6">B</option>
              <option value="5">C</option>
              <option value="0">UA</option>
            </select>
          </div>
        </div>
      ))}
      <button className='calculateBtn' onClick={handleCalculate}>Calculate Total GPA</button>
    </div>
  );
};

export default GpaCalculator;
