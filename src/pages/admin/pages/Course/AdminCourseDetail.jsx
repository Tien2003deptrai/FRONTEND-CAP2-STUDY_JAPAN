import { useStudents } from '@/hooks/useStudents'
import axiosInstance from '@/network/httpRequest'
import { Avatar, Input, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Add, ArrowBack, Clear, Delete } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { jsPDF } from 'jspdf'
import { useTeachers } from '@/hooks/useTeacher'

function AdminCourseDetail() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const course = state?.course
    console.log('course', course)

    // Modal mở/đóng
    const [opened, { open, close }] = useDisclosure(false)
    const [teacherModalOpened, { open: openTeacher, close: closeTeacher }] =
        useDisclosure(false)

    // Học viên
    const { data } = useStudents()
    const [studentSearchTerm, setStudentSearchTerm] = useState('')
    const [selectedStudents, setSelectedStudents] = useState([])

    // Giáo viên (chỉ chọn 1)
    const { data: teachers } = useTeachers()
    const [teacherSearchTerm, setTeacherSearchTerm] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    // Lọc danh sách học viên theo tìm kiếm
    const filteredStudents = data?.filter((student) =>
        student.email.toLowerCase().includes(studentSearchTerm.toLowerCase())
    )

    // Lọc danh sách giáo viên theo tìm kiếm
    const filteredTeachers = teachers?.filter((teacher) =>
        teacher.email.toLowerCase().includes(teacherSearchTerm.toLowerCase())
    )

    // Danh sách học viên đã đăng ký
    const { data: enrolledStudents, refetch } = useQuery({
        queryKey: ['enrolledStudents', course._id],
        queryFn: async () => {
            const res = await axiosInstance.get(`course/${course._id}/students`)
            return res.data.data
        },
        enabled: !!course._id,
    })

    // Lưu học viên được chọn vào khóa học
    const onSaveEnrollStudents = async () => {
        const studentIds = selectedStudents.map((student) => student._id)
        const payload = {
            courseId: course._id,
            studentIds,
        }
        try {
            const response = await axiosInstance.post(
                `course/students/enroll`,
                payload
            )
            if (response.status === 200) {
                toast.success('Đã thêm học viên thành công!')
                close()
                setStudentSearchTerm('')
                setSelectedStudents([])
                refetch()
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại!')
            }
        } catch (error) {
            console.error(error)
            toast.error('Có lỗi xảy ra, vui lòng thử lại!')
        }
    }

    // Lưu giáo viên được chọn vào khóa học (chỉ 1 giáo viên)
    const onSaveEnrollTeachers = async () => {
        if (!selectedTeacher) {
            toast.error('Vui lòng chọn một giáo viên!')
            return
        }
        const payload = {
            courseId: course._id,
            teacherId: selectedTeacher._id,
        }
        try {
            const response = await axiosInstance.post(
                `course/teacher/enroll`,
                payload
            )
            if (response.status === 200) {
                toast.success('Đã thêm giáo viên thành công!')
                closeTeacher()
                setTeacherSearchTerm('')
                setSelectedTeacher(null)
                refetch()
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại!')
            }
        } catch (error) {
            console.error(error)
            toast.error('Có lỗi xảy ra, vui lòng thử lại!')
        }
    }

    // Xóa học viên khỏi khóa học
    const onUnrollStudent = async (studentId) => {
        const confirmResult = await Swal.fire({
            title: 'Xác nhận xóa học viên',
            text: 'Bạn có chắc muốn xóa học viên này khỏi khóa học?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        })

        if (confirmResult.isConfirmed) {
            try {
                const payload = {
                    courseId: course._id,
                    studentId,
                }
                const response = await axiosInstance.post(
                    `course/unenroll`,
                    payload
                )
                if (response.status === 200) {
                    toast.success('Đã xóa học viên thành công!')
                    refetch()
                } else {
                    toast.error('Có lỗi xảy ra, vui lòng thử lại!')
                }
            } catch (error) {
                console.error(error)
                toast.error('Có lỗi xảy ra, vui lòng thử lại!')
            }
        }
    }

    // Generate PDF danh sách học viên
    const generatePDF = () => {
        const doc = new jsPDF()

        doc.setFont('times')
        doc.setFontSize(18)
        doc.text('Danh sách sinh viên khóa học', 20, 20)

        doc.setFontSize(12)
        const startY = 30
        let currentY = startY

        enrolledStudents?.forEach((student, index) => {
            doc.text(
                `${index + 1}. ${student.name} - ${student.email}`,
                20,
                currentY
            )
            currentY += 10
        })

        doc.save('danh_sach_sinh_vien.pdf')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <ToastContainer
                hideProgressBar
                autoClose={3000}
                style={{ marginTop: '80px' }}
            />
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <ArrowBack fontSize="small" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Chi tiết khóa học:
                    </h1>
                    <span className="text-primary text-2xl font-semibold">
                        {course?.name}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={open}
                        className="primary-btn flex items-center gap-4"
                    >
                        <Add fontSize="small" /> <span>Thêm học viên</span>
                    </button>
                    <button
                        onClick={openTeacher}
                        className="primary-btn flex items-center gap-4"
                    >
                        <Add fontSize="small" /> <span>Thêm giáo viên</span>
                    </button>
                </div>
            </div>

            <hr className="mb-6" />

            <div className="mb-6">
                <h2 className="italic text-lg font-medium text-gray-600 mb-1">
                    Mô tả:
                </h2>
                <p className="leading-7 text-gray-800">{course?.description}</p>
            </div>
            <hr className="mb-6" />
            <div className="mb-6">
                <h2 className="italic text-lg font-medium text-gray-600 mb-1">
                    Giáo viên phụ trách:
                </h2>
                <div className="flex items-center gap-4">
                    {course?.teacher ? (
                        <div className="flex items-center gap-4">
                            <Avatar size="lg" src={course?.teacher?.avatar} />
                            <div className="flex flex-col gap-3">
                                <span className="text-gray-700">
                                    {course?.teacher?.name}
                                </span>
                                <span className="text-gray-500">
                                    {course?.teacher?.email}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Chưa có giáo viên nào phụ trách khóa học này.
                        </p>
                    )}
                </div>
            </div>
            <hr className="mb-6" />
            <div className="flex items-center gap-2 mb-6">
                <h2 className="italic text-lg font-medium text-gray-600">
                    Số lượng học viên:
                </h2>
                <span className="text-gray-800 font-medium">
                    {enrolledStudents?.length || 0}
                </span>
            </div>

            <div className="w-full flex justify-center">
                <table className="w-full max-w-[900px] text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Họ tên</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Ngày đăng ký</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {enrolledStudents?.length > 0 ? (
                            enrolledStudents.map((student, index) => (
                                <tr
                                    key={student._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {student.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {student.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(
                                            student.enrolledAt
                                        ).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() =>
                                                onUnrollStudent(student._id)
                                            }
                                        >
                                            <Delete fontSize="small" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-gray-500 italic"
                                >
                                    Không có học viên nào đã đăng ký.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button onClick={generatePDF} className="primary-btn mt-4">
                In danh sách sinh viên ra PDF
            </button>

            {/* Modal thêm học viên */}
            <Modal
                closeOnClickOutside={false}
                opened={opened}
                onClose={close}
                title="Quản lý học viên"
                size="600px"
            >
                <Input
                    placeholder="Nhập email học viên"
                    value={studentSearchTerm}
                    onChange={(e) =>
                        setStudentSearchTerm(e.currentTarget.value)
                    }
                    rightSectionPointerEvents="all"
                    mt="md"
                    size="md"
                    rightSection={
                        <Clear
                            onClick={() => setStudentSearchTerm('')}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                />
                <hr className="my-4" />
                <div className="max-h-[250px] overflow-y-auto">
                    {filteredStudents?.length > 0 &&
                    studentSearchTerm !== '' ? (
                        filteredStudents.map((student, index) => (
                            <div
                                key={student._id}
                                className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-gray-800">
                                        {index + 1}.
                                    </span>
                                    <span className="text-gray-700">
                                        {student.name}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {student.email}
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        setSelectedStudents((prev) =>
                                            prev.includes(student)
                                                ? prev
                                                : [...prev, student]
                                        )
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Thêm
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic py-4">
                            Không tìm thấy học viên nào.
                        </p>
                    )}
                </div>
                <hr className="my-4" />
                <div className="flex flex-col justify-center">
                    <span className="text-gray-700 font-bold">
                        {selectedStudents.length} học viên đã chọn
                    </span>
                    <div className="flex flex-col items-center gap-2 max-h-[250px] overflow-y-auto mt-6">
                        {selectedStudents.length > 0 &&
                            selectedStudents.map((student) => (
                                <div
                                    key={student._id}
                                    className="flex  justify-between w-full items-center gap-4 mb-2"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            size="lg"
                                            src={student.avatar}
                                        />
                                        <div className="flex flex-col gap-3">
                                            <span className="text-gray-700">
                                                {student.name}
                                            </span>
                                            <span className="text-gray-500">
                                                {student.email}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setSelectedStudents((prev) =>
                                                prev.filter(
                                                    (s) => s._id !== student._id
                                                )
                                            )
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Delete />
                                    </button>
                                </div>
                            ))}
                    </div>
                    {selectedStudents.length > 0 && (
                        <button
                            onClick={onSaveEnrollStudents}
                            className="primary-btn mt-4"
                        >
                            Lưu
                        </button>
                    )}
                </div>
            </Modal>

            {/* Modal thêm giáo viên (chỉ chọn 1) */}
            <Modal
                closeOnClickOutside={false}
                opened={teacherModalOpened}
                onClose={closeTeacher}
                title="Quản lý giáo viên"
                size="600px"
            >
                <Input
                    placeholder="Nhập email giáo viên"
                    value={teacherSearchTerm}
                    onChange={(e) =>
                        setTeacherSearchTerm(e.currentTarget.value)
                    }
                    rightSectionPointerEvents="all"
                    mt="md"
                    size="md"
                    rightSection={
                        <Clear
                            onClick={() => setTeacherSearchTerm('')}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                />
                <hr className="my-4" />
                <div className="max-h-[250px] overflow-y-auto">
                    {filteredTeachers?.length > 0 &&
                    teacherSearchTerm !== '' ? (
                        filteredTeachers.map((teacher, index) => (
                            <div
                                key={teacher._id}
                                className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-gray-800">
                                        {index + 1}.
                                    </span>
                                    <span className="text-gray-700">
                                        {teacher.name}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {teacher.email}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedTeacher(teacher)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Thêm
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic py-4">
                            Không tìm thấy giáo viên nào.
                        </p>
                    )}
                </div>
                <hr className="my-4" />
                <div className="flex flex-col justify-center">
                    <span className="text-gray-700 font-bold">
                        {selectedTeacher
                            ? '1 giáo viên đã chọn'
                            : 'Chưa chọn giáo viên'}
                    </span>
                    {selectedTeacher && (
                        <div className="flex justify-between w-full items-center gap-4 mb-2 mt-2">
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size="lg"
                                    src={selectedTeacher.avatar}
                                />
                                <div className="flex flex-col gap-3">
                                    <span className="text-gray-700">
                                        {selectedTeacher.name}
                                    </span>
                                    <span className="text-gray-500">
                                        {selectedTeacher.email}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTeacher(null)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Delete />
                            </button>
                        </div>
                    )}
                    {selectedTeacher && (
                        <button
                            onClick={onSaveEnrollTeachers}
                            className="primary-btn mt-4"
                        >
                            Lưu
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default AdminCourseDetail
