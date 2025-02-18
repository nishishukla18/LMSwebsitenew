import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />
      </Link>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <p className="text-sm lg:text-base">Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? (
          <UserButton />
        ) : (
          <img className="w-8 h-8 rounded-full border" src={assets.profile_img} alt="Profile" />
        )}
      </div>
    </div>
  );
}

export default Navbar;
