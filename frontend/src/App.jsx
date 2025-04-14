import React from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import ProtectedRoute from './component/ProtectedRoute'
import Dashboard from './pages/Dashboard'



function App() {
  return (
   <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Signup />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Signin />} />

      <Route path='/dashboard'
      element={
        <ProtectedRoute>
         <Dashboard/>
        </ProtectedRoute>
      }
      />

    </Routes>
     
   </>
  )
}

export default App