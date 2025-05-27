import CourseList from '@/components/course/courseList'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import { useQuery } from '@tanstack/react-query'

function StudentCourse() {
    const { user } = useAuthStore()

    const fetchCourses = async () => {
        if (!user || !user?._id) {
            throw new Error('Không tìm thấy thông tin người dùng.')
        }

        const res = await axiosInstance.get('/course/enrolled')
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
        <div className="w-full bg-gradient-to-b from-white to-red-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-red-600 mb-6 drop-shadow-lg flex items-center justify-center gap-3">
                    <EmojiObjectsIcon fontSize="large" />
                    Khoá học của bạn
                </h1>
                <p className="text-center text-gray-600 text-lg mb-10">
                    Khám phá hành trình học tiếng Nhật của bạn ✨
                </p>

                {isLoading ? (
                    <p className="text-center text-gray-500 text-lg">
                        ⏳ Đang tải khoá học...
                    </p>
                ) : isError ? (
                    <div className="text-center text-red-500 font-semibold">
                        {error?.message || 'Đã xảy ra lỗi không xác định.'}
                    </div>
                ) : courses?.length > 0 ? (
                    <CourseList courses={courses} />
                ) : (
                    <p className="text-center text-gray-400 text-md">
                        Không có khoá học nào được tìm thấy.
                    </p>
                )}
            </div>
        </div>
    )
}

export default StudentCourse
