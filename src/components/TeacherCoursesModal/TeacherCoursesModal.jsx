import { useTeacherCourses } from '@/hooks/useTeacher'
import React from 'react'

const TeacherCoursesModal = ({ teacherId, onClose }) => {
    const { data, isLoading, error } = useTeacherCourses(teacherId)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4">Khoá học phụ trách</h2>

                {isLoading ? (
                    <p>Đang tải khoá học...</p>
                ) : error ? (
                    <p className="text-red-500">Lỗi tải danh sách khoá học.</p>
                ) : (
                    <ul className="space-y-2">
                        {data.map((course) => (
                            <li
                                key={course._id}
                                className="border rounded p-3 bg-gray-50"
                            >
                                <p className="font-medium">{course.name}</p>
                                <p className="text-sm text-gray-600">
                                    Tác giả: {course.author}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Học viên: {course.stu_num}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default TeacherCoursesModal
