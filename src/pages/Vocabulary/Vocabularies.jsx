import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, PlayArrow, Search } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Vocabularies() {
    const [visibleItems, setVisibleItems] = useState(9) // 3 cột x 3 hàng ban đầu
    const [searchTerm, setSearchTerm] = useState('')
    const [vocabularies, setVocabularies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const queryClient = useQueryClient()

    useEffect(() => {
        const fetchVocabularies = async () => {
            try {
                const response = await axiosInstance.get('/vocabulary/all-AI')
                if (response.status === 200) {
                    setVocabularies(response.data.data)
                }
            } catch (error) {
                console.error('Error fetching vocabularies:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVocabularies()
    }, [])

    const handleDeleteVocab = async (vocabularyId) => {
        const confirm = await Swal.fire({
            title: 'Xóa từ vựng?',
            text: 'Hành động này sẽ xóa từ vựng này.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        })

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(
                    `/vocabulary/${vocabularyId}/no-lesson`
                )

                setVocabularies((prev) =>
                    prev.filter((vocab) => vocab._id !== vocabularyId)
                )

                await queryClient.invalidateQueries({
                    queryKey: ['all-vocabularies'],
                })

                Swal.fire('Đã xóa!', 'Từ vựng đã được xóa.', 'success')
            } catch (error) {
                Swal.fire(
                    'Lỗi!',
                    error.response?.data?.message || 'Không thể xóa từ vựng',
                    'error'
                )
            }
        }
    }

    const showMore = () => {
        setVisibleItems((prev) => prev + 9) // thêm 9 item cho mỗi lần xem thêm
    }

    const filteredVocabularies = vocabularies?.filter((vocab) =>
        vocab.word.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const visibleVocabularies = filteredVocabularies?.slice(0, visibleItems)
    const hasMore = filteredVocabularies?.length > visibleItems

    return (
        <div className="max-w-7xl mx-auto p-6">
            <LoadingOverlay visible={isLoading} overlayBlur={3} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/2 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-red-500" fontSize="medium" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm từ vựng..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 text-lg transition-all outline-none shadow-sm"
                    />
                </div>

                <Link
                    to={'create-vocab'}
                    className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors text-lg select-none whitespace-nowrap"
                >
                    <Add fontSize="medium" /> Tạo từ vựng
                </Link>
            </div>

            <hr className="border-gray-300 mb-8" />

            {/* Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleVocabularies?.length > 0 ? (
                    visibleVocabularies
                        .slice()
                        .reverse()
                        .map((vocab) => (
                            <div
                                key={vocab._id}
                                className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl border border-transparent hover:border-red-500 transition-all duration-300 select-none"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-md shadow-inner shadow-red-100">
                                        <Book fontSize="medium" />
                                    </div>
                                    <h3 className="font-semibold text-lg truncate">
                                        {vocab.word} -{' '}
                                        <span className="font-normal text-gray-700">
                                            {vocab.meaning}
                                        </span>
                                    </h3>
                                </div>

                                <div className="flex justify-end gap-3 mt-3">
                                    <Link
                                        to={`study/${vocab._id}`}
                                        className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                                        title="Học ngay"
                                    >
                                        <PlayArrow />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteVocab(vocab._id)
                                        }
                                        className="text-gray-400 hover:bg-red-50 hover:text-red-600 p-2 rounded transition"
                                        title="Xóa"
                                        aria-label={`Xóa từ vựng ${vocab.word}`}
                                    >
                                        <Delete />
                                    </button>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="text-center col-span-full py-16 text-gray-500">
                        Không tìm thấy từ vựng phù hợp
                    </div>
                )}
            </div>

            {/* Show More Button */}
            {hasMore && (
                <button
                    onClick={showMore}
                    className="mt-8 mx-auto px-8 py-3 bg-red-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-red-700 transition-colors select-none block"
                >
                    Xem thêm
                </button>
            )}

            {/* Empty State */}
            {!isLoading && vocabularies?.length === 0 && (
                <div className="text-center py-20 select-none">
                    <Book
                        className="mx-auto text-red-200 mb-8"
                        style={{ fontSize: '80px' }}
                    />
                    <h3 className="text-4xl font-extrabold text-red-600 mb-4">
                        Chưa có từ vựng nào
                    </h3>
                    <p className="text-red-400 max-w-xl mx-auto mb-10 text-lg">
                        Hãy tạo từ vựng đầu tiên của bạn để bắt đầu hành trình
                        học tập!
                    </p>
                    <Link
                        to={'create-vocab'}
                        className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-700 transition-colors select-none whitespace-nowrap"
                    >
                        <Add fontSize="large" /> Tạo từ vựng
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Vocabularies
