import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import logo from '../../assets/logo-png.png';

export const Navbar = () => {
  const [menuDraw, setMenuDraw] = useState(false);

  return (
    <nav className="navbar flex items-center justify-between px-10 py-4 bg-gray-100">
      <Link to="/" className="text-2xl font-semibold">
      <img src={logo} alt="Logo" className="h-10 mr-4"/>
        HPASS RENTALS
      </Link>
      <form className="flex items-center">
        <input 
          type="text"
          placeholder="Search items..."
          className="border border-gray-400 py-2 px-4 rounded-l-lg focus:outline-none"
        />
        <button type="button" className="text-white bg-black py-2 px-4 rounded-r-lg">
          <FaSearch/>
        </button>
      </form>
      <div className="md:hidden">
        <button
          className="block text-gray-800 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          onClick={() => setMenuDraw(!menuDraw)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuDraw ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <div className={`md:flex flex-col md:flex-row md:items-center md:w-auto w-full ${menuDraw ? 'block' : 'hidden'}`}>
        <ul className="md:flex flex-col md:flex-row md:ml-auto md:mr-0 items-center">
          <li>
            <Link to="/" className="md:ml-4 text-lg font-bold">Home</Link>
          </li>
          <li>
            <a href="#about" className="md:ml-4 text-lg font-bold">About</a>
          </li>
          <li>
            <a href="#services" className="md:ml-4 text-lg font-bold">Services</a>
          </li>
          <li>
            <a href="#contact" className="md:ml-4 text-lg font-bold">Contact</a>
          </li>
          <li>
            <Link to="/sign-up" className="md:ml-4 text-lg font-bold">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
