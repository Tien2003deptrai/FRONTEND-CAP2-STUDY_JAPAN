import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { Add, Book, Delete, Edit, PlayArrow, Search } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Vocabularies() {
    const [visibleItems, setVisibleItems] = useState(5)
    const [searchTerm, setSearchTerm] = useState('')
    const [vocabularies, setVocabularies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // hii
    console.log('vocabularies', vocabularies)
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

                setVocabularies((prevVocabularies) =>
                    prevVocabularies.filter(
                        (vocab) => vocab._id !== vocabularyId
                    )
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
        setVisibleItems((prev) => prev + 5)
    }

    const filteredVocabularies = vocabularies?.filter((vocabulary) =>
        vocabulary.word.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const visibleVocabularies = filteredVocabularies?.slice(0, visibleItems)
    const hasMore = filteredVocabularies?.length > visibleItems

    return (
        <div className="p-6 mx-auto">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold text-gray-800">Từ vựng</h1>
                <div className="flex items-center justify-center gap-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm từ vựng..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                    <Link
                        to={'create-vocab'}
                        className="second-btn flex items-center gap-2"
                    >
                        <Add /> Tạo từ vựng
                    </Link>
                </div>
            </div>
            <hr className="my-6" />

            {/* List of Vocabularies */}
            <div className="flex flex-col gap-4">
                {visibleVocabularies?.reverse().map((vocabulary) => (
                    <div
                        key={vocabulary._id}
                        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <Book />
                            </div>
                            <h3 className="font-medium text-gray-900">
                                {vocabulary.word} - {vocabulary.meaning}
                            </h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to={`study/${vocabulary._id}`}
                                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Học ngay"
                            >
                                <PlayArrow />
                            </Link>
                            <button
                                onClick={() =>
                                    handleDeleteVocab(vocabulary._id)
                                }
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
                {filteredVocabularies?.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            Không tìm thấy từ vựng nào phù hợp với từ khóa "
                            {searchTerm} "
                        </p>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {vocabularies?.length === 0 && (
                <div className="text-center py-12">
                    <Book
                        className="mx-auto text-gray-400 mb-4"
                        style={{ fontSize: '48px' }}
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chưa có từ vựng nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Hãy tạo từ vựng đầu tiên của bạn để bắt đầu học!
                    </p>
                    <Link
                        to={'create-vocab'}
                        className="primary-btn inline-flex items-center gap-2"
                    >
                        <Add /> Tạo từ vựng
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Vocabularies
