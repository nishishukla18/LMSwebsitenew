import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(false);  // ✅ Ensure this is included in value
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    // Fetch user enrolled courses
    const fetchEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    };

    // Simulating educator role (modify as per your logic)
    useEffect(() => {
        const userRole = localStorage.getItem("userRole"); // Example: 'educator' or 'student'
        setIsEducator(userRole === "educator"); // ✅ Ensure it's set properly
        fetchAllCourses();
        fetchEnrolledCourses();
    }, []);

    // Calculate average rating of a course
    const calculateAvgRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        return course.courseRatings.reduce((sum, rating) => sum + rating.rating, 0) / course.courseRatings.length;
    };

    // Calculate total course duration
    const calculateCourseDuration = (course) => {
        let time = course.courseContent.reduce((total, chapter) => {
            return total + chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0);
        }, 0);
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // Calculate number of lectures in a course
    const calculateNoOfLectures = (course) => {
        return course.courseContent.reduce((total, chapter) => {
            return total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0);
        }, 0);
    };

    const value = {
        currency,
        allCourses,
        isEducator, 
        navigate,
        calculateAvgRating,
        calculateCourseDuration,
        calculateNoOfLectures,
        fetchEnrolledCourses,
        enrolledCourses,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
