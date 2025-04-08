import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course }) => {
    const navigate = useNavigate()

    return (
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                <img
                    src={course.thumb}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-red-500 transition">
                    {course.name}
                </h2>
                <p className="text-sm text-gray-500">
                    👩‍🏫 Tác giả:{' '}
                    <span className="font-medium">{course.author}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>📘 {course.type}</span>
                    <span>👥 {course.stu_num} học viên</span>
                </div>

                <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="mt-5 w-full primary-btn"
                >
                    🎯 Vào học
                </button>
            </div>
        </div>
    )
}

export default CourseCard
