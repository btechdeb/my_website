import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import '../css/ChangeAdmin.css';

const ChangeAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  console.log(employeeData);
  const user = employeeData.user;
  const [currentAdmin, setCurrentAdmin] = useState({ employeeName: '', password: '' });
  const [newAdmin, setNewAdmin] = useState({ employeeName: '', password: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e, setUser) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verify current admin credentials
      const adminResponse = await axios.post('http://localhost:3000/verify_user', {
        employeeName: currentAdmin.employeeName,
        password: currentAdmin.password,
      });

      if (!adminResponse.data.isAdmin) {
        setMessage('Current admin credentials are incorrect');
        return;
      }

      // Verify new admin credentials
      const userResponse = await axios.post('http://localhost:3000/verify_user', {
        employeeName: newAdmin.employeeName,
        password: newAdmin.password,
      });

      if (userResponse.data.isAdmin) {
        setMessage('The new admin is already an admin');
        return;
      }

      // Change roles
      await axios.post('http://localhost:3000/change_roles', {
        currentAdmin: currentAdmin.employeeName,
        newAdmin: newAdmin.employeeName,
      });

      setMessage('Admin changed successfully');
      navigate('/');
    } catch (error) {
      console.error('Error changing admin:', error);
      setMessage('Error changing admin');
    }
  };

  return (
    <>
      <TopNav employeeData={employeeData}/>
      <div className="change-admin-container">
        <h2>Change Admin</h2>
        <form onSubmit={handleSubmit} className="change-admin-form">
          <div className="form-section">
            <h3>Current Admin Credentials</h3>
            <label>
              Employee Name:
              <input
                type="text"
                name="employeeName"
                value={currentAdmin.employeeName}
                onChange={(e) => handleInputChange(e, setCurrentAdmin)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={currentAdmin.password}
                onChange={(e) => handleInputChange(e, setCurrentAdmin)}
                required
              />
            </label>
          </div>

          <div className="form-section">
            <h3>New Admin Credentials</h3>
            <label>
              Employee Name:
              <input
                type="text"
                name="employeeName"
                value={newAdmin.employeeName}
                onChange={(e) => handleInputChange(e, setNewAdmin)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={(e) => handleInputChange(e, setNewAdmin)}
                required
              />
            </label>
          </div>

          <button type="submit">Change Admin</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default ChangeAdmin;
