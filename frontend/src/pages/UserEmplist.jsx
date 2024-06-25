import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UserEmplist.css'; // Import the CSS file

const TopNav = () => {
  return (
    <nav className="topnav">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="logo" />
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  );
};

const UserEmpList = () => {
  const [employees, setEmployees] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/emplist')
      .then(response => {
        const data = response.data.data;
        console.log(data)
        setEmployees(data);

        if (data.length > 0) {
          setHeaders(Object.keys(data[0]));
        }
      })
      .catch(error => {
        console.error("There was an error fetching the employee list!", error);
      });
  }, []);

  return (
    <div className="user-emp-list">
      <TopNav />
      <div className="container">
        <h2>Employee List</h2>
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                {headers.map((header, index) => (
                  <td key={index}>{employee[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserEmpList;
