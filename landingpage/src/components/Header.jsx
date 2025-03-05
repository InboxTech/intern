import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaPlane, FaHotel, FaCar, FaFlag, FaSearchLocation, FaQuestionCircle } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-950 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-400 hover:text-blue-700">
          <img src="/images/Skyscanner Logo.png" alt="Skyscanner Logo" className="w-8 h-7" />
          <span>Skyscanner</span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-blue-600">Flights</a>
          <a href="/" className="text-white hover:text-blue-600">Hotels</a>
          <a href="/" className="text-white hover:text-blue-600">Car Hire</a>
          <a href="/" className="text-white hover:text-blue-600">Deals</a>
        </nav>

         {/* Login / Sign Up + Menu Bar */}
         <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white hover:text-blue-600 cursor-pointer">Login</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 cursor-pointer">Sign Up</Link>
          {/* Menu Bar */}
          <button
            className="p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaBars className="text-white text-2xl" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-16 right-0 w-56 bg-white text-black shadow-lg rounded-xl z-10">
          {/* Top Section */}
          <div className="py-2">
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaPlane className="text-blue-500"/> Flights
            </a>
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaHotel className="text-blue-500" /> Hotels
            </a>
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaCar className="text-blue-500" /> Car hire
            </a>
          </div>

          {/* Divider */}
          <hr className="border-t border-gray-300" />

          {/* Bottom Section */}
          <div className="py-2">
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaFlag /> Regional settings
            </a>
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaSearchLocation className="text-[#0c828b]" /> Explore everywhere
            </a>
            <a href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
              <FaQuestionCircle className="text-[#0c828b]" /> Help
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
