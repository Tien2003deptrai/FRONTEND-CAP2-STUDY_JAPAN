import useFetchAllGrammars from '@/hooks/useFetchAllGrammars'
import useFetchAllVocabularies from '@/hooks/useFetchAllVocabularies'
import axiosInstance from '@/network/httpRequest'
import { LoadingOverlay } from '@mantine/core'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import BookIcon from '@mui/icons-material/Book'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateFlashcard = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedItem, setSelectedItem] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [view, setView] = useState('create')
    const [flashcardType, setFlashcardType] = useState('vocabulary') // 'vocabulary' or 'grammar'
    const [isSaving, setIsSaving] = useState(false)

    const { data: vocabularies = [], isLoading: isLoadingVocab } =
        useFetchAllVocabularies()
    const { data: grammars = [], isLoading: isLoadingGrammar } =
        useFetchAllGrammars()
    console.log(vocabularies, grammars)

    // Filter data based on search term and type
    const getFilteredData = () => {
        if (flashcardType === 'vocabulary') {
            return vocabularies?.filter(
                (item) =>
                    item.vocabulary
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.reading
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.meaning
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
        } else {
            // grammar
            return grammars?.filter(
                (item) =>
                    item.title
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.structure
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.explain
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.level?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
    }

    const filteredData = getFilteredData()

    // Add item to selected list
    const addToSelected = (item) => {
        if (!selectedItem.find((selected) => selected._id === item._id)) {
            setSelectedItem([...selectedItem, item])
        }
    }

    // Remove item from selected list
    const removeFromSelected = (id) => {
        setSelectedItem(selectedItem.filter((item) => item._id !== id))
    }

    // Create flashcards from selected items
    const createFlashcards = () => {
        if (selectedItem?.length === 0 || !deckName) return

        let newCards

        if (flashcardType === 'vocabulary') {
            newCards = selectedItem.map((vocab) => ({
                id: vocab._id,
                front: { text: vocab.word, subtext: vocab.reading },
                back: { text: vocab.meaning, example: vocab.example },
            }))
        } else {
            // grammar
            newCards = selectedItem.map((grammar) => ({
                id: grammar._id,
                front: { text: grammar.title, subtext: grammar.level },
                back: {
                    text: grammar.explain,
                    example: grammar.examples?.[0]?.j || '',
                    translation: grammar.examples?.[0]?.v || '',
                },
            }))
        }

        setFlashcards(newCards)
        setView('preview')
        setCurrentCardIndex(0)
        setIsFlipped(false)
    }

    // Change flashcard type
    const changeFlashcardType = (type) => {
        setFlashcardType(type)
        setSelectedItem([])
        setSearchTerm('')
    }

    // Navigation for flashcard preview
    const nextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1)
            setIsFlipped(false)
        }
    }

    const prevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1)
            setIsFlipped(false)
        }
    }

    const handleSaveFlashCard = async () => {
        try {
            setIsSaving(true)
            const payload = {
                deck_title: deckName,
                type: flashcardType,
                [flashcardType === 'vocabulary' ? 'vocab' : 'grammar']:
                    selectedItem.map((item) => item._id),
            }

            const res = await axiosInstance.post('/flashcard', payload)

            if (res.status === 200) {
                alert('Tạo deck flashcards thành công!')
                navigate(-1)
            } else {
                alert('Không thể tạo flashcard, vui lòng thử lại!')
            }
        } catch (error) {
            if (error.response) {
                alert(
                    error.response.data.message ||
                        'Lỗi máy chủ, vui lòng thử lại!'
                )
            } else if (error.request) {
                alert('Không thể kết nối đến server, vui lòng kiểm tra mạng!')
            } else {
                alert('Đã xảy ra lỗi, vui lòng thử lại!')
            }
        } finally {
            setIsSaving(false)
        }
    }
    // Render based on current view
    return (
        <div className="w-full min-h-screen bg-gray-50 relative">
            <LoadingOverlay
                visible={isLoadingVocab || isLoadingGrammar || isSaving}
                overlayBlur={2}
            />
            <div className="w-full max-w-[1440px] mx-auto px-4 py-6">
                <div className="bg-white shadow-sm rounded-lg">
                    {/* Header */}
                    <div className="bg-red-600 text-white p-4 rounded-t-lg">
                        <h1 className="text-xl font-bold">Tạo Flashcards</h1>
                    </div>

                    {view === 'create' && (
                        <div className="p-6">
                            {/* Flashcard Type Selection */}
                            <div className="mb-6">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() =>
                                            changeFlashcardType('vocabulary')
                                        }
                                        className={`flex items-center px-6 py-2.5 rounded-lg ${
                                            flashcardType === 'vocabulary'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <BookIcon className="h-5 w-5 mr-2" />
                                        Từ vựng
                                    </button>
                                    <button
                                        onClick={() =>
                                            changeFlashcardType('grammar')
                                        }
                                        className={`flex items-center px-6 py-2.5 rounded-lg ${
                                            flashcardType === 'grammar'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <ChatBubbleIcon className="h-5 w-5 mr-2" />
                                        Ngữ pháp
                                    </button>
                                </div>
                            </div>

                            {/* Deck Name Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên bộ thẻ
                                </label>
                                <input
                                    type="text"
                                    value={deckName}
                                    onChange={(e) =>
                                        setDeckName(e.target.value)
                                    }
                                    placeholder={`Nhập tên bộ flashcard ${
                                        flashcardType === 'vocabulary'
                                            ? 'từ vựng'
                                            : 'ngữ pháp'
                                    }`}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder={`Tìm kiếm ${
                                        flashcardType === 'vocabulary'
                                            ? 'từ vựng'
                                            : 'ngữ pháp'
                                    }`}
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Available Items */}
                                <div className="border border-gray-200 rounded-lg">
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <h2 className="font-medium text-gray-900">
                                            {flashcardType === 'vocabulary'
                                                ? 'Từ vựng có sẵn'
                                                : 'Ngữ pháp có sẵn'}
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                        {filteredData?.length > 0 ? (
                                            filteredData.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.word
                                                                : item.title}{' '}
                                                            <span className="text-gray-500">
                                                                (
                                                                {flashcardType ===
                                                                'vocabulary'
                                                                    ? item.kanji
                                                                    : item.level}
                                                                )
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.meaning
                                                                : item.explain}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            addToSelected(item)
                                                        }
                                                        className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                                                    >
                                                        <AddIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">
                                                Không tìm thấy kết quả phù hợp
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Selected Items */}
                                <div className="border border-gray-200 rounded-lg">
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <h2 className="font-medium text-gray-900">
                                            {flashcardType === 'vocabulary'
                                                ? 'Từ vựng đã chọn'
                                                : 'Ngữ pháp đã chọn'}{' '}
                                            ({selectedItem.length})
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                        {selectedItem.length > 0 ? (
                                            selectedItem.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.word
                                                                : item.title}{' '}
                                                            <span className="text-gray-500">
                                                                (
                                                                {flashcardType ===
                                                                'vocabulary'
                                                                    ? item.kanji
                                                                    : item.level}
                                                                )
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.meaning
                                                                : item.explain}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            removeFromSelected(
                                                                item._id
                                                            )
                                                        }
                                                        className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                                                    >
                                                        <CloseIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">
                                                Chưa có mục nào được chọn
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Create Button */}
                            <div className="mt-6">
                                <button
                                    onClick={createFlashcards}
                                    disabled={
                                        selectedItem.length === 0 || !deckName
                                    }
                                    className={`w-full ${
                                        selectedItem.length === 0 || !deckName
                                            ? 'primary-btn bg-gray-100 text-white cursor-not-allowed'
                                            : 'primary-btn'
                                    }`}
                                >
                                    Tạo Flashcards{' '}
                                    {flashcardType === 'vocabulary'
                                        ? 'Từ vựng'
                                        : 'Ngữ pháp'}
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'preview' && (
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-medium">
                                    {deckName} ({currentCardIndex + 1}/
                                    {flashcards.length})
                                </h2>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setView('create')}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={handleSaveFlashCard}
                                        disabled={isSaving}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <SaveIcon className="h-5 w-5 mr-2" />
                                        ) : (
                                            <SaveIcon className="h-5 w-5 mr-2" />
                                        )}
                                        {isSaving ? 'Đang lưu...' : 'Lưu'}
                                    </button>
                                </div>
                            </div>

                            {flashcards.length > 0 && (
                                <div className="flex flex-col items-center justify-center min-h-[500px]">
                                    {/* Flashcard Container */}
                                    <div className="w-full max-w-[600px] mx-auto">
                                        {/* Flashcard Preview */}
                                        <div className="relative h-[300px] mb-6">
                                            <div className="flip-card w-full h-full">
                                                <div
                                                    className={`flip-card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}
                                                    onClick={() =>
                                                        setIsFlipped(!isFlipped)
                                                    }
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === 'Enter' ||
                                                            e.key === ' '
                                                        ) {
                                                            setIsFlipped(
                                                                !isFlipped
                                                            )
                                                        }
                                                    }}
                                                >
                                                    {/* Front of card */}
                                                    <div className="flip-card-front w-full h-full">
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl shadow-lg p-8">
                                                            <div className="text-4xl font-bold mb-4 text-center">
                                                                {
                                                                    flashcards[
                                                                        currentCardIndex
                                                                    ].front.text
                                                                }
                                                            </div>
                                                            <div className="text-xl opacity-90">
                                                                {
                                                                    flashcards[
                                                                        currentCardIndex
                                                                    ].front
                                                                        .subtext
                                                                }
                                                            </div>
                                                            <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                                                                Nhấn để lật
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Back of card */}
                                                    <div className="flip-card-back w-full h-full">
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8">
                                                            <div className="text-2xl font-bold mb-4 text-center text-gray-800">
                                                                {
                                                                    flashcards[
                                                                        currentCardIndex
                                                                    ].back.text
                                                                }
                                                            </div>
                                                            <div className="text-lg text-gray-600 italic text-center mb-4">
                                                                {
                                                                    flashcards[
                                                                        currentCardIndex
                                                                    ].back
                                                                        .example
                                                                }
                                                            </div>
                                                            {flashcardType ===
                                                                'grammar' && (
                                                                <div className="text-gray-500 text-center">
                                                                    {
                                                                        flashcards[
                                                                            currentCardIndex
                                                                        ].back
                                                                            .translation
                                                                    }
                                                                </div>
                                                            )}
                                                            <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                                                                Nhấn để lật
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Navigation Controls */}
                                        <div className="flex justify-center space-x-6">
                                            <button
                                                onClick={prevCard}
                                                disabled={
                                                    currentCardIndex === 0
                                                }
                                                className={`p-3 rounded-full transition-all duration-200 ${
                                                    currentCardIndex === 0
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                                                }`}
                                            >
                                                <ArrowBackIcon className="h-6 w-6" />
                                            </button>
                                            <button
                                                onClick={nextCard}
                                                disabled={
                                                    currentCardIndex ===
                                                    flashcards.length - 1
                                                }
                                                className={`p-3 rounded-full transition-all duration-200 ${
                                                    currentCardIndex ===
                                                    flashcards.length - 1
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                                                }`}
                                            >
                                                <ArrowForwardIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add these styles to your global CSS */}
            <style jsx>{`
                .flip-card {
                    perspective: 1000px;
                    cursor: pointer;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                }

                .flip-card-inner.flipped {
                    transform: rotateY(180deg);
                }

                .flip-card-front,
                .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                }

                .flip-card-back {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    )
}

export default CreateFlashcard
