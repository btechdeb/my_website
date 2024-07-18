import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import axios from 'axios';

const ChangePass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  const [employeeName, setEmployeeName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/change-password', {
        employeeName,
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <>
      <TopNav employeeData={employeeData} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Change Password</h2>
        <div style={{ margin: '10px 0' }}>
          <label>Employee Name: </label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Current Password: </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>New Password: </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button onClick={handleChangePassword} style={{ backgroundColor: '#f67126', color: 'white', padding: '10px 20px' }}>
          Change Password
        </button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default ChangePass;
