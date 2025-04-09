import CourseList from '@/components/course/courseList'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'

function StudentCourse() {
    const { user } = useAuthStore()

    const fetchCourses = async () => {
        if (!user || !user?._id) {
            throw new Error('Không tìm thấy thông tin người dùng.')
        }

        const res = await axiosInstance.get('/course/all')

        if (res.data && res.data.success) {
            return res.data.data.map((course) => ({
                id: course._id,
                title: course.name,
                description: `${course.type} - Tác giả: ${course.author}`,
                image: course.thumb,
                isAvailable: course.enrolledStudents.some(
                    (student) => student._id === user?._id
                ),
                slug: course.course_slug,
            }))
        } else {
            throw new Error(
                'Không thể lấy danh sách khóa học. Vui lòng thử lại.'
            )
        }
    }

    const {
        data: courses,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['studentCourses', user?._id],
        queryFn: fetchCourses,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-1200 py-9">
                <h1 className="text-2xl font-bold">
                    Danh sách khóa học của tôi
                </h1>
                <hr className="w-full my-5" />

                {isLoading ? (
                    <p>Đang tải khóa học...</p>
                ) : isError ? (
                    <div className="text-red-500 font-semibold">
                        {error?.message || 'Đã xảy ra lỗi không xác định.'}
                    </div>
                ) : courses?.length > 0 ? (
                    <CourseList courses={courses} />
                ) : (
                    <p>Không có khóa học nào được tìm thấy.</p>
                )}
            </div>
        </div>
    )
}

export default StudentCourse
