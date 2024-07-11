import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import '../css/topnav.css'
const TopNav = ({ employeeData }) => {
    console.log('TopNav employeeData:', employeeData);
    const role = employeeData.user.role
    return (
      <nav className="topnav bg-color-#f67126">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
        <ul>
          <li><Link to={`/${role}/dashboard`} state={employeeData} >Dashboard</Link></li>
          {role === 'admin' && (<li><Link to="/admin/employee" state={employeeData}>Employee</Link></li>)}
          {role !== 'user' && (
          <li><Link to={`/${role}/employee`} state={employeeData}>Assets </Link></li>
        )}
          
          <li>
            <Link 
              to={`/${role}/profile`} state={employeeData}
            >
              Profile
            </Link>
          </li>
          <li><Link to={`/${role}/aboutus`} state={employeeData}>About us</Link></li>
          <li><Link to="/" style={{ backgroundColor: 'white', color: 'red', padding: '10px', borderRadius: '5px' }}>Logout</Link></li>
        </ul>
      </nav>
    );
  };

export default TopNav
