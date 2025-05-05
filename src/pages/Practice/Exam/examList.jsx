import { useExamHistory, useExamList } from '@/hooks/useExam'
import { useNavigate } from 'react-router-dom'

const ExamListPage = () => {
    const { data: exams, isLoading: isExamLoading } = useExamList()
    const navigate = useNavigate()

    // ✅ Lấy toàn bộ lịch sử các bài đã làm của user
    const { data: allHistory, isLoading: isHistoryLoading } = useExamHistory() // Không truyền examId → lấy tất cả

    if (isExamLoading || isHistoryLoading)
        return <div>Đang tải danh sách bài thi...</div>

    // ✅ Gom lịch sử theo examId
    const historyMap = Array.isArray(allHistory)
        ? allHistory.reduce((map, attempt) => {
              const examId = attempt.exam?._id
              if (examId) {
                  if (!map[examId]) {
                      map[examId] = []
                  }
                  map[examId].push(attempt)
              }
              return map
          }, {})
        : {}

    // ✅ Hàm xử lý khi click "Xem chi tiết"
    const handleClickExam = (exam) => {
        const attempts = historyMap[exam._id] || []

        if (attempts.length >= 2) {
            alert('❌ Bạn đã làm bài 2 lần, không thể làm lại nữa!')
            return
        }

        navigate(`/practice/exam/${exam._id}`)
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Danh sách bài thi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams?.map((exam) => {
                    const attempts = historyMap[exam._id] || []
                    const lastDone = attempts.find(
                        (a) => a.status === 'completed'
                    )

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

                            {lastDone ? (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/practice/exam/result/${lastDone._id}`
                                        )
                                    }
                                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    ✅ Đã làm - Xem kết quả
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleClickExam(exam)}
                                    className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Xem chi tiết
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExamListPage
