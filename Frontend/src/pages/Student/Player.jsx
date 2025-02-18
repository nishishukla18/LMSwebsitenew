import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube"; // Import YouTube player package

function Player() {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  // Fetch course data based on courseId
  useEffect(() => {
    const foundCourse = enrolledCourses.find((course) => course._id === courseId);
    if (foundCourse) setCourse(foundCourse);
  }, [enrolledCourses, courseId]);

  // Toggle the chapter sections
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4 sm:p-10 flex flex-col md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Left Column - Course Structure */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-4">Course Structure</h2>

        <div className="pt-5">
          {course && course.courseContent ? (
            course.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-3 rounded-lg shadow-sm">
                {/* Chapter Header */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      alt="Arrow"
                      className={`w-4 h-4 transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                {/* Chapter Lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? "max-h-96 py-3" : "max-h-0 py-0"
                  }`}
                >
                  <ul className="space-y-2 px-4">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-center justify-between space-x-3 py-2 border-b last:border-none">
                        <div className="flex items-center space-x-3">
                          <img
                            src={lecture.completed ? assets.blue_tick_icon : assets.play_icon}
                            alt="Play"
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="text-sm font-medium">{lecture.lectureTitle}</p>
                            <p className="text-xs text-gray-500">
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                units: ["h", "m"],
                              })}
                            </p>
                          </div>
                        </div>

                        {lecture.lectureUrl && (
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            onClick={() =>
                              setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })
                            }
                          >
                            Watch
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Loading course details...</p>
          )}
        </div>
         <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this Course:</h1>
          </div> 
      </div>

     {/* Right Column - YouTube Video Player */}
     <div className="bg-gray-200 rounded-lg p-6 text-center md:mt-10">
  {playerData ? (
    <div>
      <YouTube 
        videoId={new URL(playerData.lectureUrl).pathname.split("/").pop()} 
        iframeClassName='w-full aspect-video'
      />
      <div className="mt-4 text-left">
        <p className="text-lg font-semibold text-gray-800">
          {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
        </p>
        <button 
          className="mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          {false?'Completed':'Mark Complete'}
        </button>
      </div>
    </div>
  ) : (
    <img 
      src={course ? course.courseThumbnail : ""} 
      alt="Course Thumbnail" 
      className="w-full h-auto rounded-lg shadow-md"
    />
  )}
</div>


  </div>
  );
}

export default Player;
