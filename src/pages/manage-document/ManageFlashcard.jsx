import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, Edit, PlayArrow, Search } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ManageFlashcard() {
    const [visibleItems, setVisibleItems] = useState(5)
    const [searchTerm, setSearchTerm] = useState('')

    const { data: decks, isLoading } = useFetchAllDecks()

    const showMore = () => {
        setVisibleItems((prev) => prev + 5)
    }

    // Filter decks based on search term
    const filteredDecks = decks?.filter((deck) =>
        deck.deck_title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const visibleDecks = filteredDecks?.slice(0, visibleItems)
    const hasMore = filteredDecks?.length > visibleItems

    return (
        <div className="p-6 mx-auto">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold text-gray-800">Flashcards</h1>
                <div className="flex items-center justify-center gap-4">
                    {/* Search Bar */}
                    <div className=" relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm flashcards..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                    <Link
                        to={'create-flashcard'}
                        className="second-btn flex items-center gap-2"
                    >
                        <Add /> Tạo flashcards
                    </Link>
                </div>
            </div>
            <hr className="my-6" />

            {/* List of Decks */}
            <div className="flex flex-col gap-4">
                {visibleDecks?.reverse().map((deck) => (
                    <div
                        key={deck._id}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <Book />
                            </div>
                            <h3 className="font-medium text-gray-900">
                                {deck.deck_title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to={`/study/${deck._id}`}
                                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Học ngay"
                            >
                                <PlayArrow />
                            </Link>
                            <button
                                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Chỉnh sửa"
                            >
                                <Edit />
                            </button>
                            <button
                                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Xóa"
                            >
                                <Delete />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Show More Button */}
                {hasMore && (
                    <button
                        onClick={showMore}
                        className="mt-4 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center font-medium mx-auto"
                    >
                        Xem thêm
                    </button>
                )}

                {/* No Results Message */}
                {filteredDecks?.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            Không tìm thấy flashcard nào phù hợp với từ khóa "
                            {searchTerm}"
                        </p>
                    </div>
                )}
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
                    <p className="text-gray-500 mb-6">
                        Hãy tạo bộ flashcard đầu tiên của bạn để bắt đầu học!
                    </p>
                    <Link
                        to={'create-flashcard'}
                        className="primary-btn inline-flex items-center gap-2"
                    >
                        <Add /> Tạo flashcards
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ManageFlashcard
