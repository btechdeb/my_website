import React from 'react'
import { Link } from 'react-router-dom';
import '../css/adminDashboard.css'

import '../css/topnav.css'
const TopNav = ({ employeeData }) => {
    console.log('TopNav employeeData:', employeeData);
    const user = employeeData.user;
    const role = user["Role"];
    return (
      <nav className="navbar">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
            <div className="dropdown">
                <span className="dropbtn">UITC - Asset Manager - More</span>
                <div className="dropdown-content">
                    <Link to={`/${role}/aboutus`} state={employeeData}>About Us</Link>
                    <Link to="/contact-us">Contact Us</Link>
                    <Link to={`/${role}/changePass`} state={employeeData}>Change Password</Link>
                </div>
            </div>
            <ul className="nav-links">
                <li><Link to={`/${role}/dashboard`} state={employeeData}>Dashboard</Link></li>
                {role === 'admin' && (<li><Link to="/admin/employee" state={employeeData}>Employee</Link></li>)}
                {role !== 'user' && (role === 'supervisor' ?
                    (<li><Link to={`/${role}/employee`} state={employeeData}>Assets</Link></li>) :
                    (<li><Link to={`/${role}/assets`} state={employeeData}>Assets</Link></li>)
                )}
                {role === 'admin' && (<li><Link to="/changeAdmin" state={employeeData}>Change Admin</Link></li>)}
                {role !== 'user' && (<li><Link to={`/${role}/activity_logs`} state={employeeData}>Activity Logs</Link></li>)}
                <li><Link to={`/${role}/profile`} state={employeeData}>Profile</Link></li>
                <li><Link to="/" style={{ backgroundColor: 'white', color: 'red', padding: '10px', borderRadius: '5px' }}>Logout</Link></li>
            </ul>
        </nav>

    );
  };

export default TopNav
