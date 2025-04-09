import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useStudents } from '@/hooks/useStudents'
import StudentCard from '@/components/StudentCard'
import StudentCoursesModal from '@/components/StudentCoursesModal/StudentCoursesModal'
import StudentDetailModal from '@/components/StudentDetailModal/StudentDetailModal'

const transformStudentData = (student) => ({
    id: student._id,
    name: student.name,
    email: student.email,
    avatar:
        student.avatar ||
        'https://png.pngtree.com/png-clipart/20190618/original/pngtree-trend-male-student-illustration-fashion-male-student-male-student-school-season-png-image_3933229.jpg',
    phone: student.phone,
    status: student.status,
    region: student.region || 'Chưa xác định',
    subRegion: student.subRegion || 'Chưa xác định',
    learningLevel:
        student.student_profile?.learning_level?.charAt(0).toUpperCase() +
            student.student_profile?.learning_level?.slice(1) || 'N/A',
    progress: student.student_profile?.progress || 0,
    members: student.student_profile?.enrolled_courses?.length || 0,
})

const Student = () => {
    const { data, isLoading, error } = useStudents()
    const students = data?.map(transformStudentData) || []

    const [selectedStudent, setSelectedStudent] = useState(null)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showCoursesModal, setShowCoursesModal] = useState(false)

    const handleViewStudentDetail = (student) => {
        setSelectedStudent(student)
        setShowDetailModal(true)
    }

    const handleViewStudentCourses = (student) => {
        setSelectedStudent(student)
        setShowCoursesModal(true)
    }

    const handleCloseModals = () => {
        setShowDetailModal(false)
        setShowCoursesModal(false)
        setSelectedStudent(null)
    }

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
                    Lỗi tải danh sách sinh viên: {error.message}
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
                            Sinh viên
                        </h1>
                        <span className="ml-2 text-sm text-gray-500">
                            {students.length}
                        </span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <AddIcon fontSize="small" className="mr-1" />
                        Thêm Sinh Viên
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {students.map((student) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onViewDetail={() =>
                                handleViewStudentDetail(student)
                            }
                            onViewCourses={() =>
                                handleViewStudentCourses(student)
                            }
                        />
                    ))}
                </div>
            </div>

            {showDetailModal && selectedStudent && (
                <StudentDetailModal
                    studentId={selectedStudent.id}
                    onClose={handleCloseModals}
                />
            )}

            {showCoursesModal && selectedStudent && (
                <StudentCoursesModal
                    student={selectedStudent}
                    onClose={handleCloseModals}
                />
            )}
        </div>
    )
}

export default Student
