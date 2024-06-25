// Import necessary libraries
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import '../css/topnav.css'
import Profile from './Profile';

// Define the TopNav component
const TopNav = () => {
  return (
    <nav className="topnav bg-color-#f67126">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};


const Dashboard = () => <div>Dashboard Content</div>;
//const Profile = () => <div>Profile Content</div>;
const Settings = () => <div>Settings Content</div>;

// Define the UserDashboard component
const UserDashboard = () => {
  return (
    
      <div className="user-dashboard">
        <TopNav />
        
      </div>
   
  );
};

export default UserDashboard;
