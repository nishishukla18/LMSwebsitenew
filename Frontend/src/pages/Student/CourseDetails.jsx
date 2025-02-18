import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import humanizeDuration from "humanize-duration";
import Loading from '../../components/Students/Loading';
import Footer from '../../components/Students/Footer';
import YouTube from 'react-youtube'


function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null)

  const { allCourses, calculateAvgRating, calculateChapterTime, calculateCourseDuration,
    calculateNoOfLectures, currency } = useContext(AppContext);

  useEffect(() => {
    if (allCourses.length > 0) {
      const foundCourse = allCourses.find((course) => course._id === id);
      setCourse(foundCourse || null);
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="relative pt-20 md:pt-30 px-8 md:px-36 text-left">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70 -z-10"></div>

      <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
        {/* Left Section - Course Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold">{course.courseTitle}</h1>
          <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: course.courseDescription?.slice(0, 200) || '' }}></p>

          <div className="flex items-center space-x-2 mt-2">
            <p className="text-sm font-medium">{calculateAvgRating(course).toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateAvgRating(course)) ? assets.star : assets.star_blank} alt="Star" className="w-4 h-4" />
              ))}
            </div>
          </div>

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-lg font-semibold">Course Structure</h2>
            <div className="pt-5">
              {course.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-3 rounded-lg shadow-sm">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="Arrow"
                        className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96 py-3' : 'max-h-0 py-0'}`}>
                    <ul className="space-y-2 px-4">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <img
                            src={assets.play_icon}
                            alt="Play"
                            className="w-4 h-4 cursor-pointer hover:scale-105 transition-transform duration-200"
                          />
                          <div>
                            <p className="text-sm font-medium">{lecture.lectureTitle}</p>
                            <div  className="text-xs text-gray-500 flex items-center space-x-2">
                              {lecture.isPreviewFree && <span onClick={()=>setPlayerData({
                                videoId:lecture.lectureUrl.split('/').pop()
                              })}className="text-green-600 font-semibold">Preview</span>}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Course Info & Enroll */}
        <div className="hidden md:block w-1/3">

        {
         playerData ?
         <YouTube videoId={playerData.videoId} opts={{playerVars:{
           autoplay:1
         }}} iframeClassName='w-full aspect-video'/>
         :
         <img src={course.courseThumbnail} alt="Course Thumbnail" className="shadow-md " />
        }
          
          <div className="py-5 p-4 shadow-md bg-white rounded-lg mt-4">
            <div className="flex items-center gap-2 text-red-500">
                <img src={assets.time_left_clock_icon} alt="Clock" className="w-5 h-5" />
              <p><span className="font-semibold">5 days</span> left at this price!</p>
            </div>
            <div className="mt-3 text-lg font-semibold">
              <p className="text-green-600">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
              <p className="line-through text-gray-500 text-sm">{currency}{course.coursePrice}</p>
              <p className="text-red-600 text-sm font-medium">{course.discount}% off</p>
            </div>
            <div className="flex space-x-4 mt-3">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="Rating" className="w-4 h-4" />
                <p>{calculateAvgRating(course)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="Clock" className="w-4 h-4" />
                <p>{calculateCourseDuration(course)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="Lessons" className="w-4 h-4" />
                <p>{calculateNoOfLectures(course)} lessons</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
            <div className="mt-5 text-sm text-gray-600">
              <p className="font-semibold">What's in the course?</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
      <Footer />
      </div>
      
    </div>
  );
}

export default CourseDetails;
