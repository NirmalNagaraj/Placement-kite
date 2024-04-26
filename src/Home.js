// Home.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Home.css';
import kitelogo from '../src/images/kite_logo.png';
import homeimg from '../src/images/home_img.jpg';

function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="logo-container">
          <img src={kitelogo} alt="Logo" className="logo" />
          <h1 className="title">KGiSL INSTITUTE OF TECHNOLOGY</h1>
          <Link to="/faculty" className="admin-link">Admin</Link>
        </div>
      </div>

      {/* Home Content */}
      <div className="home-container">
        <div className="left-content">
          <img src={homeimg} alt="Image" className="image" />
        </div>
        <div className="right-content">
          <h2 className="right-heading">Welcome to our website</h2>
          <Link to="/login">
            <button className="get-started-button">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
