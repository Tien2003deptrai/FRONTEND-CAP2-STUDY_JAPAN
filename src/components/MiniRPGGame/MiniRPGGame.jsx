import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Modal,
    Grid,
    Fade,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'

function MiniRPGGame() {
    const { user } = useAuthStore()
    const defaultName = user?.name || user?.email?.split('@')[0] || ''

    const [searchParams] = useSearchParams()
    const lessonId = searchParams.get('lessonId')

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [current, setCurrent] = useState(0)
    const [playerName, setPlayerName] = useState(defaultName)
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [showNameInput, setShowNameInput] = useState(!defaultName)
    const [timeLeft, setTimeLeft] = useState(10)
    const [leaderboard, setLeaderboard] = useState([])
    const [openLeaderboard, setOpenLeaderboard] = useState(false)

    const audioRef = useRef(null)
    const correctRef = useRef(null)
    const wrongRef = useRef(null)
    const attackRef = useRef(null)
    console.log('playerName', playerName)
    console.log('avatar', user?.avatar)
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axiosInstance.get(`/renshuu/${lessonId}`)
                const rawQuestions = res?.data?.data?.questions || []
                const sanitized = rawQuestions.map((q) => ({
                    question:
                        typeof q.content === 'string'
                            ? q.content
                            : q.content?.text || '[Không có nội dung]',
                    options: Array.isArray(q.options)
                        ? q.options.map((o) => ({
                              id: o?.id,
                              text: o?.text || '[Không rõ đáp án]',
                          }))
                        : [],
                    answer: q.correctAnswer,
                }))
                setQuestions(sanitized)
            } catch (error) {
                console.error('Lỗi lấy câu hỏi:', error)
            } finally {
                setLoading(false)
            }
        }

        const fetchLeaderboard = async () => {
            try {
                const res = await axiosInstance.get(
                    'progress/mini-rpg-history',
                    {
                        params: { userId: user._id },
                    }
                )
                console.log('res', res)
                setLeaderboard(res.data?.data || [])
            } catch (err) {
                console.error('Lỗi lấy bảng xếp hạng:', err)
            }
        }

        if (lessonId) fetchQuestions()
        if (user?._id) fetchLeaderboard()
    }, [lessonId, user?._id])

    const handleAnswer = async (optionId) => {
        if (gameOver) return
        const isCorrect = optionId === questions[current]?.answer

        if (isCorrect) {
            correctRef.current?.play()
            attackRef.current?.play()
            setScore((prev) => prev + 10)
            setMessage('🎉 Đúng rồi!')
        } else {
            wrongRef.current?.play()
            setMessage('💢 Sai rồi!')
        }

        setTimeout(async () => {
            const next = current + 1
            if (next >= questions.length) {
                setGameOver(true)
                try {
                    await axiosInstance.post('progress/mini-rpg-result', {
                        userId: user._id,
                        name: playerName, // 👈 truyền lên từ client
                        score,
                        totalQuestions: questions.length,
                        duration: questions.length * 10, // hoặc tính toán thực tế
                    })

                    // console.log('res', res)
                } catch (err) {
                    console.error('Lưu kết quả thất bại:', err)
                }
            } else {
                setCurrent(next)
                setMessage('')
                setTimeLeft(10)
            }
        }, 800)
    }

    const restartGame = () => {
        setScore(0)
        setCurrent(0)
        setGameOver(false)
        setMessage('')
        setShowNameInput(!defaultName)
        setPlayerName(defaultName)
        setTimeLeft(10)
    }

    const startGame = () => {
        if (playerName.trim() !== '') {
            setShowNameInput(false)
            audioRef.current.volume = 0.5
            audioRef.current.loop = true
            audioRef.current.play().catch(() => {})
        }
    }

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setInterval(
                () => setTimeLeft((prev) => prev - 1),
                1000
            )
            return () => clearInterval(timer)
        } else if (timeLeft === 0) {
            handleAnswer('')
        }
    }, [timeLeft, gameOver])

    if (loading) {
        return (
            <Typography textAlign="center" mt={5}>
                ⏳ Đang tải câu hỏi...
            </Typography>
        )
    }

    if (!questions.length) {
        return (
            <Typography color="error" textAlign="center" mt={5}>
                ⚠️ Không có câu hỏi nào.
            </Typography>
        )
    }

    return (
        <Box textAlign="center" mt={5} px={2}>
            <audio
                ref={audioRef}
                src="https://www.bensound.com/bensound-music/bensound-funkyelement.mp3"
            />
            <audio
                ref={correctRef}
                src="https://www.soundjay.com/button/sounds/button-3.mp3"
            />
            <audio
                ref={wrongRef}
                src="https://www.soundjay.com/button/sounds/button-10.mp3"
            />
            <audio
                ref={attackRef}
                src="https://www.soundjay.com/button/sounds/button-9.mp3"
            />

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="error"
                    gutterBottom
                >
                    🧠 Mini RPG Quiz Game
                </Typography>
            </motion.div>

            {showNameInput ? (
                <Fade in={showNameInput} timeout={600}>
                    <Paper
                        elevation={6}
                        sx={{ maxWidth: 400, mx: 'auto', p: 3 }}
                    >
                        <Typography variant="h6">Nhập tên của bạn</Typography>
                        <TextField
                            fullWidth
                            label="Tên người chơi"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={startGame}
                            fullWidth
                        >
                            Bắt đầu
                        </Button>
                    </Paper>
                </Fade>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper
                            elevation={4}
                            sx={{ p: 3, maxWidth: 600, mx: 'auto' }}
                        >
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Câu {current + 1} / {questions.length}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {questions[current]?.question}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <img src={user?.avatar} width={120} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap={2}
                                        mt={2}
                                    >
                                        {questions[current]?.options.map(
                                            (option, i) => (
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={i}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() =>
                                                            handleAnswer(
                                                                option.id
                                                            )
                                                        }
                                                        fullWidth
                                                        disabled={gameOver}
                                                    >
                                                        {option.id}.{' '}
                                                        {option.text}
                                                    </Button>
                                                </motion.div>
                                            )
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Typography mt={3} color="secondary">
                                Thời gian: {timeLeft}s
                            </Typography>
                            <Typography mt={2}>{message}</Typography>
                            <Typography mt={1}>🔥 Điểm: {score}</Typography>

                            {gameOver && (
                                <Box mt={4}>
                                    <Button
                                        variant="outlined"
                                        onClick={restartGame}
                                    >
                                        Chơi lại
                                    </Button>
                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                setOpenLeaderboard(true)
                                            }
                                        >
                                            🏆 Xem bảng xếp hạng
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    </motion.div>
                </AnimatePresence>
            )}

            <Modal
                open={openLeaderboard}
                onClose={() => setOpenLeaderboard(false)}
                closeAfterTransition
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openLeaderboard}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 3,
                            textAlign: 'center',
                            borderRadius: '12px',
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            🏆 Bảng xếp hạng
                        </Typography>
                        {leaderboard.map((entry, index) => (
                            <Typography
                                key={index}
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color:
                                        index === 0
                                            ? 'gold'
                                            : index === 1
                                              ? 'silver'
                                              : index === 2
                                                ? 'peru'
                                                : 'black',
                                    mt: 1,
                                }}
                            >
                                {index + 1}. {entry.name} - {entry.score} điểm
                            </Typography>
                        ))}
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                onClick={() => setOpenLeaderboard(false)}
                            >
                                Đóng
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

export default MiniRPGGame
