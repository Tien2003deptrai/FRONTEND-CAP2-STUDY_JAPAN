const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <img
                src={
                    course.thumb ||
                    'https://media.istockphoto.com/id/1298277940/vector/learn-japanese-language-isometric-concept-with-open-laptop-books-headphones-and-tea.jpg?s=612x612&w=0&k=20&c=RchsXoccKQFLHf6bmJiSx1fXX1JvX1l-uRPhiBxum4E='
                }
                alt={course.name}
                className="w-full h-40 object-cover object-center mb-4"
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                        'https://media.istockphoto.com/id/1298277940/vector/learn-japanese-language-isometric-concept-with-open-laptop-books-headphones-and-tea.jpg?s=612x612&w=0&k=20&c=RchsXoccKQFLHf6bmJiSx1fXX1JvX1l-uRPhiBxum4E='
                }}
            />

            <div className="flex justify-between items-center px-4">
                <h2 className="font-medium text-gray-800">{course.name}</h2>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${
                        course.status === 'active'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-pink-100 text-pink-800'
                    }`}
                >
                    Private
                </span>
            </div>

            <div className="flex items-center justify-between gap-2 p-4">
                <div>
                    <p className="text-xs text-gray-500">Giáo viên</p>
                    <p className="text-sm">{course.author || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Số lượng</p>
                    <p className="text-sm">
                        {course.enrolledStudents.length || 0}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                    {[...Array(Math.min(3, course.students?.length || 0))].map(
                        (_, i) => (
                            <img
                                key={i}
                                src={`/api/placeholder/${24 + i}/${24 + i}`}
                                alt="Student"
                                className="w-6 h-6 rounded-full border border-white"
                            />
                        )
                    )}
                    {course.students?.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                            +{course.students.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
