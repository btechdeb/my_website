import React from 'react'
import { Link } from 'react-router-dom'

const AdmTopNav = () => {
    return (
      <nav className="topnav">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/addAsset">Add asset</Link></li>
          <li><Link to="/admin/genRep">Asset Report</Link></li>
          <li><Link to="/admin/chAdmin">Change Admin</Link></li>        
          <li><Link to="/admin/profile">Profile</Link></li>
        </ul>
      </nav>
    );
  };

export default AdmTopNav
