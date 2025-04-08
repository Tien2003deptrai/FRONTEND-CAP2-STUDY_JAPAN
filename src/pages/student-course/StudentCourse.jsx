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

        const res = await axiosInstance.get('/course/enrolled')

        console.log(res.data)
        return res.data.data
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
                <h1 className="text-3xl font-extrabold text-center text-red-600 mb-5">
                    🇯🇵 Các khóa học bạn đã đăng ký
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
