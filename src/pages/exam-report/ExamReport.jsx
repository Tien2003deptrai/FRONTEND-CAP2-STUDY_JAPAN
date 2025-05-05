import axiosInstance from '@/network/httpRequest'
import { ArrowBack, Visibility } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ExamReport() {
    const { examId } = useParams()
    const navigate = useNavigate()

    const getStudentJoinedExam = async () => {
        const res = await axiosInstance.get(`/exam/${examId}/students`)
        return res.data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['exam-students', examId],
        queryFn: getStudentJoinedExam,
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>
    }

    if (isError) {
        return <div>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</div>
    }

    if (!data || data.length === 0) {
        return <div>Không có dữ liệu để hiển thị.</div>
    }

    return (
        <div className="p-6">
            {/* Back Button */}
            <div className="flex items-center gap-4">
                <button
                    className="p-2 text-primary rounded-full shadow-sm hover:bg-gray-100"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                >
                    <ArrowBack />
                </button>
                <h1 className="text-2xl font-bold">Báo cáo bài thi</h1>
            </div>
            <hr className="my-8" />
            <p className="mb-4 text-lg font-semibold italic text-gray-600">
                Có {data.length} tài khoản tham gia:
            </p>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">
                            Tên
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Điểm số
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Thời gian làm bài (phút)
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Đạt
                        </th>
                        <th className="border border-gray-300 px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((student, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                                {student.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {student.email}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {student.totalScore}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {student.timeSpent}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {student.isPassed ? '✅' : '❌'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    to={student.userId}
                                    className="text-blue-500 hover:underline"
                                >
                                    <Visibility />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExamReport
