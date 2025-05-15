import useFetchAllDecks from '@/hooks/useFetchAllDecks'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, Edit, PlayArrow, Search } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function ManageFlashcard() {
    const { user } = useAuthStore()
    const [visibleItems, setVisibleItems] = useState(6)
    const [searchTerm, setSearchTerm] = useState('')

    const { data: decks, isLoading } = useFetchAllDecks()
    const queryClient = useQueryClient()

    const handleDeleteDeck = async (deckId) => {
        const confirm = await Swal.fire({
            title: 'Xóa bộ flashcard?',
            text: 'Hành động này sẽ xóa toàn bộ thẻ trong bộ này. Bạn chắc chứ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        })

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/deck/${deckId}`)
                await queryClient.invalidateQueries({ queryKey: ['all-decks'] })
                Swal.fire('Đã xóa!', 'Bộ flashcard đã được xóa.', 'success')
            } catch (error) {
                Swal.fire(
                    'Lỗi!',
                    error.response?.data?.message ||
                        'Không thể xóa bộ flashcard',
                    'error'
                )
            }
        }
    }

    const showMore = () => {
        setVisibleItems((prev) => prev + 5)
    }

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
                <h1 className="text-2xl font-bold text-gray-800">Bộ thẻ</h1>
                <div className="flex items-center justify-center gap-4">
                    {/* Search Bar */}
                    <div className="relative w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm flashcards..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                    <Link
                        to={'create-flashcard'}
                        className="primary-btn flex items-center gap-2"
                    >
                        <Add /> Tạo flashcards
                    </Link>
                </div>
            </div>
            <hr className="my-6" />

            {/* List of Decks */}
            <div className="grid grid-cols-3 gap-6">
                {visibleDecks?.map((deck) => (
                    <div
                        key={deck._id}
                        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Icon and Deck Title */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-full">
                                <Book />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                                {deck.deck_title}
                            </h3>
                        </div>

                        {/* Flashcard Count */}
                        <h4 className="text-sm text-gray-500 mb-2">
                            {deck.flashcardCount} Thuật ngữ
                        </h4>

                        {/* User Info with Avatar */}
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={deck.user.avatar}
                                alt={deck.user.name}
                                className="w-10 h-10 rounded-full border-2 border-gray-300"
                            />
                            <span className="font-medium text-gray-900">
                                {deck.user.name} - Giáo viên
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to={`study/${deck._id}`}
                                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Học ngay"
                            >
                                <PlayArrow />
                            </Link>
                            {deck?.user?._id == user?._id && (
                                <div>
                                    <Link
                                        to={`edit/${deck._id}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteDeck(deck._id)
                                        }
                                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Xóa"
                                    >
                                        <Delete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

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
                        {searchTerm}."
                    </p>
                </div>
            )}

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
