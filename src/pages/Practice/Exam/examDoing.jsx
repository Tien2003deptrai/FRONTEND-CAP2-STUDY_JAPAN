import QuestionNavigator from '@/components/practice/question/QuestionNavigator'
import QuestionSection from '@/components/practice/question/QuestionSection'
import SubmitConfirmModal from '@/components/practice/question/SubmitConfirmModal'
import { useExamTake, useSubmitExam } from '@/hooks/useExam'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ExamDoingPage = () => {
    const { exam_id } = useParams()
    const navigate = useNavigate()

    const { data, isLoading, error: examError } = useExamTake(exam_id)
    const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam()

    const [exam, setExam] = useState(null)
    const [attemptId, setAttemptId] = useState(null)
    const [answers, setAnswers] = useState({})
    const [timeLeft, setTimeLeft] = useState(null)
    const [groupedQuestions, setGroupedQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const questionRefs = useRef({})
    const timerRef = useRef(null)

    const handleSubmit = useCallback(
        async (isAutoSubmit = false) => {
            if (!attemptId) {
                setErrorMessage('Không tìm thấy ID lần thi. Vui lòng thử lại.')
                return
            }
            if (!exam?.questions) {
                setErrorMessage('Không tìm thấy câu hỏi trong bài thi.')
                return
            }

            const allQuestionIds = exam.questions
                .flatMap((section) => section.childQuestions || [])
                .map((child) => child._id)

            const unansweredQuestionId = allQuestionIds.find(
                (questionId) => !answers[questionId]
            )

            if (unansweredQuestionId && !isAutoSubmit) {
                setErrorMessage(
                    'Bạn cần trả lời đầy đủ tất cả câu hỏi trước khi nộp bài.'
                )
                return
            }

            const getQuestionById = (questionId) => {
                for (const section of exam.questions) {
                    const child = section.childQuestions?.find(
                        (c) => c._id === questionId
                    )
                    if (child) return child
                }
                return null
            }

            const getAnswerValue = (questionId, answer) => {
                const q = getQuestionById(questionId)
                if (!q) {
                    console.warn(`Câu hỏi ${questionId} không tìm thấy.`)
                    return answer
                }
                if (q.type === 'multiple_choice') {
                    return String(answer || '').toLowerCase()
                }
                return String(answer || '').trim()
            }

            const formattedAnswers = allQuestionIds.map((questionId) => ({
                questionId,
                answer: getAnswerValue(questionId, answers[questionId] ?? ''),
            }))

            try {
                submitExam(
                    { attemptId: attemptId, answers: formattedAnswers },
                    {
                        onSuccess: (res) => {
                            if (res?.attemptId) {
                                setTimeout(() => {
                                    navigate(
                                        `/practice/exam/result/${res.attemptId}`
                                    )
                                }, 500)
                            } else {
                                setErrorMessage(
                                    'Không nhận được ID bài thi. Vui lòng thử lại.'
                                )
                            }
                        },
                        onError: (err) => {
                            const message =
                                err?.response?.data?.message ||
                                err.message ||
                                'Lỗi không xác định'
                            console.error('Chi tiết lỗi:', err.response?.data)
                            setErrorMessage(
                                isAutoSubmit
                                    ? `Hết thời gian! Bài thi đã được gửi nhưng có lỗi: ${message}`
                                    : `Lỗi khi nộp bài: ${message}`
                            )
                        },
                    }
                )
            } catch (error) {
                console.error('Lỗi hệ thống:', error)
                setErrorMessage('Lỗi hệ thống khi nộp bài: ' + error.message)
            }
        },
        [answers, attemptId, exam, navigate, submitExam]
    )

    useEffect(() => {
        if (isLoading) return

        if (!data) {
            setErrorMessage('Không thể tải thông tin bài thi')
            return
        }

        const { exam: examData, attemptId: newAttemptId } = data

        if (!examData || !newAttemptId) {
            setErrorMessage('Không thể tải thông tin bài thi')
            return
        }

        setErrorMessage('')

        setExam(examData)
        setAttemptId(newAttemptId)

        if (Array.isArray(examData.questions)) {
            const grouped = examData.questions.map(q => [...(q.childQuestions || [])])
            setGroupedQuestions(grouped)

            const refs = {}
            examData.questions.forEach(q => {
                q.childQuestions?.forEach(child => {
                    refs[child._id] = React.createRef()
                })
            })
            questionRefs.current = refs
        }

        if (examData.time_limit) {
            const now = Date.now()
            const saved = localStorage.getItem(`exam_timer_${newAttemptId}`)
            let startTime = now

            if (saved) {
                try {
                    startTime = JSON.parse(saved).startTime
                } catch {
                    startTime = now
                }
            } else {
                localStorage.setItem(
                    `exam_timer_${newAttemptId}`,
                    JSON.stringify({ startTime })
                )
            }

            const duration = examData.time_limit * 60
            const elapsed = Math.floor((now - startTime) / 1000)
            const remaining = Math.max(0, duration - elapsed)

            setTimeLeft(remaining)

            if (timerRef.current) {
                clearInterval(timerRef.current)
            }

            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current)
                        handleSubmit(true)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [data, isLoading])

    const handleAnswerChange = (qid, val) => {
        setAnswers((prev) => ({ ...prev, [qid]: val }))
        const ref = questionRefs.current[qid]
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => window.scrollBy(0, -80), 300)
        }
    }

    if (isLoading)
        return <div className="text-center p-8">Đang tải đề thi...</div>
    if (examError) {
        console.log('Exam error:', examError)
        return (
            <div className="text-center p-8 text-red-600">
                Lỗi khi tải đề thi: {examError?.message || 'Không tìm thấy bài thi'}
            </div>
        )
    }
    if (!exam) {
        console.log('Missing exam:', { exam, attemptId })
        return (
            <div className="text-center p-8 text-red-600">
                {errorMessage || 'Không tìm thấy bài thi'}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center px-6 py-4 bg-red-600 text-white rounded-b">
                <h1 className="text-2xl font-bold">{exam.title}</h1>
            </div>

            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-4 rounded mt-4 mx-6">
                    {errorMessage}
                </div>
            )}

            <div className="flex px-6 h-[calc(100vh-100px)] overflow-hidden gap-6 mt-6">
                <div className="w-60 bg-white shadow rounded-lg overflow-y-auto sticky top-6 max-h-[calc(100vh-120px)]">
                    <QuestionNavigator
                        groupedQuestions={groupedQuestions}
                        answers={answers}
                        timeLeft={timeLeft}
                    />
                </div>
            
                <div className="flex-1 overflow-y-auto pr-4">
                    {(exam.questions || []).map((q, idx) => (
                        <div key={q._id}>
                            <QuestionSection
                                section={q}
                                sectionIndex={idx}
                                questions={[q]}
                                answers={answers}
                                onAnswerChange={handleAnswerChange}
                                refs={questionRefs.current}
                            />
                        </div>
                    ))}

                    <div className="mt-8 text-right">
                        <button
                            onClick={() => setShowModal(true)}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                        </button>
                    </div>
                </div>
            </div>

            <SubmitConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setShowModal(false)
                    handleSubmit()
                }}
            />
        </div>
    )
}

export default ExamDoingPage
