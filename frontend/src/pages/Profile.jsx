import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/Profile.css';
import TopNav from './TopNav';

const Profile = () => {
  const location = useLocation();
  const employeeData = location.state || {};
  const defaultProfileImage = "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"; // Default placeholder image

  console.log('Profile location:', location);
  console.log('Profile employeeData:', employeeData);
  const user = employeeData.user;
  return (
    <div>
      <TopNav employeeData={employeeData} />
      <div className="profile">
        <img 
          src={user["Profile Image"] || defaultProfileImage} 
          alt={`${user["Employee Name"]}'s profile`} 
        />
        <p><strong>Location Name:</strong> {user["Location Name"]}</p>
        <p><strong>Plant:</strong> {user["Plant"]}</p>
        <p><strong>Department:</strong> {user["Department"]}</p>
        <p><strong>Domain ID:</strong> {user["Domain ID"]}</p>
        <p><strong>Phone Number:</strong> {user["PH_NO"]}</p>
        <p><strong>Role:</strong> {user["Role"]}</p>
      </div>
    </div>
  );
};

export default Profile;