import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import TeacherCard from '@/components/TeacherCard'
import TeacherCoursesModal from '@/components/TeacherCoursesModal/TeacherCoursesModal'
import TeacherDetailModal from '@/components/TeacherDetailModal/TeacherDetailModal'
import { useTeachers } from '@/hooks/useTeacher'

const transformTeacherData = (teacher) => ({
    id: teacher._id,
    name: teacher.name,
    email: teacher.email,
    avatar:
        teacher.avatar ||
        'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    phone: teacher.phone,
    status: teacher.status,
    experienceYears: teacher.teacher_profile?.experience_years || 0,
    subjects: teacher.teacher_profile?.subjects || [],
    certificates: teacher.teacher_profile?.certificates || [],
    bio: teacher.teacher_profile?.bio || '',
})

const Teacher = () => {
    const { data, isLoading, error } = useTeachers()
    const teachers = data?.map(transformTeacherData) || []

    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showCoursesModal, setShowCoursesModal] = useState(false)

    const handleViewDetail = (teacher) => {
        setSelectedTeacher(teacher)
        setShowDetailModal(true)
    }

    const handleViewCourses = (teacher) => {
        setSelectedTeacher(teacher)
        setShowCoursesModal(true)
    }

    const handleCloseModals = () => {
        setSelectedTeacher(null)
        setShowDetailModal(false)
        setShowCoursesModal(false)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Đang tải dữ liệu...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-10">
                Lỗi tải dữ liệu giáo viên.
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium text-gray-800">
                            Giáo viên
                        </h1>
                        <span className="ml-2 text-sm text-gray-500">
                            {teachers.length}
                        </span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <AddIcon fontSize="small" className="mr-1" />
                        Thêm Giáo Viên
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="bg-white rounded-lg shadow-sm border p-4"
                        >
                            <TeacherCard teacher={teacher} />
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleViewDetail(teacher)}
                                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    <VisibilityIcon
                                        fontSize="small"
                                        className="mr-1"
                                    />{' '}
                                    Xem chi tiết
                                </button>
                                <button
                                    onClick={() => handleViewCourses(teacher)}
                                    className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-800"
                                >
                                    <LibraryBooksIcon
                                        fontSize="small"
                                        className="mr-1"
                                    />{' '}
                                    Khoá học
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showDetailModal && selectedTeacher && (
                <TeacherDetailModal
                    teacherId={selectedTeacher.id}
                    onClose={handleCloseModals}
                />
            )}

            {showCoursesModal && selectedTeacher && (
                <TeacherCoursesModal
                    teacherId={selectedTeacher.id}
                    onClose={handleCloseModals}
                />
            )}
        </div>
    )
}

export default Teacher
