import React from 'react';
import { Link } from 'react-router-dom';
import '../css/userProfile.css'; // Import the CSS file for styling
import profilePic from '../images/Ayush.jpg'; // Adjust the path if needed
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
const Debtonu = () => {
  return (
    <div>
        <TopNav/>
        <div className="profile-container">
        <div className="profile-details">
            <h2>Profile Details</h2>
            <form>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value="Tupac Kukkur" readOnly />
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
                Tupac Kukkur has been a cornerstone at Usha Martin, showcasing exceptional dedication and expertise in his role. His innovative approach and relentless pursuit of excellence have significantly contributed to the company's growth and success. Tupac's ability to lead projects with precision and inspire his colleagues is a testament to his remarkable leadership skills. His commitment to quality and continuous improvement has driven numerous initiatives, resulting in enhanced operational efficiency. Tupac's valuable contributions continue to make a lasting impact, solidifying his reputation as an indispensable member of the Usha Martin family.
                </textarea>
            </div>
            </form>
        </div>
        <div className="profile-image">
            <img src={profilePic} alt="Profile" />
            <h3>Mr. Tupac Kukkur</h3>
        </div>
        </div>
    </div>
  );
};

export default Debtonu;
