import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import { assets } from '../../assets/assets';

function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
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
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChapter = (action, chapterId) => {
    if (action === 'Add') {
      const title = prompt('Enter chapter title');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLectureChange = (action, chapterId, lectureIndex) => {
    if (action === 'Add') {
      setShowPopup(true);
      setCurrentChapterId(chapterId);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(),
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent[chapter.chapterContent.length - 1].lectureOrder + 1
                : 1,
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
      lectureAudio: '',
    });
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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Add Course</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Course Description</label>
          <div className="bg-gray-800 rounded-md">
            <div ref={editorRef} className="min-h-[200px]"></div>
          </div>
        </div>

        {/* Course Price and Thumbnail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course Price ($)</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter price"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
              <div className="p-3 bg-blue-600 rounded-md hover:bg-blue-700 transition">
                <img src={assets.file_upload_icon} alt="Upload" className="w-6 h-6" />
              </div>
              <input
                type="file"
                id="thumbnailImage"
                onChange={handleImageUpload}
                accept="image/*"
                hidden
              />
              {image && (
                <img src={image} alt="Thumbnail Preview" className="w-16 h-16 object-cover rounded-md" />
              )}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* Chapters */}
        <div className="space-y-4">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className="bg-gray-800 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={assets.dropdown_icon}
                    alt="Toggle"
                    className={`w-5 h-5 cursor-pointer transition-transform ${
                      chapter.collapsed ? '-rotate-90' : ''
                    }`}
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                  />
                  <span className="font-medium">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    {chapter.chapterContent.length} Lectures
                  </span>
                  <img
                    src={assets.cross_icon}
                    alt="Delete"
                    className="w-5 h-5 cursor-pointer hover:opacity-80"
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                  />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="mt-4 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                      <div>
                        <span className="block font-medium">
                          {lectureIndex + 1}. {lecture.lectureTitle}
                        </span>
                        <span className="text-sm text-gray-400">
                          {lecture.lectureDuration} mins •{' '}
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            Link
                          </a>{' '}
                          • {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                        </span>
                      </div>
                      <img
                        src={assets.cross_icon}
                        alt="Delete"
                        className="w-5 h-5 cursor-pointer hover:opacity-80"
                        onClick={() => handleLectureChange('remove', chapter.chapterId, lectureIndex)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="w-full text-blue-500 hover:text-blue-400 transition"
                    onClick={() => handleLectureChange('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full text-blue-500 hover:text-blue-400 transition"
            onClick={() => handleChapter('Add', null)}
          >
            + Add Chapter
          </button>
        </div>

        {/* Lecture Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Lecture</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lecture Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Lecture Title"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({ ...prev, lectureTitle: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Duration"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({ ...prev, lectureDuration: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lecture URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Lecture URL"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({ ...prev, lectureUrl: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({ ...prev, isPreviewFree: e.target.checked }))
                    }
                  />
                  <label className="text-sm">Is Preview Free?</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  onClick={addLecture}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;