import React from 'react';
import Logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Font Awesome


function Navbar() {
   const navigate = useNavigate()

   const isAuthenticated = localStorage.getItem('token')
  const handleLogout = () =>{
   localStorage.removeItem('token')
   navigate('/login')
  }
  return (
    <div className='flex justify-between items-center px-6 py-4 shadow-md bg-white'>
      {/* Logo */}
      <div className='w-12 h-12'>
        <img src={Logo} alt="DevLogics Logo" className='w-full h-full object-contain rounded-lg' />
      </div>

      {/* Search + Links */}
      <div className='flex items-center gap-6'>
        {/* Search bar */}
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-80 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
      <FaSearch size={18} className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="w-full outline-none"
      />
    </div>

        {/* Auth Links */}
        {!isAuthenticated ?  
          (<div className='flex gap-6 text-sm font-medium'>
          <Link to="/login" className='hover:text-blue-600'>Login</Link>
          <Link to="/signup" className='hover:text-blue-600'>Create Account</Link>
        </div>)
        : (
          <button onClick={handleLogout}>Logout</button>
        )
      }

      </div>
    </div>
  );
}

export default Navbar;
