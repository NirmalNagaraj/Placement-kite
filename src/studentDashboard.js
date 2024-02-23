import React from 'react'
import './studentDashboard.css'

export default function Studentdash () {
  return (
    <>
    <div className="header">
    <header >
        <a href="#" className="logo"
        >Kite..!</a>
       <nav className="navbar">
        <a href="#dashboard">Dashboard</a>
        <a href="#edit">Edit</a>
        <a href="#upcoming">Upcoming</a>
        <a href='#previous'>Previous</a>
      </nav> 
    </header>
    </div>
    <div className="side-container">
        <a href="#dashboard">Dashboard"</a>
        <a href="#edit">Edit</a>
        <a href="#upcoming">Upcoming</a>
        <a href='#previous'>Previous</a>
    </div>
    </>
  )
}
