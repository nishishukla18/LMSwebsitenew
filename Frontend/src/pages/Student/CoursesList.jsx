import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/Students/SearchBar';
import CourseCard from '../../components/Students/CourseCard';
import Footer from '../../components/Students/Footer';

function CoursesList() {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = React.useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      if (input) {
        const filtered = allCourses.slice();
        setFilteredCourses(
          filtered.filter(
            item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourses(allCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <div className='relative md:px-36 px-8 pt-20 text-left'>
      <div className='flex flex-col items-start space-y-4 justify-between w-full md:flex-row'>
        <div>
          <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
          <p className='text-gray-500'>
            <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>Home </span> / <span>Course List</span>
          </p>
        </div>
        <SearchBar data={input} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
        {filteredCourses.map((course, index) => (
          <div key={index} className='overflow-hidden rounded-lg shadow-md'>
            <CourseCard course={course} />
          </div>
        ))}
      </div>    
    </div>
  );
}

export default CoursesList;