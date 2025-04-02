<<<<<<< Updated upstream
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
=======
import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import { LoadingOverlay } from '@mantine/core'
import { Book, PlayArrow } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Flashcard() {
    const { data: decks, isLoading } = useFetchAllDecks()

    return (
        <div className="py-12 mx-auto">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Header */}
            <div className="flex justify-between items-center w-full mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Bộ Flashcards
                </h1>
            </div>

            {/* Grid of Decks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks?.map((deck) => (
                    <Link
                        key={deck._id}
                        to={`/study/${deck._id}`}
                        className="group"
                    >
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                    <Book />
                                </div>
                                <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                    {deck.deck_title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{deck.cards?.length || 0} thẻ</span>
                                <div className="flex items-center gap-1 text-red-600">
                                    <span>Học ngay</span>
                                    <PlayArrow className="text-sm" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {decks?.length === 0 && (
                <div className="text-center py-12">
                    <Book
                        className="mx-auto text-gray-400 mb-4"
                        style={{ fontSize: '48px' }}
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chưa có bộ flashcard nào
                    </h3>
                    <p className="text-gray-500">
                        Hãy tạo bộ flashcard đầu tiên của bạn để bắt đầu học!
                    </p>
                </div>
            )}
        </div>
>>>>>>> Stashed changes
    )
}

export default Flashcard
