import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between items-center">
          
          {/* Logo & Copyright */}
          <div className="mb-4">
            <Link to="/" className="text-xl font-bold text-white">EduPlatform</Link>
            <p className="text-sm mt-1">© {new Date().getFullYear()} EduPlatform. All Rights Reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-blue-600" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
