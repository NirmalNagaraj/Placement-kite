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
import Recruit from './Recuiter';


export default function App()  {
  return (
    <><Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/report" element={<ReportPage />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
          <Route exact path="/dashboard/upcoming" element={<UpcomingPage />}/>
          <Route exact path="/previous" element={<PreviousPage />}/>
          <Route exact path="/add-company" element={<CompanyForm />}/>
          <Route exact path="/recruiter" element={<Recruit />}/>
          <Route  path="*" element={`<h1>404 - Page Not Found</h1>`} />
        </Routes>
      </div>
    </Router></>
  );
};


