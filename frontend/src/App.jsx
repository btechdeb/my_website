import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login  from './pages/Login'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import UserEmpList from './pages/UserEmplist'
import Profile from './pages/Profile'
import Debtonu from './pages/Debtonu'
import Rajdeep from './pages/Rajdeep'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/user/dashboard/*' element={<UserDashboard/>}/>
      <Route path='/admin/dashboard/*' element={<AdminDashboard/>}/>
      <Route path='/user/emplist' element={<UserEmpList/>}/>
      <Route path='/user/dashboard/profile' element={<Profile />}/>
      <Route path='/debtonu' element={<Debtonu/>}/>
      <Route path='/rajdeep' element={<Rajdeep/>}/>
    </Routes>
  )
}

export default App
