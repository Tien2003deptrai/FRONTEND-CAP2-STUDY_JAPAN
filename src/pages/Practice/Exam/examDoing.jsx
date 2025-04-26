'use client'

import QuestionNavigator from '@/components/practice/question/QuestionNavigator'
import QuestionSection from '@/components/practice/question/QuestionSection'
import SubmitConfirmModal from '@/components/practice/question/SubmitConfirmModal'
import { useExamTake, useSubmitExam } from '@/hooks/useExam'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ExamDoingPage = () => {
    const { attemptId: paramAttemptId } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error: examError } = useExamTake(paramAttemptId)
    const { mutate: submitExam, isLoading: isSubmitting } = useSubmitExam()
    const [exam, setExam] = useState(null)
    const [correctAttemptId, setCorrectAttemptId] = useState(null)

    const [answers, setAnswers] = useState({})
    const [timeLeft, setTimeLeft] = useState(null)
    const [groupedQuestions, setGroupedQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const questionRefs = useRef({})

    useEffect(() => {
        if (data) {
            setExam(data.exam)
            setCorrectAttemptId(data.attemptId)

            // Process questions immediately after setting exam
            if (Array.isArray(data.exam?.questions)) {
                const grouped = data.exam.questions.map((q) => [
                    ...(q.childQuestions || []),
                ])
                setGroupedQuestions(grouped)
                data.exam.questions.forEach((q) => {
                    q.childQuestions?.forEach((child) => {
                        questionRefs.current[child._id] = React.createRef()
                    })
                })
            }
        }
    }, [data])

    useEffect(() => {
        if (!exam || !exam.time_limit || !correctAttemptId) return

        const now = Date.now()
        const saved = localStorage.getItem(`exam_timer_${correctAttemptId}`)
        let startTime = now

        if (saved) {
            try {
                startTime = JSON.parse(saved).startTime
            } catch {
                startTime = now
            }
        } else {
            localStorage.setItem(
                `exam_timer_${correctAttemptId}`,
                JSON.stringify({ startTime })
            )
        }

        const duration = exam.time_limit * 60
        const elapsed = Math.floor((now - startTime) / 1000)
        const remaining = Math.max(0, duration - elapsed)

        setTimeLeft(remaining)

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    handleSubmit(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [exam, correctAttemptId])

    const handleAnswerChange = (qid, val) => {
        setAnswers((prev) => ({ ...prev, [qid]: val }))
        const ref = questionRefs.current[qid]
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => window.scrollBy(0, -80), 300)
        }
    }

    const handleSubmit = useCallback(
        async (isAutoSubmit = false) => {
            if (!correctAttemptId) {
                setErrorMessage('Không tìm thấy ID lần thi. Vui lòng thử lại.')
                return
            }
            if (!exam?.questions) {
                setErrorMessage('Không tìm thấy câu hỏi trong bài thi.')
                return
            }
            //childQuestion
            const getQuestionById = (questionId) => {
                for (const section of exam.questions) {
                    const childQuestion = section.childQuestions?.find(
                        (child) => child._id === questionId
                    )
                    if (childQuestion) return childQuestion
                }
                return null
            }
            // check ans
            const getAnswerValue = (questionId, answer) => {
                const q = getQuestionById(questionId)
                if (!q) {
                    console.warn(`Câu hỏi ${questionId} không tìm thấy.`)
                    return answer
                }
                if (q.type === 'multiple_choice') {
                    return String(answer).toLowerCase()
                }
                return String(answer).trim()
            }

            console.log('Answers trước khi xử lý:', answers)
            //dinh dang
            const formattedAnswers = Object.entries(answers)
                .filter(([, val]) => val !== undefined && val !== '')
                .map(([questionId, answer]) => {
                    const q = getQuestionById(questionId)
                    if (!q) {
                        console.warn(`Câu hỏi ${questionId} không hợp lệ.`)
                        return null
                    }
                    return {
                        questionId,
                        answer: getAnswerValue(questionId, answer),
                    }
                })
                .filter((item) => item !== null)

            console.log('Formatted Answers:', formattedAnswers)

            if (formattedAnswers.length === 0) {
                setErrorMessage(
                    'Vui lòng trả lời ít nhất một câu hỏi trước khi nộp bài.'
                )
                return
            }

            console.log('Dữ liệu gửi lên:', {
                attemptId: correctAttemptId,
                answers: formattedAnswers,
            })

            try {
                submitExam(
                    { attemptId: correctAttemptId, answers: formattedAnswers },
                    {
                        onSuccess: (res) => {
                            console.log(res)

                            if (res?.attemptId) {
                                setTimeout(() => {
                                    navigate(
                                        `/practice/exam/result/${res.attemptId}`,
                                        { state: { res } }
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
        [answers, correctAttemptId, exam, navigate, submitExam]
    )

    if (isLoading)
        return <div className="text-center p-8">Đang tải đề thi...</div>
    if (examError || !exam)
        return (
            <div className="text-center p-8 text-red-600">
                Lỗi khi tải đề thi:{' '}
                {examError?.message || 'Không tìm thấy bài thi'}
            </div>
        )

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
