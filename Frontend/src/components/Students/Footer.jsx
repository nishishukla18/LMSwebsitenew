import React from 'react';
import { assets } from '../../assets/assets';

function Footer() {
  return (
    <div className='bg-[#000036] w-full text-white py-10 px-6 md:px-12 lg:px-20'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center'>
        <img src={assets.logo_dark} alt='Logo' className='h-12 w-auto mb-4 md:mb-0' />
        <nav className='flex flex-wrap gap-6 text-sm md:text-base'>
          <a href='#' className='hover:text-gray-300 transition'>About</a>
          <a href='#' className='hover:text-gray-300 transition'>Services</a>
          <a href='#' className='hover:text-gray-300 transition'>Contact</a>
          <a href='#' className='hover:text-gray-300 transition'>Privacy Policy</a>
        </nav>
      </div>
      <div className='mt-6 text-center text-gray-400 text-xs md:text-sm'>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
      <div className='mt-2 text-center text-gray-500 text-xs md:text-sm'>
        Designed with ❤️ by Your Company
      </div>
    </div>
  );
}

export default Footer;
