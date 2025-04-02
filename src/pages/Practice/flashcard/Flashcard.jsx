import FlashcardViewer from '@/components/practice/flashcard/FlashcardViewer'
import axiosInstance from '@/network/httpRequest'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

function Flashcard() {
    const { deckId } = useParams()
    const getFlashcardsByDeckId = async () => {
        const res = await axiosInstance.get(`/flashcard/${deckId}`)
        return res.data.data
    }
    const { data: deckData } = useQuery({
        queryKey: ['flashcards', deckId],
        queryFn: getFlashcardsByDeckId,
    })

    return (
        <div>
            <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="error" mb={4}>
                    🃏 Flashcard {deckData?.deck_title}
                </Typography>

                <Box mt={5}>
                    {deckData?.flashcard.length > 0 ? (
                        <FlashcardViewer flashcards={deckData.flashcard} />
                    ) : (
                        <Typography color="text.secondary" fontStyle="italic">
                            Chưa có thẻ trong bộ này.
                        </Typography>
                    )}
                </Box>
            </Box>
        </div>
    )
}

export default Flashcard
