
import React from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

function CourseCard({course}) {
  const {currency,calculateAvgRating} = useContext(AppContext)
  return (
   <Link to={'/course/'+course._id} onClick={()=>scrollTo(0,0)} className="border border-gray-300 pb-6 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all">
    <img className='w-full h-40 object-cover' src={course.courseThumbnail} alt="Course Thumbnail" />
    <div className='p-3 text-left'>
      <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
      <p className='text-gray-500 text-sm'>{course.educator.name}</p>
      <div className='flex items-center space-x-2 mt-2'>
        <p className='text-sm font-medium'>{calculateAvgRating(course)}</p>
        <div className='flex'>{[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(calculateAvgRating(course))?assets.star:assets.star_blank} alt='Star' className='w-3 h-3'/>))}</div>
        <p className='text-gray-500 text-sm'>{course.courseRatings.length}</p>
      </div>
      <p className='text-base font-semibold text-gray-600 mt-2'>{currency}{(course.coursePrice-course.discount*course.coursePrice/100).toFixed(2)}</p>
    </div>
   </Link>
  )
}

export default CourseCard