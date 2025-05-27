import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useExamById, useExamHistory, useStartExam } from '@/hooks/useExam'

const ExamDetailPage = () => {
    const { exam_id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const { data: exam, isLoading: isExamLoading } = useExamById(exam_id)
    const { data: history, isLoading: isHistoryLoading } =
        useExamHistory(exam_id)
    const { mutateAsync: startExam, isLoading: isStarting } = useStartExam()

    const handleStartExam = async () => {
        if (!exam?._id) {
            setError('Không tìm thấy ID bài thi')
            return
        }

        if (!exam.questions || exam.questions.length === 0) {
            setError(
                'Bài thi này hiện không có câu hỏi nào. Vui lòng liên hệ giáo viên.'
            )
            return
        }

        const existingAttempt = history?.find(
            (attempt) => attempt.status !== 'completed'
        )
        if (existingAttempt) {
            navigate(`/practice/exam/doing/${exam_id}`, {
                state: { attemptId: existingAttempt._id },
            })
            return
        }

        if (history?.some((h) => h.status === 'completed')) {
            setError('Bạn đã hoàn thành bài thi này và không thể làm lại.')
            return
        }

        try {
            const res = await startExam(exam._id)
            navigate(`/practice/exam/doing/${exam_id}`, {
                state: { attemptId: res.attemptId },
            })
        } catch (error) {
            console.error(' Lỗi khi startExam:', error)
            setError(
                error?.response?.data?.message || 'Không thể bắt đầu bài thi'
            )
        }
    }

    if (isExamLoading || isHistoryLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-lg text-gray-600">
                    Đang tải chi tiết bài thi...
                </p>
            </div>
        )
    }

    if (!exam) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-red-600 font-semibold">
                    Không tìm thấy thông tin bài thi
                </p>
            </div>
        )
    }

    const completedAttempt = history?.find((h) => h.status === 'completed')
    const ongoingAttempt = history?.find((h) => h.status !== 'completed')

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {exam?.title}
                </h1>
                <p className="text-gray-600 text-base mb-3">
                    {exam?.description}
                </p>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                        {error}
                    </div>
                )}

                {completedAttempt ? (
                    <>
                        <p className="mt-4 text-sm text-red-600">
                            Bạn đã hoàn thành bài thi này và không thể làm lại.
                        </p>
                        <button
                            disabled
                            className="mt-4 inline-block bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed opacity-50"
                        >
                            Bắt đầu làm bài
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleStartExam}
                        className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                    >
                        {isStarting
                            ? 'Đang bắt đầu...'
                            : ongoingAttempt
                              ? 'Tiếp tục làm bài'
                              : 'Bắt đầu làm bài'}
                    </button>
                )}
            </div>

            {history && history.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Lịch sử làm bài
                    </h2>
                    <div className="space-y-4">
                        {history.map((attempt) => (
                            <div
                                key={attempt._id}
                                className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center bg-gray-50"
                            >
                                <div>
                                    <p className="font-medium text-gray-700">
                                        {attempt.status === 'completed' ? (
                                            <>
                                                Số điểm:{' '}
                                                <span className="text-danger">
                                                    {attempt.totalScore} điểm
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-orange-600">
                                                Chưa hoàn thành
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {attempt.status === 'completed'
                                            ? `Ngày nộp: ${new Date(attempt.endTime).toLocaleString()}`
                                            : `Bắt đầu lúc: ${new Date(attempt.startTime).toLocaleString()}`}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        navigate(
                                            attempt.status === 'completed'
                                                ? `/practice/exam/result/${attempt._id}`
                                                : `/practice/exam/doing/${exam_id}`,
                                            {
                                                state:
                                                    attempt.status !==
                                                    'completed'
                                                        ? {
                                                              attemptId:
                                                                  attempt._id,
                                                          }
                                                        : undefined,
                                            }
                                        )
                                    }
                                    className={`${
                                        attempt.status === 'completed'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-orange-500 hover:bg-orange-600'
                                    } text-white px-4 py-2 rounded transition duration-300`}
                                >
                                    {attempt.status === 'completed'
                                        ? 'Xem kết quả'
                                        : 'Tiếp tục làm'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExamDetailPage
