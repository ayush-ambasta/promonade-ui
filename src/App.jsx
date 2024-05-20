import { useState } from 'react'
import './App.css'
import React from 'react'
import {UserProvider} from './contexts/UserProvider'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import User from './pages/User'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <UserProvider>
    
        
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/user' element={<User/>}/>
        </Routes>
    </UserProvider>
  )
}

export default App
