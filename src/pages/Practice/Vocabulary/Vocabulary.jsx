import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useVocabulary } from '@/hooks/useVocabulary'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Divider,
    Button,
    Grid,
    Chip
} from '@mui/material'

const VocabularyList = () => {
    const { lesson_id } = useParams()
    const { data: vocabularies, isLoading, isError } = useVocabulary(lesson_id)

    const [difficultWords, setDifficultWords] = useState(new Set())
    const [learnedWords, setLearnedWords] = useState(new Set())
    const [isFlashcardMode, setFlashcardMode] = useState(false)
    const [isQuizMode, setQuizMode] = useState(false)
    const [quizAnswer, setQuizAnswer] = useState({})

    const toggleDifficult = (id) => {
        const newSet = new Set(difficultWords)
        newSet.has(id) ? newSet.delete(id) : newSet.add(id)
        setDifficultWords(newSet)
    }

    const toggleLearned = (id) => {
        const newSet = new Set(learnedWords)
        newSet.has(id) ? newSet.delete(id) : newSet.add(id)
        setLearnedWords(newSet)
    }

    const playAudio = (url) => {
        const audio = new Audio(url)
        audio.play()
    }

    const getRandomQuiz = (id) => {
        const options = ['Tình yêu', 'Núi', 'Đường phố', 'Trường học', 'Cây cối']
        const correct = vocabularies.find(v => v._id === id)?.meaning
        const quiz = [...options.filter(o => o !== correct).slice(0, 3), correct].sort(() => 0.5 - Math.random())
        setQuizAnswer({ id, options: quiz, correct })
    }

    if (isLoading || !vocabularies) {
        return <Typography textAlign="center" mt={5}>Đang tải từ vựng...</Typography>
    }

    if (isError) {
        return <Typography textAlign="center" mt={5} color="error">Không thể tải từ vựng</Typography>
    }

    return (
        <Box sx={{ px: 2, py: 4, maxWidth: '900px', mx: 'auto' }}>
            <Typography variant="h4" align="center" color="error.main" fontWeight="bold" mb={3}>
                📘 Nihongo Vocab Master
            </Typography>

            <Box textAlign="center" mb={3}>
                <Button
                    variant={isFlashcardMode ? 'contained' : 'outlined'}
                    color="error"
                    sx={{ mx: 1 }}
                    onClick={() => {
                        setFlashcardMode(!isFlashcardMode)
                        setQuizMode(false)
                    }}
                >
                    Flashcard Mode
                </Button>
                <Button
                    variant={isQuizMode ? 'contained' : 'outlined'}
                    color="error"
                    sx={{ mx: 1 }}
                    onClick={() => {
                        setQuizMode(!isQuizMode)
                        setFlashcardMode(false)
                        vocabularies.forEach(v => getRandomQuiz(v._id))
                    }}
                >
                    Quiz Mode
                </Button>
            </Box>

            <Grid container spacing={3}>
                {vocabularies.map((vocab) => (
                    <Grid item xs={12} md={6} key={vocab._id}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                border: difficultWords.has(vocab._id) ? '2px solid crimson' : '1px solid #eee',
                                backgroundColor: learnedWords.has(vocab._id) ? '#fff5f5' : 'white',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h5" fontWeight="bold" color="error.main">
                                        {isFlashcardMode ? '•••••' : vocab.word}
                                    </Typography>
                                    <Box>
                                        <IconButton onClick={() => toggleDifficult(vocab._id)}>
                                            {difficultWords.has(vocab._id) ? <BookmarkIcon color="error" /> : <BookmarkBorderIcon />}
                                        </IconButton>
                                        <IconButton onClick={() => toggleLearned(vocab._id)}>
                                            <CheckCircleIcon color={learnedWords.has(vocab._id) ? 'success' : 'disabled'} />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {!isFlashcardMode && (
                                    <>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            Kana: <strong>{vocab.kana}</strong> | Kanji: <strong>{vocab.kanji}</strong>
                                        </Typography>
                                        <Typography variant="body2">Nghĩa: {vocab.meaning}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>Ví dụ: <i>{vocab.example}</i></Typography>
                                        {vocab.audio && (
                                            <IconButton onClick={() => playAudio(vocab.audio)} size="small">
                                                <VolumeUpIcon />
                                            </IconButton>
                                        )}
                                    </>
                                )}

                                {isQuizMode && quizAnswer[vocab._id] && (
                                    <Box mt={2}>
                                        <Typography variant="body2" fontWeight="bold">Nghĩa của "{vocab.word}" là?</Typography>
                                        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                                            {quizAnswer[vocab._id].options.map((opt, i) => (
                                                <Chip
                                                    key={i}
                                                    label={opt}
                                                    color={opt === quizAnswer[vocab._id].correct ? 'success' : 'default'}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default VocabularyList