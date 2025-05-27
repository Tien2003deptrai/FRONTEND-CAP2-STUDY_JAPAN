import FlashcardViewer from '@/components/practice/flashcard/FlashcardViewer'
import axiosInstance from '@/network/httpRequest'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography, IconButton, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

function Flashcard() {
    const { deckId } = useParams()
    const navigate = useNavigate()

    const getFlashcardsByDeckId = async () => {
        const res = await axiosInstance.get(`/flashcard/${deckId}`)
        return res.data.data
    }
    const { data: deckData } = useQuery({
        queryKey: ['flashcards', deckId],
        queryFn: getFlashcardsByDeckId,
    })

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3} sx={{ gap: 2 }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                    sx={{
                        bgcolor: 'error.light',
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.main',
                            color: 'common.white',
                        },
                        boxShadow: 2,
                        width: 48,
                        height: 48,
                    }}
                >
                    <ArrowBack fontSize="large" />
                </IconButton>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="error.main"
                    sx={{ flexGrow: 1, userSelect: 'none' }}
                >
                    Flashcard {deckData?.deck_title || ''}
                </Typography>
            </Box>

            {/* Divider with gradient */}
            <Box
                sx={{
                    height: 2,
                    mb: 4,
                    background:
                        'linear-gradient(90deg, #f8bbd0 0%, #f06292 50%, #f8bbd0 100%)',
                    borderRadius: 1,
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 3,
                    p: 3,
                    backgroundColor: '#fff0f5',
                    minHeight: 300,
                    animation: 'fadeIn 0.5s ease',
                }}
            >
                {deckData?.flashcard?.length > 0 ? (
                    <FlashcardViewer flashcards={deckData.flashcard} />
                ) : (
                    <Typography
                        color="text.secondary"
                        fontStyle="italic"
                        textAlign="center"
                        sx={{ mt: 6, userSelect: 'none' }}
                    >
                        Chưa có thẻ trong bộ này.
                    </Typography>
                )}
            </Box>

            {/* Keyframe animation */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </Container>
    )
}

export default Flashcard
