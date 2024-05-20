import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar(){
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Promonade App</div>
        <div className="space-x-4">
          <NavLink to="/" className="text-gray-300 hover:text-white">Home</NavLink>
          <NavLink to="/login" className="text-gray-300 hover:text-white">Login</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
