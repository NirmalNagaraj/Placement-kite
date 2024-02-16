import React from 'react'
import './Home.css'


export default function Home(){
  return (
    <div><header className="header">
    {/* <img src={KiteLogo} className="img" alt="logo"/> */}
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-items">STUDENTS</li>
        <li className="nav-items">RECRUITERS</li>
        <li className="nav-items">FACULTY</li>
      </ul>
    </nav>
    <div className="btns">
        <button className="log-btn">Login</button>
        <button className="sign-btn">SignUp</button>
    </div>
  </header>
  <div className="body">
    {/* <img src={Interview} className="img2" alt="image"/> */}
    <div className="intro">
        <div className="description">
          <h1 className="head1">Connect,</h1>
          <h2 className="head2">Explore,</h2>
          <h3 className="head3">Excel...</h3>
        </div>
        <div className="desc-para">
          <p>Your Gateway to Career Opportunities.</p>
          <button className="sign-btn">SignUp Now</button>
        </div>
    </div>
  </div>
  <div className="foot-body">
    <h1>Access to more Oppourtunities</h1>
    <p>Get access to jobs and internships, verified by your college.</p>
    <button className="getstart-btn">Get Started</button>
  </div>
  </div>  )
}