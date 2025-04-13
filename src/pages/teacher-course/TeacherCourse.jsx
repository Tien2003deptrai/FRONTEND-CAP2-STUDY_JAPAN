import useFetchTeacherCourses from '@/hooks/useFetchTeacherCourses'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function TeacherCourse() {
    const { data } = useFetchTeacherCourses()

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
                                    src={
                                        course.thumb ||
                                        'https://media.istockphoto.com/id/1298277940/vector/learn-japanese-language-isometric-concept-with-open-laptop-books-headphones-and-tea.jpg?s=612x612&w=0&k=20&c=RchsXoccKQFLHf6bmJiSx1fXX1JvX1l-uRPhiBxum4E='
                                    }
                                    alt={course.name}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null // Prevent infinite loop
                                        e.target.src =
                                            'https://media.istockphoto.com/id/1298277940/vector/learn-japanese-language-isometric-concept-with-open-laptop-books-headphones-and-tea.jpg?s=612x612&w=0&k=20&c=RchsXoccKQFLHf6bmJiSx1fXX1JvX1l-uRPhiBxum4E='
                                    }}
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
