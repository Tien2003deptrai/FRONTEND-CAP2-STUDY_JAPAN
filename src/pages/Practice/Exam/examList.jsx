import { useExamList } from '@/hooks/useExam'
import { useNavigate } from 'react-router-dom'

const ExamListPage = () => {
    const { data: exams, isLoading: isExamLoading } = useExamList()
    const navigate = useNavigate()

    if (isExamLoading) return <div>Đang tải danh sách bài thi...</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-red-600 text-center py-3">
                Danh sách bài thi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams?.map((exam) => {
                    return (
                        <div
                            key={exam._id}
                            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {exam.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {exam.description}
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                                <p>🕒 Thời gian: {exam.time_limit} phút</p>
                                <p>🏁 Level: {exam.level}</p>
                            </div>
                            <button
                                onClick={() =>
                                    navigate(`/practice/exam/${exam._id}`)
                                }
                                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExamListPage
