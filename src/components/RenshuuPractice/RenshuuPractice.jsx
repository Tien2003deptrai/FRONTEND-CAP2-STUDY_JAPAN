import { useState, useEffect } from 'react'
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ReplayIcon from '@mui/icons-material/Replay'
import SchoolIcon from '@mui/icons-material/School'
import axiosInstance from '@/network/httpRequest'

function RenshuuPractice({ lessonId }) {
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axiosInstance.get(`/renshuu/${lessonId}`)
                const rawQuestions = res?.data?.data?.questions || []
                const formatted = rawQuestions.map((q) => ({
                    question:
                        typeof q.content === 'string'
                            ? q.content
                            : q.content?.text || '',
                    options: q.options.map((o) => ({
                        id: o.id,
                        text: o.text,
                    })),
                    answer: q.correctAnswer,
                }))
                setQuestions(formatted)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error)
            }
        }

        if (lessonId) fetchQuestions()
    }, [lessonId])

    const handleAnswer = (optionId) => {
        if (finished || selectedAnswer) return

        setSelectedAnswer(optionId)
        if (optionId === questions[currentIndex].answer) {
            setScore((prev) => prev + 1)
        }

        setTimeout(() => {
            const next = currentIndex + 1
            if (next < questions.length) {
                setCurrentIndex(next)
                setSelectedAnswer(null)
            } else {
                setFinished(true)
            }
        }, 900)
    }

    const restart = () => {
        setScore(0)
        setCurrentIndex(0)
        setFinished(false)
        setSelectedAnswer(null)
    }

    if (!questions.length) {
        return
    }

    const currentQ = questions[currentIndex]
    const progress = Math.round((currentIndex / questions.length) * 100)

    return (
        <Box mt={10} px={2} my={5}>
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                mb={4}
            >
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Luyện tập
            </Typography>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 8, borderRadius: 5, mb: 4 }}
            />

            <Paper
                elevation={6}
                sx={{
                    maxWidth: 700,
                    mx: 'auto',
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
            >
                {!finished ? (
                    <>
                        <Typography
                            variant="h6"
                            color="primary"
                            fontWeight="bold"
                            mb={2}
                        >
                            Câu {currentIndex + 1} / {questions.length}
                        </Typography>

                        <Typography variant="h5" fontWeight="600" mb={3}>
                            {currentQ.question}
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={2}>
                            {currentQ.options.map((opt, idx) => {
                                const isCorrect =
                                    selectedAnswer && opt.id === currentQ.answer
                                const isWrong =
                                    selectedAnswer === opt.id &&
                                    opt.id !== currentQ.answer

                                return (
                                    <Button
                                        key={idx}
                                        variant="outlined"
                                        onClick={() => handleAnswer(opt.id)}
                                        disabled={!!selectedAnswer}
                                        fullWidth
                                        sx={{
                                            justifyContent: 'flex-start',
                                            p: 2,
                                            borderRadius: 2,
                                            fontSize: '1rem',
                                            backgroundColor: isCorrect
                                                ? '#e8f5e9'
                                                : isWrong
                                                  ? '#ffebee'
                                                  : '#f9f9f9',
                                            borderColor: isCorrect
                                                ? '#4caf50'
                                                : isWrong
                                                  ? '#f44336'
                                                  : 'rgba(0, 0, 0, 0.12)',
                                            color: isCorrect
                                                ? '#2e7d32'
                                                : isWrong
                                                  ? '#c62828'
                                                  : 'inherit',
                                            '&:hover': {
                                                backgroundColor: isCorrect
                                                    ? '#d0f0d5'
                                                    : isWrong
                                                      ? '#ffcdd2'
                                                      : '#e3f2fd',
                                                transform: 'scale(1.02)',
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {isCorrect && (
                                            <CheckCircleIcon sx={{ mr: 1 }} />
                                        )}
                                        {isWrong && (
                                            <HighlightOffIcon sx={{ mr: 1 }} />
                                        )}
                                        {opt.id}. {opt.text}
                                    </Button>
                                )
                            })}
                        </Box>
                    </>
                ) : (
                    <Box textAlign="center">
                        <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                            mb={2}
                        >
                            <CheckCircleIcon sx={{ color: '#4caf50', mr: 1 }} />
                            Hoàn thành luyện tập!
                        </Typography>
                        <Typography variant="h6" mb={3}>
                            Bạn trả lời đúng{' '}
                            <strong>
                                {score} / {questions.length}
                            </strong>{' '}
                            câu.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<ReplayIcon />}
                            onClick={restart}
                        >
                            Luyện lại
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default RenshuuPractice
