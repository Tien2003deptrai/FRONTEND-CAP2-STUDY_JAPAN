import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function TeacherCourse() {
    const { user } = useAuthStore()

    const getCourse = async () => {
        const res = await axiosInstance.get(`course/teacher/${user?._id}`)
        return res.data
    }

    const { data } = useQuery({
        queryKey: ['getCourseLecturer', user?._id],
        queryFn: getCourse,
        staleTime: 1000 * 60 * 5,
        retry: 3,
    })

    return (
        <div className="w-full flex justify-center items-center py-10">
            <div className="w-1200">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        Danh sách khóa học của tôi
                    </h1>
                    <Link
                        to={'new-course'}
                        className="primary-btn flex items-center gap-2"
                    >
                        <Add /> Tạo khóa học mới
                    </Link>
                </div>
                <hr className="w-full my-5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
                    {data?.data?.map((course) => (
                        <div
                            key={course._id}
                            className="border rounded-lg shadow-md overflow-hidden"
                        >
                            {course.thumb ? (
                                <img
                                    src={course.thumb}
                                    alt={course.name}
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold truncate">
                                    {course.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Giảng viên: {course.author}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Số học viên: {course.stu_num}
                                </p>
                                <Link
                                    to={`/teacher/edit/${course._id}`}
                                    className="mt-2 inline-block text-blue-500 hover:underline"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeacherCourse
