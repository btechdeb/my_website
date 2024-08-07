import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../css/LoginPage.css"; // Import CSS module

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('API URL:', "http://localhost:3000");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      const data = response.data;
      console.log(data.success);
      const user = data.user;
      console.log(user["Role"])
      if (data.success) {
        if (user["Role"] === 'user') {
          navigate('/user/dashboard', { state: { user: data.user } });
        } else if (user["Role"] === 'admin') {
          navigate('/admin/dashboard', { state: { user: data.user } });
        } else if (user["Role"] === 'supervisor') {
          navigate('/supervisor/dashboard', { state: { user: data.user } });
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      alert('Please login to continue');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="loginPage">
      <div className="leftContainer">
        <h2 className="instructionsHeading">Instructions</h2>
        <p className="instructionsText">Welcome to the Asset Manager HomePage, please login to continue or in case you have forgotten your password you can click on Forgot Password. <br/> You can login as a user, admin or a supervisor according to the role which has been assigned to you.</p>
      </div>
      <div className="separator"></div>
      <div className="rightContainer">
        <div className="loginContainer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_UshaMartin.png" alt="Logo" className="loginLogo" />
          <h2 className="heading">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="formGroup">
              <label className="label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label className="label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input"
                
              />
            </div>
            {error && <p className="errorMessage">{error}</p>}
            <button type="submit" className="button">Login</button>
            {/* <a href="/forgot-password" className="link">Forgot Password?</a> */}
            {/* <Link to='/changePass' className='link'>Change Password?</Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
