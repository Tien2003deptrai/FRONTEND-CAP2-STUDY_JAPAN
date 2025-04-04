import FlashcardViewer from '@/components/practice/flashcard/FlashcardViewer'
import axiosInstance from '@/network/httpRequest'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
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
        <div>
            <Box textAlign="center">
                <div className="w-full flex items-center gap-4">
                    <button
                        onClick={() => {
                            navigate(-1)
                        }}
                        className="hover:text-red-700 transition-colors duration-200 p-4"
                    >
                        <ArrowBack />
                    </button>
                    <Typography variant="h5" fontWeight="bold" color="error">
                        Flashcard {deckData?.deck_title}
                    </Typography>
                </div>
                <hr className="my-5" />
                <Box>
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
