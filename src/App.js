// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ReportPage from './Components/Faculty/Report';
import Home from './Home';
import Login from './Components/Student/Login';
import Dashboard from './Components/Student/Dashboard';
import CompanyForm from './Components/Faculty/Company';
import UpcomingPage from './Components/Student/Upcoming';
import PreviousPage from './Components/Student/Previous';
import StudentForm from './Components/Faculty/CGPA';
import PdfListPage from './GetPDF';
import './App.css'
import FacultyLogin from './Components/Faculty/FacultyLogin';
import ValidatePass from './Components/Student/ChangepassValidate';
import OTPVerificationPage from './Otp';
import ChangePasswordForm from './Components/Student/ChangePass';
import FacultyDashboard from './Components/Faculty/FacultyDashboard';
import UploadPDF from './UploadPDF';
import PlacementForm from './Components/Faculty/Placed';
import PlacedStudents from './Components/Faculty/StudentPlaced';
import StudentInfoPage from './Components/Faculty/StudentInfo';
import UserDetailsPage from './Components/Student/UserDetails';
import UserDetails from './Components/Student/Details';
import UploadOfferLetter from './Components/Student/OfferLetter';



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
           <Route exact path="/dashboard-faculty" element={<FacultyDashboard />}/>
          <Route exact path="/upcoming" element={<UpcomingPage />}/>
          <Route exact path="/previous" element={<PreviousPage />}/>
          <Route exact path="/add-company" element={<CompanyForm />}/>
          <Route exact path="/cgpa-upload" element={<StudentForm />}/>
           <Route exact path="/pdf" element={<PdfListPage />}/>
          <Route exact path="/validate-change" element={<ValidatePass />}/>
           <Route exact path="/otp" element={<OTPVerificationPage />}/>
           <Route exact path="/change" element={<ChangePasswordForm />}/>
          <Route exact path="/update-company" element={<UploadPDF />}/>
           <Route exact path="/placed" element={<PlacementForm />}/>
           <Route path="/students-placed" element={<PlacedStudents />} />
           <Route path="/student-info" element={<StudentInfoPage />} />
           <Route path="/userDetails" element={<UserDetailsPage />} />
           <Route path="/Details" element={<UserDetails />} />
           <Route path="/offerLetter" element={<UploadOfferLetter />} />
          
          <Route  path="*" element={`<h1>404 - Page Not Found</h1>`} />
        </Routes>
      </div>
    </Router></>
  );
};


