import './App.css'
import React from 'react'
import {UserProvider} from './contexts/UserProvider'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import User from './pages/User'
import Promotion from './pages/Promotion'
import Analytics from './pages/Analytics'
import { RequireAuth } from './requireAuth'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/contexts/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<RequireAuth><Promotion/></RequireAuth>}/> 
            <Route path='/analytics' element={<RequireAuth><Analytics/></RequireAuth>}/> 
            <Route path='/me' element={<RequireAuth><User/></RequireAuth>}/>
            
            <Route path='/login' element={<Login />}/>
          </Routes> 
          <Toaster/>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
