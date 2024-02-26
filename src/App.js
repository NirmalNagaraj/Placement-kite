// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ReportPage from './Report';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import CompanyForm from './Company';
import UpcomingPage from './Upcoming';
import PreviousPage from './Previous';
import StudentForm from './CGPA';
import PdfListPage from './GetPDF';
import './App.css'
import FacultyLogin from './FacultyLogin';
import ValidatePass from './ChangepassValidate';
import OTPVerificationPage from './Otp';
import ChangePasswordForm from './ChangePass';


export default function App()  {
  return (
    <><Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/report" element={<ReportPage />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
          <Route exact path="/faculty" element={<FacultyLogin />}/>
          <Route exact path="/upcoming" element={<UpcomingPage />}/>
          <Route exact path="/previous" element={<PreviousPage />}/>
          <Route exact path="/add-company" element={<CompanyForm />}/>
          <Route exact path="/cgpa" element={<StudentForm />}/>
           <Route exact path="/pdf" element={<PdfListPage />}/>
          <Route exact path="/validate-change" element={<ValidatePass />}/>
           <Route exact path="/otp" element={<OTPVerificationPage />}/>
           <Route exact path="/change" element={<ChangePasswordForm />}/>
          

          <Route  path="*" element={`<h1>404 - Page Not Found</h1>`} />
        </Routes>
      </div>
    </Router></>
  );
};


