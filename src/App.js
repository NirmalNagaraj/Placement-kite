// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ReportPage from './Report';
import Home from './Home';


export default function App()  {
  return (
    <><Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/report" element={<ReportPage />} />
          <Route exact path="/home" element={<Home />}/>
        </Routes>
      </div>
    </Router></>
  );
};


