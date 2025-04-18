import React, { useState } from 'react';
import Logo from '../assets/code&click.png';

import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import {useSearch}  from '../context/SearchContext'



function Navbar() {

  const { searchQuery, setSearchQuery } = useSearch(); 
  
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='flex justify-between items-center px-6 py-4 shadow-md bg-white fixed top-0 left-0 w-full z-50'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2 pl-8'>
        <img 
          src={Logo} 
          alt="DevLogics Logo" 
          className='w-12 h-12 object-contain rounded-lg'
        />
        <span className='font-bold text-lg hidden md:block'>Code&Clicks</span>
      </Link>

      {/* Search + Links */}
      <div className='flex items-center gap-6'>
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-2 w-80 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
          <FaSearch size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>

        {/* Auth Links */}
        {!isAuthenticated ? (
          <div className='flex gap-4 md:gap-6 text-sm font-medium'>
            <Link 
              to="/login" 
              className='px-3 py-1 rounded hover:text-blue-600 hover:bg-blue-50 transition'
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className='px-3 py-1 mr-7 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link 
              to="/create-post"
              className='flex items-center gap-2 hover:text-blue-600'
            >
              <FaUserCircle size={20} />
              <span className='hidden md:inline'>Create Post</span>
            </Link>
            <div className='pr-8'>
              <button 
              onClick={handleLogout}
              className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition'
            >
              Logout
            </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;