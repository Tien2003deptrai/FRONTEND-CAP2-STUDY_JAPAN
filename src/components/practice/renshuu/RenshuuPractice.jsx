import { useState } from 'react'
import {
    Button,
    Typography,
    Paper,
    Box,
    Chip,
    Snackbar,
    Alert,
} from '@mui/material'
import RenshuuQuestionCard from './RenshuuQuestionCard'
import axiosInstance from '@/network/httpRequest'

export default function RenshuuPractice({
    questions,
    lessonTitle,
    answers,
    onSelect,
    onBack,
    renshuuId,
}) {
    const [result, setResult] = useState(null)
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'success',
    })

    const handleSubmit = async () => {
        const hasAnsweredAll = questions.every((q) => answers[q._id])
        if (!hasAnsweredAll) {
            setToast({
                open: true,
                message: '❗ Vui lòng chọn đáp án cho tất cả các câu hỏi.',
                severity: 'warning',
            })
            return
        }

        try {
            const formattedAnswers = Object.entries(answers).map(
                ([questionId, selectedAnswer]) => ({
                    questionId,
                    selectedAnswer,
                })
            )

            const res = await axiosInstance.post(
                `/renshuu/submit/${renshuuId}`,
                {
                    answers: formattedAnswers,
                }
            )

            setResult(res.data.data)
            setToast({
                open: true,
                message: '🎉 Đã nộp bài thành công!',
                severity: 'success',
            })
        } catch (err) {
            console.error('❌ Submit failed:', err)
            setToast({
                open: true,
                message: '❌ Gặp lỗi khi nộp bài.',
                severity: 'error',
            })
        }
    }

    const handleCloseToast = () => setToast({ ...toast, open: false })

    if (result) {
        return (
            <Paper
                elevation={3}
                className="p-6 rounded-2xl bg-white shadow-xl border border-green-200"
            >
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={toast.open}
                    autoHideDuration={4000}
                    onClose={handleCloseToast}
                >
                    <Alert
                        onClose={handleCloseToast}
                        severity={toast.severity}
                        variant="filled"
                    >
                        {toast.message}
                    </Alert>
                </Snackbar>

                <Typography
                    variant="h5"
                    className="text-green-600 font-bold mb-4"
                >
                    🎉 Kết quả luyện tập
                </Typography>
                <Typography className="mb-2">
                    Tổng số câu hỏi: {result.totalQuestions}
                </Typography>
                <Typography className="mb-6">
                    Số câu đúng: {result.correctAnswers}
                </Typography>

                <div className="space-y-4">
                    {result.results.map((item, index) => (
                        <Box
                            key={item.questionId}
                            className={`p-4 rounded-xl border ${item.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-200 bg-red-50'}`}
                        >
                            <Typography className="font-medium mb-2">
                                📝 Câu {index + 1}: {item.question}
                            </Typography>
                            <div className="flex flex-col gap-1 text-sm">
                                <Chip
                                    label={`Bạn chọn: ${item.selectedAnswer}`}
                                    color={
                                        item.isCorrect ? 'success' : 'default'
                                    }
                                    size="small"
                                />
                                <Chip
                                    label={`Đáp án đúng: ${item.correctAnswer}`}
                                    color="success"
                                    size="small"
                                />
                                {item.isCorrect ? (
                                    <Chip
                                        label="✔ Đúng"
                                        color="success"
                                        size="small"
                                    />
                                ) : (
                                    <Chip
                                        label="✖ Sai"
                                        color="error"
                                        size="small"
                                    />
                                )}
                            </div>
                        </Box>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Button variant="outlined" onClick={onBack} color="primary">
                        🔁 Làm bài khác
                    </Button>
                </div>
            </Paper>
        )
    }

    return (
        <Paper
            elevation={3}
            className="p-6 rounded-2xl bg-white shadow-xl border border-red-200"
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={toast.open}
                autoHideDuration={4000}
                onClose={handleCloseToast}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity={toast.severity}
                    variant="filled"
                >
                    {toast.message}
                </Alert>
            </Snackbar>

            <Button
                onClick={onBack}
                variant="outlined"
                color="error"
                className="mb-6"
            >
                ← Quay lại danh sách bài học
            </Button>

            <Typography variant="h5" className="text-[#d32f2f] font-bold mb-6">
                📚 Bài luyện: {lessonTitle}
            </Typography>

            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <RenshuuQuestionCard
                        key={q._id}
                        index={idx}
                        question={q}
                        selected={answers[q._id]}
                        onSelect={onSelect}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    className="px-10 py-3 rounded-xl shadow-md hover:shadow-lg text-base font-semibold"
                    onClick={handleSubmit}
                >
                    Nộp bài
                </Button>
            </div>
        </Paper>
    )
}
