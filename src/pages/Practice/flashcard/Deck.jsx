import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import { LoadingOverlay, Button } from '@mantine/core'
import { Book, PlayArrow } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Deck() {
    const { data: decks, isLoading } = useFetchAllDecks()

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Grid of Decks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {decks?.map((deck) => (
                    <Link
                        key={deck._id}
                        to={`${deck._id}`}
                        aria-label={`Đi đến bộ flashcard ${deck.deck_title}`}
                        className="group"
                    >
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03] border border-gray-200 hover:border-red-600 p-6 flex flex-col justify-between h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                                    <Book fontSize="large" />
                                </div>
                                <h3 className="font-semibold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                                    {deck.deck_title}
                                </h3>
                            </div>
                            <div className="flex items-center justify-between text-red-600 text-sm font-medium">
                                <span>{deck?.flashcardCount || 0} thẻ</span>
                                <Button
                                    component="span"
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    className="flex items-center gap-1 font-semibold bg-red-600"
                                >
                                    Học ngay <PlayArrow fontSize="small" />
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {decks?.length === 0 && !isLoading && (
                <div className="text-center py-20">
                    <Book
                        className="mx-auto text-gray-300 mb-6"
                        sx={{ fontSize: 64 }}
                    />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        Chưa có bộ flashcard nào
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Hãy tạo bộ flashcard đầu tiên của bạn để bắt đầu học!
                    </p>
                    <Link to="/deck/create">
                        <Button variant="contained" color="error" size="medium">
                            Tạo bộ flashcard mới
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Deck
