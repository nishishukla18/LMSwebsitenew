import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import { assets } from '../../assets/assets';

function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
    lectureAudio: '',
  });

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write course description...',
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { chapterTitle: `Chapter ${chapters.length + 1}`, chapterContent: [] }]);
  };

  const handleLectureChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLectureDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      courseTitle,
      coursePrice,
      discount,
      image,
      description: quillRef.current.root.innerHTML, // Getting Quill content
      chapters,
    });
    alert('Course added successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-lg w-full max-w-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Add Course</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Course Title */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Course Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
              placeholder="Enter course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>

          {/* Course Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Course Price ($)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter price"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Discount (%)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          {/* Course Image */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md cursor-pointer file:bg-blue-600 file:text-white file:px-4 file:py-1 file:rounded-md file:border-none file:hover:bg-blue-700"
            />
            {image && (
              <img src={image} alt="Course Preview" className="mt-3 w-full h-40 object-cover rounded-md shadow-md" />
            )}
          </div>

          {/* Course Description (Quill Editor) */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Course Description</label>
            <div className="border border-gray-600 rounded-md p-2 bg-gray-900">
              <div ref={editorRef} className="min-h-[150px] text-white"></div>
            </div>
          </div>

          {/* Lecture Details */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Lecture URL</label>
            <input
              type="text"
              name="lectureUrl"
              value={lectureDetails.lectureUrl}
              onChange={handleLectureChange}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              placeholder="Enter lecture URL"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Lecture Free Preview</label>
            <input
              type="checkbox"
              name="isPreviewFree"
              checked={lectureDetails.isPreviewFree}
              onChange={handleLectureChange}
              className="mr-2"
            />
            <span className="text-gray-300">Is this lecture free?</span>
          </div>
          <button type="button" onClick={handleAddChapter} className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700">
            Add Chapter
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
