import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

function Navbar() {
  const location = useLocation();
  const {navigate} = useContext(AppContext)
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* Logo */}
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-5 text-gray-500">
        {isSignedIn && (
          <>
            <button className="hover:text-gray-700">Become Educator</button>
            <Link to="/my-enrollments" className="hover:text-gray-700">
              My Enrollments
            </Link>
            {/* Profile Icon (Visible When Signed In) */}
            <UserButton />
          </>
        )}
        {!isSignedIn && (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3 text-gray-500">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <button className="hover:text-gray-700">Become Educator</button>
            <Link to="/my-enrollments" className="hover:text-gray-700">
              My Enrollments
            </Link>
            <button
              onClick={() => openSignIn()}
              className="text-blue-600 px-3 py-2 rounded-full cursor-pointer"
            >
              <img src={assets.user_icon} alt="User Icon" className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
