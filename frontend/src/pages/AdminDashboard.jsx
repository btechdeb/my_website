import React from 'react';
import { Link } from 'react-router-dom';
import '../css/adminDashboard.css'; // Import the CSS file

const TopNav = () => {
  return (
    <nav className="topnav">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/profile">Profile</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
        <li><Link to="/admin/emp">Employee</Link></li>
        <li><Link to="/admin/addAsset">Add asset</Link></li>
        <li><Link to="/admin/genRep">Generate Report</Link></li>
      </ul>
    </nav>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <TopNav />
      <div className="dashboard-section">
        <div className="dashboard-item">
          <h3>Total Assets</h3>
          <p>0</p>
        </div>
        <div className="dashboard-item">
          <h3>Total Assigned Assets</h3>
          <p>0</p>
        </div>
        <div className="dashboard-item">
          <h3>Total Unassigned Assets</h3>
          <p>0</p>
        </div>
        <div className="dashboard-item">
          <h3>Total Employees</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
