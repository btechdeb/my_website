import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
import '../css/topnav.css';
import Profile from './Profile';
import TopNav from './TopNav';
// Define the TopNav component
// const TopNav = ({ employeeData }) => {
//   console.log('TopNav employeeData:', employeeData);
//   return (
//     <nav className="topnav bg-color-#f67126">
//       <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
//       <ul>
//         <li><Link to="/user/dashboard/*" state={employeeData}>Dashboard</Link></li>
//         <li><Link to="/user/emplist" state={employeeData}>Assets List</Link></li>
//         <li>
//           <Link 
//             to="/user/dashboard/profile" state={employeeData}
//           >
//             Profile
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

const Dashboard = () => <div>Dashboard Content</div>;
const Settings = () => <div>Settings Content</div>;

// Define the UserDashboard component
const UserDashboard = () => {
  const location = useLocation();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  console.log(location);
  console.log("UserDashboard EmployeeData:", employeeData);
  return (
    <div className="user-dashboard">
      <TopNav employeeData={employeeData} />
      <h1 style={{ padding: '60px' }}>Welcome {employeeData.user.employeeName}</h1>
    </div>
  );
};

export default UserDashboard;
