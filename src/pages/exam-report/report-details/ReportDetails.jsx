import axiosInstance from '@/network/httpRequest'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ArrowBack } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ReportDetails() {
    const { examId, studentId } = useParams()
    const [opened, { open, close }] = useDisclosure(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const navigate = useNavigate()

    const getStudentResult = async () => {
        const res = await axiosInstance.get(
            `/exam/${examId}/student/${studentId}/result`
        )
        return res.data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['exam-student-result', examId, studentId],
        queryFn: getStudentResult,
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>
    }

    if (isError) {
        return <div>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</div>
    }

    const { user, totalScore, isPassed, timeSpent, answers } = data
    const handleOpenModal = (question) => {
        setSelectedQuestion(question)
        console.log(question)

        open()
    }
    return (
        <div className="p-6">
            {/* Back Button */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    className="p-2 text-primary rounded-full shadow-sm hover:bg-gray-100"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                >
                    <ArrowBack />
                </button>
                <h1 className="text-2xl font-bold">Chi tiết báo cáo</h1>
            </div>

            <hr className="my-4" />

            {/* Student Info */}
            <div className="flex flex-col gap-4 mb-6 ">
                <h2 className="text-xl font-semibold text-primary">
                    Thông tin học viên:
                </h2>
                <p>
                    <strong>Tên:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Thời gian làm bài:</strong> {timeSpent} phút
                </p>
                <p>
                    <strong>Điểm số:</strong> {totalScore}
                </p>
                <p>
                    <strong>Trạng thái:</strong>{' '}
                    <span
                        className={
                            isPassed
                                ? 'text-green-500 font-bold'
                                : 'text-red-500 font-bold'
                        }
                    >
                        {isPassed ? 'Đạt' : 'Không đạt'}
                    </span>
                </p>
            </div>

            <hr className="my-4" />

            {/* Answers */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-primary">
                    Chi tiết câu trả lời
                </h2>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-6 border-b">
                        <h3 className="text-lg font-semibold mb-2">
                            Part {index + 1}: {answer.paragraph}
                        </h3>
                        <div className="flex items-center gap-4 mb-2">
                            {answer.childAnswers.map((child, childIndex) => (
                                <div
                                    key={childIndex}
                                    onClick={() => handleOpenModal(child)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-solid cursor-pointer duration-150 ${
                                        child.isCorrect
                                            ? 'border-green-500 bg-green-100 text-green-500 hover:bg-green-500 hover:text-white'
                                            : 'border-red-500 text-red-500 bg-red-100 hover:bg-red-500 hover:text-white'
                                    }`}
                                >
                                    {childIndex + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Modal size={800} opened={opened} onClose={close}>
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    Chi tiết câu hỏi
                </h2>
                <hr />
                <div className="flex flex-col px-8 py-4 text-lg">
                    {selectedQuestion?.isCorrect ? (
                        <p className="text-white w-fit bg-green-500 rounded-3xl text-sm px-6 py-2 font-bold mb-4">
                            Đúng
                        </p>
                    ) : (
                        <p className="text-white w-fit bg-primary rounded-3xl text-sm px-6 py-2 font-bold mb-4">
                            Sai
                        </p>
                    )}
                    <p className="mb-4">{selectedQuestion?.content}</p>
                    <div className="flex flex-col gap-3">
                        {selectedQuestion?.options.map((option, index) => {
                            const isUserAnswer =
                                option.id === selectedQuestion?.userAnswer
                            const isCorrectAnswer =
                                option.id === selectedQuestion?.correctAnswer
                            const isWrongAnswer =
                                isUserAnswer && !selectedQuestion?.isCorrect

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            isCorrectAnswer
                                                ? 'border-green-500 bg-green-100'
                                                : isWrongAnswer
                                                  ? 'border-red-500 bg-red-100'
                                                  : 'border-gray-300'
                                        }`}
                                    >
                                        {isUserAnswer && (
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    isCorrectAnswer
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }`}
                                            ></div>
                                        )}
                                    </span>
                                    <span
                                        className={`${
                                            isCorrectAnswer
                                                ? 'text-green-500 font-bold'
                                                : isWrongAnswer
                                                  ? 'text-red-500 font-bold'
                                                  : ''
                                        }`}
                                    >
                                        {option.id.toUpperCase()}. {option.text}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    {!selectedQuestion?.isCorrect && (
                        <p className="text-green-500 font-bold mt-4">
                            Đáp án đúng là:{' '}
                            {selectedQuestion?.correctAnswer.toUpperCase()}
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default ReportDetails
