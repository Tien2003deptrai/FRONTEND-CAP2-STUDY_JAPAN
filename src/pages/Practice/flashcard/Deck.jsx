import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import { LoadingOverlay } from '@mantine/core'
import { Book, PlayArrow } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Deck() {
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
                    <Link key={deck._id} to={`${deck._id}`} className="group">
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
                                <span>{deck?.flashcardCount || 0} thẻ</span>
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
    )
}

export default Deck
