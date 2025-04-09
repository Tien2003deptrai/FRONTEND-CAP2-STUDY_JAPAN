const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-4">
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

            <img
                src={
                    course.thumbnail ||
                    'https://placehold.co/600x400?text=Course+Thumbnail'
                }
                alt={course.name}
                className="w-full h-40 object-cover object-center"
            />

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
