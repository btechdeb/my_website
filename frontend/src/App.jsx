import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UserEmpList from './pages/UserEmplist'
import Profile from './pages/Profile';
import Assets from './pages/Assets';
import Emplist from './pages/Emplist';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import ChangePassword from './pages/ChangePass';
import ChangeAdmin from './pages/ChangeAdmin';
import ActivityLog from './pages/ActivityLog';
import AboutUs from './pages/AboutUs';
import './css/styles.css'
import SpvsrDashboard from './pages/SpvsrDashboard';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/user/changePass' element={<ChangePassword/>}/>
      <Route path='/admin/changePass' element={<ChangePassword/>}/>
      <Route path='/supervisor/changePass' element={<ChangePassword/>}/>
      <Route path='/changeAdmin' element={<ChangeAdmin/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/assets" element={<Assets />} />
      <Route path="/admin/employee" element={<Emplist />} />
      <Route path='/admin/profile' element={<Profile />}/>
      <Route path="/supervisor/dashboard" element={<SpvsrDashboard />} />
      <Route path='/supervisor/profile' element={<Profile />}/>
      <Route path="/supervisor/employee" element={<UserEmpList />} />
      <Route path='/user/dashboard/*' element={<UserDashboard/>}/>
      <Route path="/admin/activity_logs" element={<ActivityLog />} />
      <Route path="/supervisor/activity_logs" element={<ActivityLog />} />
      {/* <Route path='/user/emplist' element={<UserEmpList/>}/> */}
      <Route path='/user/profile' element={<Profile />}/>
      
      <Route path="/admin/aboutus" element={<AboutUs />} />
      <Route path="/supervisor/aboutus" element={<AboutUs />} />
      <Route path="/user/aboutus" element={<AboutUs />} />
    </Routes>
  )
}

export default App
