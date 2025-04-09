import { useStudentCourses } from '@/hooks/useAdminDashboard'
import React from 'react'

const StudentCoursesModal = ({ student, onClose }) => {
    const { data, isLoading, error } = useStudentCourses(student?.id)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
                >
                    ✖
                </button>
                <h2 className="text-lg font-bold mb-4">
                    Khóa học của {student.name}
                </h2>

                {isLoading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-red-500">Lỗi tải khóa học.</p>
                ) : (
                    <ul className="space-y-4">
                        {data?.map((item) => (
                            <li
                                key={item._id}
                                className="border p-3 rounded-md flex items-center"
                            >
                                <img
                                    // src={item.course.thumb}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9jHXStwRc8YgUIZ3mS5eGWYS36d66whnYw&s"
                                    alt={item.course.name}
                                    className="w-14 h-14 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h3 className="text-md font-semibold">
                                        {item.course.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Loại: {item.course.type} • Sĩ số:{' '}
                                        {item.course.stu_num}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Ghi danh lúc:{' '}
                                        {new Date(
                                            item.enrolledAt
                                        ).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {data?.length === 0 && (
                            <p>Chưa ghi danh khóa học nào.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default StudentCoursesModal
