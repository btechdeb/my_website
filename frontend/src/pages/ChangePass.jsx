import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.put('https://localhost:3000/change-password', {
        employeeName,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
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
  );
};

export default ChangePassword;
