import { useEffect, useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { Box, Typography } from '@mui/material'
import DeckSelector from '@/components/practice/flashcard/DeckSelector'
import FlashcardViewer from '@/components/practice/flashcard/FlashcardViewer'

function Flashcard() {
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState(null)
    const [flashcards, setFlashcards] = useState([])

    // Get decks
    useEffect(() => {
        axiosInstance.get('/deck/user').then((res) => {
            if (res.data.success) {
                setDecks(res.data.data)
                setSelectedDeck(res.data.data[0]?._id || null)
            }
        })
    }, [])

    useEffect(() => {
        if (selectedDeck) {
            axiosInstance.get(`/flashcard/${selectedDeck}`).then((res) => {
                if (res.data.success) {
                    setFlashcards(res.data.data.flashcard)
                }
            })
        }
    }, [selectedDeck])

    return (
        <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="error" mb={4}>
                🃏 Luyện tập Flashcard
            </Typography>

            <DeckSelector
                decks={decks}
                selectedId={selectedDeck}
                onChange={(id) => setSelectedDeck(id)}
            />

            <Box mt={5}>
                {flashcards.length > 0 ? (
                    <FlashcardViewer flashcards={flashcards} />
                ) : (
                    <Typography color="text.secondary" fontStyle="italic">
                        Chưa có thẻ trong bộ này.
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
export default Flashcard
