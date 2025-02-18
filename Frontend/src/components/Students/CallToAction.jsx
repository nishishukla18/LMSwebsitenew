import React from 'react';
import { assets } from '../../assets/assets';

function CallToAction() {
  return (
    <div className='py-14 px-6 md:px-12 lg:px-20 text-center bg-gray-100 rounded-lg '>
      <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>Learn anything, anytime, anywhere</h2>
      <p className='text-sm md:text-base mt-2 text-gray-500 max-w-2xl mx-auto'>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className='flex justify-center gap-6 mt-6'>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition'>
          Get started
        </button>
        <button className='flex items-center gap-2 text-blue-600 text-lg font-medium hover:text-blue-800 transition '>
          Learn more <img src={assets.arrow_icon} alt='arrow' className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
