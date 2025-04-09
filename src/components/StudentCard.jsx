const StudentCard = ({ student, onViewDetail, onViewCourses }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
            <div className="flex items-center mb-4">
                <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h3 className="font-medium text-gray-800">
                        {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">{student.email}</p>
                </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>Trình độ: {student.learningLevel}</p>
                <p>Tiến độ: {student.progress}%</p>
                <p>
                    Trạng thái:{' '}
                    <span
                        className={`capitalize font-semibold ${student.status === 'active' ? 'text-green-600' : 'text-red-500'}`}
                    >
                        {student.status}
                    </span>
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onViewDetail}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 text-sm rounded hover:bg-blue-200"
                >
                    Xem chi tiết
                </button>
                <button
                    onClick={onViewCourses}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                >
                    Khóa học
                </button>
            </div>
        </div>
    )
}

export default StudentCard
