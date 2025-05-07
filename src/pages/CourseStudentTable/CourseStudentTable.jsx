import axiosInstance from '@/network/httpRequest'
import { ArrowBack } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { jsPDF } from 'jspdf'

function CourseStudentTable() {
    const navigate = useNavigate()
    const { courseId } = useParams()

    const {
        data: enrolledStudents,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['enrolledStudents', courseId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/course/${courseId}/students`)
            const result = res.data?.data
            if (!Array.isArray(result))
                throw new Error('Dữ liệu học viên không hợp lệ')
            return result
        },
        enabled: !!courseId,
    })

    const generatePDF = () => {
        const doc = new jsPDF()
        doc.setFont('times')
        doc.setFontSize(18)
        doc.text(`Danh sách học viên`, 20, 20)

        doc.setFontSize(12)
        let currentY = 30

        enrolledStudents?.forEach((student, index) => {
            doc.text(
                `${index + 1}. ${student.name} - ${student.email}`,
                20,
                currentY
            )
            currentY += 10
        })

        doc.save(`danh_sach_hoc_vien_khoa_${courseId}.pdf`)
    }

    if (isLoading)
        return <div className="p-8">Đang tải danh sách học viên...</div>
    if (isError)
        return (
            <div className="p-8 text-red-500">
                Không tải được danh sách học viên.
            </div>
        )

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
                        Danh sách học viên
                    </h1>{' '}
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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {enrolledStudents.map((student, index) => (
                            <tr
                                key={student._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3">{student.name}</td>
                                <td className="px-4 py-3">{student.email}</td>
                                <td className="px-4 py-3">
                                    {new Date(
                                        student.enrolledAt
                                    ).toLocaleString('vi-VN')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={generatePDF} className="primary-btn mt-4">
                In danh sách học viên ra PDF
            </button>
        </div>
    )
}

export default CourseStudentTable
