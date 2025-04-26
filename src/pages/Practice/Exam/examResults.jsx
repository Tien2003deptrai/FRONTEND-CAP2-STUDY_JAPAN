import { useExamResult } from '@/hooks/useExam'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ExamResultPage = () => {
    const { attemptId } = useParams()
    const location = useLocation()
    console.log(location)

    const res = location?.state.res
    console.log('res', res)

    const navigate = useNavigate()
    const { data: result, isLoading } = useExamResult(attemptId)

    if (isLoading)
        return (
            <div className="text-center py-10 text-gray-500">
                Đang tải kết quả...
            </div>
        )
    if (!result)
        return (
            <div className="text-center py-10 text-red-600">
                Không tìm thấy kết quả bài thi
            </div>
        )

    return (
        <div className="p-6 max-w-5xl mx-auto text-gray-800">
            <div className="bg-white rounded-xl shadow-md p-8 border border-red-200">
                <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
                    🎓 Kết quả bài thi:{' '}
                    <span className="text-black">{result.examTitle}</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-red-50 p-5 rounded-lg shadow-inner">
                        <h3 className="text-lg font-semibold text-red-700 mb-2">
                            📊 Kết quả
                        </h3>
                        <p className="text-xl font-bold text-green-700">
                            {result.answers.filter((a) => a.isCorrect).length} /{' '}
                            {result.answers.length} câu
                        </p>
                    </div>

                    <div className="bg-red-50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-red-700">
                            🕒 Thời gian làm bài
                        </h3>
                        <p className="text-xl font-extrabold text-red-600">
                            {result.time || 'Không xác định'}
                        </p>
                    </div>
                </div>

                {Array.isArray(result.answers) && result.answers.length > 0 ? (
                    <div className="space-y-4 mt-10">
                        <h2 className="text-xl font-bold mb-2 text-red-600">
                            📋 Chi tiết từng câu hỏi
                        </h2>
                        {[...result.answers]
                            .sort((a, b) =>
                                a.questionId.localeCompare(b.questionId)
                            )
                            .map((answer, index) => (
                                <div
                                    key={index}
                                    className="border border-red-200 rounded-lg p-4 bg-white shadow"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-800 font-medium">
                                            Câu {index + 1} - ID:{' '}
                                            <span className="text-sm text-gray-500">
                                                {answer.questionId}
                                            </span>
                                        </p>
                                        <span
                                            className={`text-sm px-3 py-1 rounded-full font-semibold ${
                                                answer.isCorrect
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {answer.isCorrect ? 'Đúng' : 'Sai'}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                                        <p>
                                            <strong>Đáp án của bạn:</strong>{' '}
                                            <span className="font-mono text-gray-800">
                                                {answer.userAnswer}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Đáp án đúng:</strong>{' '}
                                            <span className="font-mono text-green-700">
                                                {answer.correctAnswer ||
                                                    '(Không rõ)'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="text-center mt-8 text-gray-600 italic">
                        Không có câu hỏi nào được trả lời.
                    </div>
                )}

                <div className="mt-10 flex justify-center gap-4">
                    <button
                        onClick={() => navigate('/practice/exam')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        🔙 Quay lại danh sách
                    </button>
                    <button
                        onClick={() =>
                            navigate(`/practice/exam/${result.examId}`)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        📄 Xem chi tiết đề thi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExamResultPage
