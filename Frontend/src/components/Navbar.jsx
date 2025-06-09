import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();  
    console.log("Searching for:", searchTerm);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#D8A7B1] text-[#4E342E] shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">Booksy</a>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 w-full max-w-[750px]  ">
          {/* Search Bar — your original full-width style */}
          <form onSubmit={handleSearch} className="flex-1 hidden md:flex justify-center  w-full pr-30  pb-2 mr-30 ">
            <input 
              type="text"
              placeholder="Search Books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 rounded-md border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-[#D7CCC8]"
            />
          </form>

          {/* Links */}
          {!user ? (
            <>
              <a href="/signin" className="hover:text-[#FFE5EC]">SignIn</a>
              <a href="/signup" className="hover:text-[#FFE5EC]">SignUp</a>
            </>
          ) : (
            <div className="relative group">
              <button className="hover:text-[#FFE5EC]">Profile</button>
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-md hidden group-hover:block z-10">
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">My Profile</a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-[#D7CCC8]"
            />
          </form>
          {!user ? (
            <>
              <a href="/signin" className="block hover:text-[#FFE5EC]">SignIn</a>
              <a href="/signup" className="block hover:text-[#FFE5EC]">SignUp</a>
            </>
          ) : (
            <>
              <a href="/profile" className="block hover:text-[#FFE5EC]">My Profile</a>
              <button
                onClick={handleLogout}
                className="block text-left text-red-600 hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
