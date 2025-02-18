import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";

function MyEnrollments() {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
  ]);

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-6 bg-gray-100">
      <h1 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">My Enrollments</h1>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-600 text-center">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 md:p-6 shadow-md rounded-lg">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-blue-600 text-white text-xs md:text-sm">
                <th className="px-3 py-2 md:px-4 md:py-3 text-left">Course</th>
                <th className="px-3 py-2 md:px-4 md:py-3 text-left">Duration</th>
                <th className="px-3 py-2 md:px-4 md:py-3 text-left">Completed</th>
                <th className="px-3 py-2 md:px-4 md:py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition text-xs md:text-sm"
                >
                  {/* Course Details - Mobile Optimized */}
                  <td className="px-3 py-3 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-60 h-30 object-cover rounded-lg shadow-md"
                      onError={(e) => (e.target.src = "/images/default-thumbnail.jpg")}
                    />
                    <div className="text-center md:text-left">
                      <p className="font-semibold text-gray-800">{course.courseTitle}</p>
                      <Line
                        strokeWidth={4}
                        percent={
                          progressArray[index]
                            ? (progressArray[index].lectureCompleted * 100) /
                              progressArray[index].totalLectures
                            : 0
                        }
                        className="bg-gray-300 rounded-full"
                      />
                      <p className="text-xs text-gray-500">{course.instructor}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-700 text-center md:text-left">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-3 py-3 text-gray-700 text-center md:text-left">
                    <span className="font-medium">
                      {progressArray[index] &&
                        `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}
                    </span>{" "}
                    <span className="text-xs text-gray-500">Lectures</span>
                  </td>
                  <td className="px-3 py-3 text-center md:text-left">
                    <button
                      onClick={() => navigate("/player/" + course._id)}
                      className="text-green-700 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-md border border-green-500 hover:bg-green-600 hover:text-white transition"
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted / progressArray[index].totalLectures ===
                        1
                        ? "Completed"
                        : "On Going"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyEnrollments;
