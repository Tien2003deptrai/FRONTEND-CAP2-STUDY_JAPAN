import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import CourseCard from '@/components/CourseCard'
import { useCourses } from '@/hooks/useCourses'
import useAuthStore from '@/store/useAuthStore'

const transformCourseData = (course) => ({
    id: course._id,
    name: course.name,
    description: course.course_slug?.replace(/-/g, ' ') || 'Chưa có mô tả',
    // thumbnail: course.thumb,
    thumbnail: 'https://gojapan.vn/wp-content/uploads/2020/05/Japanese-N5.jpg',
    type: course.type,
    level: course.type,
    status: course.stu_num > 0 ? 'Đang học' : 'Chưa có học viên',
    author: course.author,
    students:
        course.enrolledStudents
            ?.filter((s) => s._id)
            .map((s) => ({
                id: s._id,
                name: s.name,
                avatar:
                    s.avatar ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7_OgUKugq0Ap0G6lmRvbsMC-NXtHjAPfsA&s',
            })) || [],
    duration: `${course.stu_num * 2 || 10} giờ`, // Ví dụ giả định
})

const Course = () => {
    const userId = useAuthStore((state) => state.user?._id)
    const { data, isLoading, error } = useCourses(userId)
    const courses = data?.map(transformCourseData) || []

    const handleViewCourse = (course) => console.log('View course:', course)
    const handleEditCourse = (course) => console.log('Edit course:', course)
    const handleDeleteCourse = (course) => console.log('Delete course:', course)

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
                    Lỗi tải khóa học: {error.message}
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium text-gray-800">
                                Khóa học
                            </h1>
                            <span className="ml-2 text-sm text-gray-500">
                                {courses.length}
                            </span>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                            <AddIcon fontSize="small" className="mr-1" />
                            Thêm Khóa Học
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onView={handleViewCourse}
                                onEdit={handleEditCourse}
                                onDelete={handleDeleteCourse}
                            />
                        ))}
                    </div>
                </div>
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <AddIcon fontSize="small" className="mr-1" />
                        Thêm Khóa Học
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses?.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onView={handleViewCourse}
                            onEdit={handleEditCourse}
                            onDelete={handleDeleteCourse}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Course
