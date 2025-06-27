import { useState } from "react";
import React from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { Link } from "react-scroll";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 lg:px-16 py-8 lg:py-12 text-white z-50">
      {/* Logo */}
      <div>
        <img src="/assets/MEETSUITE-LOGO-2-1.png" alt="Fts" className="w-32 md:w-60 pl-2 md:pl-16 " />
      </div>

      {/* Desktop Navigation (Only visible on large screens) */}
      <ul className="hidden lg:flex space-x-14 items-center pr-2 md:pr-16">
      <li><a href="/" className="hover:text-[#BE965B] hover:scale-105 transition duration-100">HOME</a></li>
<li>
          <Link to="services" smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-[#BE965B] hover:scale-105 transition duration-300">SERVICES</Link>
        </li>
        {/* <li>
          <Link to="blog" smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-[#BE965B] hover:scale-105 transition duration-300">BLOGS</Link>
        </li> */}
        <li>
          <Link to="contact" smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-[#BE965B] hover:scale-105 transition duration-300">CONTACT US</Link>
        </li>
       
      </ul>

      {/* Mobile & Tablet Menu Button (Hidden on lg screens) */}
      <button 
        className="lg:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile & Tablet Menu (Appears on md and below) */}
      <div
        className={`absolute top-20 md:top-28 left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center py-6 space-y-6 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <a
          href="/"
          className="hover:text-[#BE965B] text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>
        <Link
          to="services"
          smooth={true}
          duration={500}
          offset={-80}
          className="cursor-pointer hover:text-[#BE965B] text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>
          {/* <Link
            to="blog"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer hover:text-[#BE965B] text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link> */}
        <Link
          to="contact"
          smooth={true}
          duration={500}
          offset={-80}
          className="cursor-pointer hover:text-[#BE965B] text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      
      
      </div>
    </nav>
  );
}
