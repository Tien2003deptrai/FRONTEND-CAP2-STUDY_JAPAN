import useAuthStore from '@/store/useAuthStore'
import { Link } from 'react-router-dom'
import CourseCard from '../../../../components/CourseCard'
import { useCourses } from '../../../../hooks/useCourses'
import { Add } from '@mui/icons-material'

const Course = () => {
    const userId = useAuthStore((state) => state.user?._id)
    const { data: courses, isLoading, error } = useCourses(userId)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-pink-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-400"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-pink-50">
                <p className="text-red-600 text-lg font-semibold">
                    Lỗi khi tải khóa học: {error.message}
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-baseline space-x-3">
                        <h1 className="text-3xl font-semibold text-pink-700">
                            🌸 Khóa học của bạn
                        </h1>
                        <span className="text-pink-500 text-lg font-medium bg-pink-100 px-3 py-1 rounded-full select-none">
                            {courses?.length || 0}
                        </span>
                    </div>
                    <Link
                        to={'/admin/new-course'}
                        className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg px-5 py-3 shadow-md transition-transform transform hover:scale-105"
                        aria-label="Tạo khóa học mới"
                    >
                        <Add fontSize="medium" />
                        Tạo khóa học mới
                    </Link>
                </div>

                {/* Course grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {courses?.map((course) => (
                        <Link
                            to={`/admin/courses/${course._id}`}
                            key={course._id}
                            state={{ course }}
                            className="block"
                        >
                            <CourseCard course={course} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Course
