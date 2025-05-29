import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { FaMapMarkerAlt } from "react-icons/fa";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#222] text-white text-sm relative" id="contact" name="contact">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/assets/world.png')" }}>
        <div className="absolute inset-0 bg-[#222] opacity-80"></div>
      </div>

      <div className="relative max-w-7xl text-center mx-auto px-6 py-10 grid grid-cols-1 gap-8 border-b border-gray-600">
        {/* Logo & Contact */}
        <div className='flex flex-col text-center items-center'>
          <img src="/assets/MEETSUITE-LOGO-2-slogan.png" alt="FTS Logo" className="mb-4 h-[15rem] mix-blend-screen" /> 
          <ul className="space-y-2 flex flex-col items-center">
            {/* <li className="flex gap-2">
              <FaPhoneAlt className="text-sm" /> +94 77 629 4923
            </li> */}
            <li className="flex justify-center items-center gap-2">
              <FaEnvelope className="text-sm" /> info@meetsuite.io
            </li>
            
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative flex flex-col md:flex-row justify-between items-center px-6 py-4 max-w-7xl mx-auto text-gray-300">
        <div className="mb-2 md:mb-0">© 2025 All Rights Reserved.</div>
        <div className="flex items-center gap-4">
          <span className="font-medium">Follow us</span>
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaFacebook className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;