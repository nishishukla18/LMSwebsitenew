// import React, { useContext } from 'react'
// import { AppContext } from '../../context/AppContext'
// import CourseCard from './CourseCard'
// import { Link } from 'react-router-dom'

// function CoursesSection() {
//   const {allCourses} = useContext(AppContext)
//   return (
//     <div className='py-16 md:px-40 px-8'>
//     <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
//     <p className='text-sm md:text-base mt-3 text-gray-500'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>
    
//     <div className='grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4'>{allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course}/>)}</div>
//     <Link to={'/course-list'} classname="text-gray-500 border border-gray-500/30 px-10 py-3 rounded" onClick={()=>scrollTo(0,0)}>Show all courses</Link>
//    </div>
//   )
// }

// export default CoursesSection

import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom'

function CoursesSection() {
  const {allCourses} = useContext(AppContext)
  return (
    <div className='py-12 px-6 md:px-16 lg:px-40'>
      <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base mt-2 text-gray-500'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
        {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course}/>)}
      </div>
      
      <div className='mt-6 text-center'>
        <Link to={'/course-list'} className="text-gray-600 border border-gray-400 px-6 py-2 rounded-lg inline-block hover:bg-gray-100 transition" onClick={()=>scrollTo(0,0)}>Show all courses</Link>
      </div>
    </div>
  )
}

export default CoursesSection