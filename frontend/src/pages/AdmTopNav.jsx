import React from 'react'
import { Link } from 'react-router-dom';
import "../css/topnav.css"
const TopNav = ({ employeeData }) => {
    console.log('TopNav employeeData:', employeeData);
    return (
      <nav className="topnav bg-color-#f67126">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
        <ul>
          <li><Link to="/admin/dashboard" state={employeeData}>Dashboard</Link></li>
          <li><Link to="/admin/employee" state={employeeData}>Employee</Link></li>
          <li><Link to="/admin/assets" state={employeeData}>Assets</Link></li>
          <li>
            <Link 
              to="/admin/profile" state={employeeData}
            >
              Profile
            </Link>
          </li>
         <li><Link to="/admin/aboutus" state={employeeData}>About us</Link></li>
         <li><Link to="/" style={{ backgroundColor: 'white', color: 'red', padding: '10px', borderRadius: '5px' }}>Logout</Link></li>
        </ul>
      </nav>
    );
  };

export default TopNav