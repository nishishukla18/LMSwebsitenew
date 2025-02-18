import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Students/Loading';

function MyCourses() {
  const [courses, setCourses] = useState(null);
  const { currency, allCourses } = useContext(AppContext);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-3 border border-gray-300">Course</th>
                <th className="p-3 border border-gray-300">Earnings</th>
                <th className="p-3 border border-gray-300">Students</th>
                <th className="p-3 border border-gray-300">Published On</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-100 transition-all">
                  <td className="p-3 flex items-center gap-3 border border-gray-300">
                    <img src={course.courseThumbnail} alt="Course Thumbnail" className="w-16 h-16 object-cover rounded-lg" />
                    <span className="font-medium">{course.courseTitle}</span>
                  </td>
                  <td className="p-3 border border-gray-300">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                      (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="p-3 border border-gray-300">{course.enrolledStudents.length}</td>
                  <td className="p-3 border border-gray-300">{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MyCourses;
