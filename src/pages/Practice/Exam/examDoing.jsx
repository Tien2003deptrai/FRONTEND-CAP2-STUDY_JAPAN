import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useExamTake, useSubmitExam, examApi } from '@/hooks/useExam'
import QuestionSection from '@/components/practice/question/QuestionSection'

const ExamDoingPage = () => {
    const { attemptId } = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useExamTake(attemptId)
    const exam = data?.exam

    const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam()

    const [answers, setAnswers] = useState({})
    const [timeLeft, setTimeLeft] = useState(null)
    const [shuffledQuestions, setShuffledQuestions] = useState([])
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFail, setShowFail] = useState(false)
    const [failMessage, setFailMessage] = useState('')

    const clearTimerStorage = () => {
        if (attemptId) {
            localStorage.removeItem(`exam_timer_${attemptId}`)
        }
    }

    const groupQuestionsEvenly = (questions, sections) => {
        if (!Array.isArray(sections) || sections.length === 0) return []
        const grouped = Array.from({ length: sections.length }, () => [])
        questions.forEach((q, i) => {
            grouped[i % sections.length].push(q)
        })
        return grouped
    }

    useEffect(() => {
        if (!exam?.time_limit || !attemptId) return

        const saved = localStorage.getItem(`exam_timer_${attemptId}`)
        if (saved) {
            const { startTime } = JSON.parse(saved)
            const elapsed = Math.floor((Date.now() - startTime) / 1000)
            const remaining = exam.time_limit * 60 - elapsed
            setTimeLeft(remaining > 0 ? remaining : 0)
        } else {
            const now = Date.now()
            localStorage.setItem(
                `exam_timer_${attemptId}`,
                JSON.stringify({ startTime: now })
            )
            setTimeLeft(exam.time_limit * 60)
        }
    }, [exam, attemptId])

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    clearTimerStorage()
                    if (Object.keys(answers).length > 0) {
                        handleSubmit()
                    } else {
                        setError('⏰ Hết giờ nhưng bạn chưa trả lời câu nào.')
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, answers])

    useEffect(() => {
        if (timeLeft === 180) {
            alert('⚠️ Còn 3 phút! Hãy kiểm tra và nộp bài.')
        }
    }, [timeLeft])

    useEffect(() => {
        if (exam?.settings?.fullScreen) {
            const elem = document.documentElement
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(console.warn)
            }
        }
    }, [exam])

    useEffect(() => {
        if (Array.isArray(exam?.questions) && exam.questions.length > 0) {
            let qs = [...exam.questions]
            if (exam.settings?.shuffleQuestions) {
                qs.sort(() => Math.random() - 0.5)
            }
            setShuffledQuestions(qs)
        }
    }, [exam])

    const formatTime = (s) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    const handleSubmit = useCallback(async () => {
        if (!exam || !exam._id) {
            setFailMessage('Không xác định được bài kiểm tra để nộp.')
            setShowFail(true)
            return
        }

        const getAnswerValue = (questionId, answer) => {
            const q = exam?.questions?.find(
                (q) => q._id === questionId || q._id?.toString() === questionId
            )
            if (!q) return answer

            if (q.type === 'multiple_choice') {
                return String(answer).toLowerCase()
            }

            return String(answer).trim()
        }

        const formattedAnswers = Object.entries(answers)
            .filter(([_, val]) => val !== undefined && val !== '')
            .map(([questionId, answer]) => {
                const q = exam?.questions?.find(
                    (q) =>
                        q._id === questionId || q._id?.toString() === questionId
                )
                return {
                    questionId: q?.id || questionId,
                    userAnswer: getAnswerValue(questionId, answer),
                }
            })

        if (formattedAnswers.length === 0) {
            setFailMessage('Vui lòng trả lời ít nhất một câu.')
            setShowFail(true)
            return
        }

        clearTimerStorage()

        try {
            const { attemptId: correctAttemptId } = await examApi.startExam(
                exam._id
            )

            submitExam(
                { attemptId: correctAttemptId, answers: formattedAnswers },
                {
                    onSuccess: (res) => {
                        if (res?.attemptId) {
                            setShowSuccess(true)
                            setTimeout(() => {
                                navigate(`/practice/exam/result/${res.attemptId}`)
                            }, 1500)
                        } else {
                            setFailMessage('Không thể nộp bài. Hãy thử lại.')
                            setShowFail(true)
                        }
                    },
                    onError: (err) => {
                        const msg =
                            err?.response?.data?.message ||
                            err.message ||
                            'Có lỗi xảy ra khi nộp bài.'
                        setFailMessage(msg)
                        setShowFail(true)
                    },
                }
            )
        } catch (error) {
            console.error('❌ Lỗi khi gọi /exam/start/:exam_id:', error)
            setFailMessage('Không thể lấy attemptId để nộp bài.')
            setShowFail(true)
        }
    }, [answers, exam, submitExam, navigate])

    if (isLoading)
        return (
            <div className="text-center py-10 text-gray-500">
                Đang tải bài thi...
            </div>
        )
    if (!exam)
        return (
            <div className="text-center py-10 text-red-600">
                Không tìm thấy bài thi
            </div>
        )

    const hasSections =
        Array.isArray(exam?.sections) && exam.sections.length > 0
    const grouped = hasSections
        ? groupQuestionsEvenly(shuffledQuestions, exam.sections)
        : []

    return (
        <div
            className="max-w-5xl mx-auto relative"
            style={exam?.settings?.preventCopy ? { userSelect: 'none' } : {}}
        >
            <div className="flex justify-between items-center px-6 py-4 bg-red-600 text-white mb-6 rounded-b shadow">
                <h1 className="text-2xl font-bold">{exam.title}</h1>
                <span className="text-lg font-semibold flex items-center gap-1">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="font-bold">
                        {formatTime(timeLeft || 0)}
                    </span>
                </span>
            </div>

            {error && (
                <div className="mx-6 mb-4 p-4 bg-red-100 text-red-700 rounded border">
                    {error}
                </div>
            )}

            <div className="px-6 space-y-8">
                {hasSections ? (
                    exam.sections.map((section, i) => {
                        const sectionQuestions = grouped[i] || []
                        if (!sectionQuestions.length) return null

                        return (
                            <QuestionSection
                                key={section._id || i}
                                section={section}
                                sectionIndex={i}
                                questions={sectionQuestions}
                                answers={answers}
                                onAnswerChange={(qid, val) =>
                                    setAnswers((prev) => ({
                                        ...prev,
                                        [qid]: val,
                                    }))
                                }
                            />
                        )
                    })
                ) : (
                    <QuestionSection
                        section={{ title: '' }}
                        sectionIndex={0}
                        questions={shuffledQuestions}
                        answers={answers}
                        onAnswerChange={(qid, val) =>
                            setAnswers((prev) => ({ ...prev, [qid]: val }))
                        }
                    />
                )}
            </div>

            <div className="px-6 mt-8 flex justify-end">
                <button
                    onClick={() => setShowModal(true)}
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded text-white font-semibold transition ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Xác nhận nộp bài</h2>
                        <p className="mb-6">Bạn có chắc chắn muốn nộp bài không?</p>
                        <div className="flex justify-end  gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    handleSubmit()
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ✅ Nộp bài thành công!
                </div>
            )}

            {showFail && (
                <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ❌ {failMessage}
                </div>
            )}
        </div>
    )
}

export default ExamDoingPage
