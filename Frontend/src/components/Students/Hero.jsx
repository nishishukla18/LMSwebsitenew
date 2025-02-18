import React from 'react'
import { assets } from '../../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col justify-center w-full items-center md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-4xl text-2xl  relative  font-medium text-gray-800 mx-3xl mx-auto'>Empower your future with the courses <br></br>desgined to <span className='text-blue-600'>fit your choice.</span><img src={assets.sketch} className='md:block hidden absolute -bottom-7 right-0' alt="" /> </h1>
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>We bring together world-class instructors to help you achieve your professional goals.</p>
      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>We bring together world-class instructors to help you achieve your professional goals.</p>
      <p></p>
      
    </div>
  )
}

export default Hero