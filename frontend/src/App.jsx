import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login  from './pages/login'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import UserEmpList from './pages/UserEmplist'
import Profile from './pages/Profile'
import Debtonu from './pages/Debtonu'
import Rajdeep from './pages/Rajdeep'
const App = () => {
  return (
    <Routes>
      <Route path='/user/dashboard/*' element={<UserDashboard/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/user/emplist' element={<UserEmpList/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/debtonu' element={<Debtonu/>}/>
      <Route path='/rajdeep' element={<Rajdeep/>}/>
    </Routes>
  )
}

export default App
