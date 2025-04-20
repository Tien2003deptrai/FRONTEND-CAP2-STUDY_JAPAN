// EditFlashcard.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useFetchAllGrammars from '@/hooks/useFetchAllGrammars'
import useFetchAllVocabularies from '@/hooks/useFetchAllVocabularies'
import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

function EditFlashcard() {
    const { deckId } = useParams()
    const navigate = useNavigate()
    const [deckTitle, setDeckTitle] = useState('')
    const [selectedItem, setSelectedItem] = useState([])
    const [flashcardType, setFlashcardType] = useState('vocabulary')
    const [searchTerm, setSearchTerm] = useState('')

    const { data: vocabularies = [] } = useFetchAllVocabularies()
    const { data: grammars = [] } = useFetchAllGrammars()

    const { data, isLoading } = useQuery({
        queryKey: ['deckDetail', deckId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/flashcard/${deckId}`)
            return res.data.data
        },
        enabled: !!deckId,
    })

    useEffect(() => {
        if (data) {
            setDeckTitle(data.deck_title || '')
            const cards = data.flashcard.map((card) => {
                const type = card.vocab ? 'vocabulary' : 'grammar'
                setFlashcardType(type)
                return card.vocab || card.grammar
            })
            setSelectedItem(cards)
        }
    }, [data])

    const getFilteredData = () => {
        const source = flashcardType === 'vocabulary' ? vocabularies : grammars
        return source.filter((item) => {
            const key = flashcardType === 'vocabulary' ? item.word : item.title
            return key?.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    const addToSelected = (item) => {
        if (!selectedItem.find((i) => i._id === item._id)) {
            setSelectedItem([...selectedItem, item])
        }
    }

    const removeFromSelected = (id) => {
        setSelectedItem((prev) => prev.filter((item) => item._id !== id))
    }

    const handleSave = async () => {
        try {
            const payload = {
                deck_title: deckTitle,
                flashcard_type: flashcardType,
                flashcards: selectedItem.map((item) => item._id),
            }

            await axiosInstance.put(`/flashcard/${deckId}`, payload)

            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                timer: 1500,
                showConfirmButton: false,
            })

            navigate(-1) // hoặc path phù hợp với app của bạn
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: err.response?.data?.message || 'Cập nhật thất bại',
            })
        }
    }

    return (
        <div className="p-6">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="bg-red-600 text-white p-4 rounded-t-lg">
                <h1 className="text-xl font-bold">Chỉnh sửa Flashcard</h1>
            </div>
            <div className="mb-6">
                <label className="block text-sm mb-2 mt-2 font-medium text-gray-700">
                    Tên bộ flashcard
                </label>
                <input
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                    className="w-full p-3 border rounded"
                />
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setFlashcardType('vocabulary')}
                    className={`px-4 py-2 rounded ${flashcardType === 'vocabulary' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                >
                    Từ vựng
                </button>
                <button
                    onClick={() => setFlashcardType('grammar')}
                    className={`px-4 py-2 rounded ${flashcardType === 'grammar' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                >
                    Ngữ pháp
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full p-3 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="font-medium mb-2">Danh sách mục có sẵn</h2>
                    <div className="border rounded p-2 h-[300px] overflow-y-auto">
                        {getFilteredData().map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center py-2 border-b"
                            >
                                <span>
                                    {flashcardType === 'vocabulary'
                                        ? item.word
                                        : item.title}
                                </span>
                                <button
                                    onClick={() => addToSelected(item)}
                                    className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                                >
                                    <AddIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="font-medium mb-2">
                        Đã chọn ({selectedItem.length})
                    </h2>
                    <div className="border rounded p-2 h-[300px] overflow-y-auto">
                        {selectedItem.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center py-2 border-b"
                            >
                                <span>
                                    {flashcardType === 'vocabulary'
                                        ? item.word
                                        : item.title}
                                </span>
                                <button
                                    onClick={() => removeFromSelected(item._id)}
                                    className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                                >
                                    <DeleteIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className="primary-btn w-full py-3 rounded text-white bg-red-600 hover:bg-red-700"
            >
                Lưu cập nhật
            </button>
        </div>
    )
}

export default EditFlashcard
