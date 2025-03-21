function LessonDetail({ lesson }) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold text-gray-900">{lesson?.lesson_title}</h2>
        <p className="text-gray-500 text-sm">Cập nhật: {lesson?.updatedAt || 'Không có thông tin'}</p>
        <p className="text-gray-700 mt-4">{lesson?.description || 'Không có mô tả cho bài học này.'}</p>
      </div>
    )
  }
  
  export default LessonDetail