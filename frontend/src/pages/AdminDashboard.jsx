import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/adminDashboard.css';
import TopNav from './TopNav'; // Assuming TopNav.jsx is in the same directory


const AdminDashboard = () => {
  const location = useLocation();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  console.log("Admin EmployeeData:", employeeData)
  const user = employeeData.user;
  const [dashboardData, setDashboardData] = useState({
    totalAssets: 0,
    totalAssignedAssets: 542,
    totalUnassignedAssets: 0,
    totalEmployees: 0
  });
  const [error, setError] = useState(null);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('http://localhost:3000/api/dashboard-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      }
    }

    fetchDashboardData();
    
  }, []);

  
  return (
    <div className="admin-dashboard">
      <TopNav employeeData={employeeData} />
      <h1 style={{ padding: '150px 0 0 150px', fontSize: '1.25em' }}>Welcome {user["Employee Name"]}. You have <span style={{ color: "Green"}}>{capitalizeFirstLetter(user["Role"])}</span> level access</h1>
      
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="dashboard-section">
          <div className="dashboard-item">
            <h3>Total Assets</h3>
            <p id="total-assets">{dashboardData.totalAssets}</p>
          </div>
          <div className="dashboard-item">
            <h3>Total Assigned Assets</h3>
            <p id="total-assigned-assets">{dashboardData.totalAssignedAssets}</p>
          </div>
          <div className="dashboard-item">
            <h3>Total Unassigned Assets</h3>
            <p id="total-unassigned-assets">{dashboardData.totalUnassignedAssets}</p>
          </div>
          <div className="dashboard-item">
            <h3>Total Employees</h3>
            <p id="total-employees">{dashboardData.totalEmployees}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
