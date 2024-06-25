import React, { useState } from 'react';
import axios from 'axios';
//import '../App.css' // Assuming your CSS file is in the same directory or adjust the path accordingly

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/auth/login', {
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      });
      if (response.status === 200) {
        setMessage('Login successful!');
        // You can redirect the user or handle login success here
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Company Logo" style={{ marginBottom: '20px' }} />
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="username" style={{ marginBottom: '5px', display: 'block' }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="password" style={{ marginBottom: '5px', display: 'block' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#f67126', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
