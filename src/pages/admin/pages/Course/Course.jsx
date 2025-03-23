import React from 'react'
import {
    Add,
    Edit,
    Delete,
    Search,
    FilterList,
    MoreVert,
} from '@mui/icons-material'
import { useCourses } from '@/apis/Course/query'
import StatusBadge from '../../components/StatusBadge/StatusBadge'
import useAuthStore from '@/store/useAuthStore'

function Course() {
    const { user } = useAuthStore()
    console.log('user', user)
    const { data: courses, error } = useCourses(user._id)

    console.log('Loading courses', courses)

    if (error) return <p>Lỗi: {error.message}</p>

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Quản lý Khóa học Tiếng Nhật
                    </h1>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                        <Add className="mr-1" /> Thêm khóa học mới
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 flex items-center justify-between border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
                            />
                        </div>
                        <button className="flex items-center text-gray-700 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <FilterList className="mr-1" /> Lọc
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Tên khóa học
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Học viên
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Bài học
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses?.map((course) => (
                                <tr
                                    key={course._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        #{course.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {course.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {course.students}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {course.lessons}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={course.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <Edit fontSize="small" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Delete fontSize="small" />
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <MoreVert fontSize="small" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Course
