import useAuthStore from '@/store/useAuthStore'
import { Link } from 'react-router-dom'
import CourseCard from '../../../../components/CourseCard'
import { useCourses } from '../../../../hooks/useCourses'

const Course = () => {
    const userId = useAuthStore((state) => state.user?._id)
    console.log('userId', userId)
    const { data: courses, isLoading, error } = useCourses(userId)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">
                    Error loading courses: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium text-gray-800">
                            Khóa học
                        </h1>
                        <span className="ml-2 text-sm text-gray-500">
                            {courses?.length || 0}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses?.map((course) => (
                        <Link
                            to={`/admin/courses/${course._id}`}
                            key={course._id}
                            state={{ course }}
                        >
                            <CourseCard key={course._id} course={course} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Course
