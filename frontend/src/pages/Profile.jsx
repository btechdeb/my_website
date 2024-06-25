import React from 'react';
import { Link } from 'react-router-dom';
import "../css/topnav.css"
import "../css/Profile.css"
const TopNav = () => {
  return (
    <nav className="topnav">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

const Profile = () => {
  return (
    <div className="profile-page">
      <TopNav />
      <div className="container">
        <h2>User Profiles</h2>
        <ul>
          <li><Link to="/debtonu">Debtonu</Link></li>
          <li><Link to="/rajdeep">Rajdeep</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
