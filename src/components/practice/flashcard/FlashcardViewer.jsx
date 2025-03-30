import { useState } from 'react'
import {
    Box,
    Typography,
    IconButton,
    Button,
    Stack,
    Paper,
    useTheme,
} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

function FlashcardViewer({ flashcards }) {
    const theme = useTheme()
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)

    const card = flashcards[index]

    const handleAudio = () => {
        if (card.vocab.audio) {
            const audio = new Audio(card.vocab.audio)
            audio.play()
        }
    }

    const nextCard = () => {
        setFlipped(false)
        setIndex((prev) => (prev + 1) % flashcards.length)
    }

    const prevCard = () => {
        setFlipped(false)
        setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <Box
                sx={{
                    width: { xs: '100%', sm: 500, md: 600 },
                    height: { xs: 300, sm: 350, md: 400 },
                    perspective: '1000px',
                    cursor: 'pointer',
                }}
                onClick={() => setFlipped(!flipped)}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: flipped ? 'rotateY(180deg)' : 'none',
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 3,
                            borderRadius: 3,
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? '#1e1e1e'
                                    : '#ffffff',
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            {card.vocab.word}
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            textAlign="center"
                        >
                            {card.vocab.kana}
                        </Typography>
                        {card.vocab.audio && (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAudio()
                                }}
                                color="error"
                                sx={{ mt: 2 }}
                            >
                                <VolumeUpIcon fontSize="large" />
                            </IconButton>
                        )}
                    </Paper>

                    <Paper
                        elevation={6}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 3,
                            borderRadius: 3,
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? '#2b2b2b'
                                    : '#fff7e6',
                        }}
                    >
                        <Typography variant="h4" textAlign="center">
                            {card.vocab.meaning}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mt={2}
                            sx={{ textAlign: 'center', fontStyle: 'italic' }}
                        >
                            {card.vocab.example}
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            <Stack direction="row" spacing={3}>
                <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    onClick={prevCard}
                >
                    ⬅️ Trước
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={nextCard}
                >
                    Tiếp ➡️
                </Button>
            </Stack>
        </Box>
    )
}

export default FlashcardViewer
