import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

function Testimonials() {
  return (
    <div className='pb-14 px-6 md:px-12 lg:px-20'>
      <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 text-center'>Testimonials</h2>
      <p className='text-sm md:text-base mt-2 text-gray-500 text-center'>
        Hear from our learners as they share their journeys of transformation, success, and how our
        platform has made a difference in their lives.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className='bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center'>
            <img className='h-16 w-16 rounded-full object-cover' src={testimonial.image} alt={testimonial.name} />
            <div className='mt-4'>
              <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
              <p className='text-gray-600'>{testimonial.role}</p>
            </div>
            <div className='mt-4 flex justify-center'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className='h-5 w-5'
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt='star'
                />
              ))}
            </div>
            <p className='text-gray-500 mt-4'>{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
