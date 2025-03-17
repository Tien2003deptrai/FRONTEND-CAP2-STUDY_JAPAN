import React from "react";

const CourseCard = ({ course }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 relative border-2 border-red-600">
        <img src={course.image} alt={course.title} className="w-full h-52 object-cover rounded-t-xl" />
        <div className="p-6 bg-red-50">
          <h2 className="text-2xl font-bold text-red-700">{course.title}</h2>
          <p className="text-gray-700 mt-3">{course.description}</p>
          {course.isAvailable ? (
            <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              🎯 Vào học
            </button>
          ) : (
            <span className="mt-6 block text-gray-500 text-center font-semibold">⏳ Khoá học chưa khả dụng</span>
          )}
        </div>
        {course.isAvailable && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Đã mở đăng ký
          </span>
        )}
      </div>
    );
  };
  

export default CourseCard;