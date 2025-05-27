import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Button,
    Grid,
    Chip,
} from '@mui/material'
import useFetchAllVocabularies from '@/hooks/useFetchAllVocabularies'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const VocabularyList = () => {
    const {
        data: vocabularies = [],
        isLoading,
        isError,
    } = useFetchAllVocabularies()
    const [difficultWords, setDifficultWords] = useState(new Set())
    const [learnedWords, setLearnedWords] = useState(new Set())
    const [isFlashcardMode, setFlashcardMode] = useState(false)
    const [isQuizMode, setQuizMode] = useState(false)
    const [quizAnswer, setQuizAnswer] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const totalPages = Math.ceil(vocabularies.length / itemsPerPage)
    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentVocabularies = vocabularies.slice(indexOfFirst, indexOfLast)

    // Toggle difficult words
    const toggleDifficult = (id) => {
        const newSet = new Set(difficultWords)
        newSet.has(id) ? newSet.delete(id) : newSet.add(id)
        setDifficultWords(newSet)
    }

    // Toggle learned words
    const toggleLearned = (id) => {
        const newSet = new Set(learnedWords)
        newSet.has(id) ? newSet.delete(id) : newSet.add(id)
        setLearnedWords(newSet)
    }

    // Generate random quiz options for a vocabulary item
    const getRandomQuiz = (id) => {
        const options = ['Tình yêu', 'Núi', 'Trường học', 'Cây cối', 'Công ty']
        const correct = vocabularies.find((v) => v._id === id)?.meaning
        const quiz = [
            ...options.filter((o) => o !== correct).slice(0, 3),
            correct,
        ].sort(() => 0.5 - Math.random())
        setQuizAnswer((prev) => ({
            ...prev,
            [id]: { options: quiz, correct },
        }))
    }

    if (isLoading)
        return (
            <Typography textAlign="center" mt={5}>
                Đang tải từ vựng...
            </Typography>
        )
    if (isError)
        return (
            <Typography textAlign="center" mt={5} color="error">
                Không thể tải từ vựng
            </Typography>
        )

    return (
        <Box sx={{ px: 3, py: 5, maxWidth: '1200px', mx: 'auto' }}>
            <Box textAlign="center" mb={4}>
                <Button
                    variant={isFlashcardMode ? 'contained' : 'outlined'}
                    color="error"
                    sx={{ mx: 2, px: 4, py: 1, fontSize: 16 }}
                    onClick={() => {
                        setFlashcardMode(!isFlashcardMode)
                        setQuizMode(false)
                    }}
                >
                    Chế độ ẩn
                </Button>
                <Button
                    variant={isQuizMode ? 'contained' : 'outlined'}
                    color="error"
                    sx={{ mx: 2, px: 4, py: 1, fontSize: 16 }}
                    onClick={() => {
                        setQuizMode(!isQuizMode)
                        setFlashcardMode(false)
                        vocabularies.forEach((v) => getRandomQuiz(v._id))
                    }}
                >
                    Mini Quiz
                </Button>
            </Box>

            <Grid container spacing={4}>
                {currentVocabularies.map((vocab) => (
                    <Grid item xs={12} md={6} key={vocab._id}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: 6,
                                border: difficultWords.has(vocab._id)
                                    ? '2px solid crimson'
                                    : '1px solid #eee',
                                backgroundColor: learnedWords.has(vocab._id)
                                    ? '#fff5f5'
                                    : 'white',
                                transition: 'all 0.3s ease',
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Link
                                        to={`/practice/vocabulary/${vocab._id}`}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                            color="error.main"
                                            sx={{ fontSize: '1rem' }}
                                        >
                                            {isFlashcardMode
                                                ? '•••••'
                                                : vocab.word}
                                        </Typography>
                                    </Link>
                                    <Box>
                                        <IconButton
                                            onClick={() =>
                                                toggleDifficult(vocab._id)
                                            }
                                        >
                                            {difficultWords.has(vocab._id) ? (
                                                <BookmarkIcon color="error" />
                                            ) : (
                                                <BookmarkBorderIcon />
                                            )}
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                toggleLearned(vocab._id)
                                            }
                                        >
                                            <CheckCircleIcon
                                                color={
                                                    learnedWords.has(vocab._id)
                                                        ? 'success'
                                                        : 'disabled'
                                                }
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {!isFlashcardMode && (
                                    <>
                                        {/* Uncomment if you want to show additional info */}
                                        {/* <Typography variant="h6" sx={{ mt: 1 }}>
                      Kana: <strong>{vocab.kana}</strong> | Kanji: <strong>{vocab.kanji || '—'}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Nghĩa: {vocab.meaning}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Ví dụ: <i>{vocab.example}</i>
                    </Typography> */}
                                    </>
                                )}

                                {isQuizMode && quizAnswer[vocab._id] && (
                                    <Box mt={2}>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            Nghĩa của "{vocab.word}" là?
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexWrap="wrap"
                                            gap={1}
                                            mt={1}
                                        >
                                            {quizAnswer[vocab._id].options.map(
                                                (opt, i) => (
                                                    <Chip
                                                        key={i}
                                                        label={opt}
                                                        color={
                                                            opt ===
                                                            quizAnswer[
                                                                vocab._id
                                                            ].correct
                                                                ? 'success'
                                                                : 'default'
                                                        }
                                                    />
                                                )
                                            )}
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination controls */}
            <Box
                mt={4}
                display="flex"
                justifyContent="center"
                gap={2}
                alignItems="center"
            >
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    aria-label="Previous page"
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <Typography variant="body1" pt={1}>
                    Page {currentPage} / {totalPages}
                </Typography>

                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    aria-label="Next page"
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default VocabularyList
