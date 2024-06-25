import React from 'react';
import { Link } from 'react-router-dom';
import '../css/userProfile.css'; // Import the CSS file for styling
import profilePic from '../images/Raj.jpg'; // Adjust the path if needed
import '../css/topnav.css'
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
const Rajdeep = () => {
  return (
    <div>
        <TopNav/>
        <div className="profile-container">
        <div className="profile-details">
            <h2>Profile Details</h2>
            <form>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value="Javed Ansari" readOnly />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <textarea readOnly>
                Flat No. 1A, Durgalaya Apartment, Ahirtoli, Ranchi - 834 001
                </textarea>
            </div>
            <div className="form-group">
                <label>Working Since:</label>
                <input type="text" value="January 1, 2020" readOnly /> {/* Dummy data */}
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea readOnly>
                Javed Ansari is a highly valued member of Usha Martin, known for his expertise and dedication. His innovative solutions and strategic thinking have greatly contributed to the success of various projects. Javed's leadership skills and team-oriented approach inspire his colleagues to achieve excellence. His commitment to professional growth and continuous improvement is evident in his work. Javed's contributions have significantly enhanced the operational efficiency and overall performance of the organization.
                </textarea>
            </div>
            </form>
        </div>
        <div className="profile-image">
            <img src={profilePic} alt="Profile" />
            <h3>Mr. Javed Ansari</h3> {/* Name below the image */}
        </div>
        </div>
    </div>
  );
};

export default Rajdeep;
