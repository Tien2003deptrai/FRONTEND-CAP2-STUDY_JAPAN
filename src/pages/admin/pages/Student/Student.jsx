import StudentCard from '@/components/StudentCard'
import StudentCoursesModal from '@/components/StudentCoursesModal/StudentCoursesModal'
import StudentDetailModal from '@/components/StudentDetailModal/StudentDetailModal'
import { useStudents } from '@/hooks/useStudents'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

const transformStudentData = (student) => ({
    id: student._id,
    name: student.name,
    email: student.email,
    avatar:
        student.avatar ||
        'https://upload.wikimedia.org/wikipedia/commons/b/b7/Phamnhatvuong2024.jpg',
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

    console.log('students', students)

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
            <div className="flex items-center justify-center min-h-screen bg-pink-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-400"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-pink-50">
                <div className="text-red-600 text-lg font-semibold">
                    Lỗi tải danh sách sinh viên: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-pink-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-baseline space-x-3">
                        <h1 className="text-3xl font-semibold text-pink-700">
                            🌸 Học viên
                        </h1>
                        <span className="text-pink-500 text-lg font-medium bg-pink-100 px-3 py-1 rounded-full select-none">
                            {students.length}
                        </span>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg px-5 py-3 shadow-md transition-transform transform hover:scale-105"
                        aria-label="Thêm Học Viên"
                    >
                        <AddIcon fontSize="medium" />
                        Thêm Học Viên
                    </button>
                </div>

                {/* Grid học viên */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white rounded-xl shadow-lg border border-pink-200 p-6 hover:shadow-2xl transition-shadow cursor-pointer"
                        >
                            <StudentCard
                                student={student}
                                onViewDetail={() =>
                                    handleViewStudentDetail(student)
                                }
                                onViewCourses={() =>
                                    handleViewStudentCourses(student)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
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
