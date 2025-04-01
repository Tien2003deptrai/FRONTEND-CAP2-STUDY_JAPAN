import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BookIcon from '@mui/icons-material/Book'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { Create } from '@mui/icons-material'

const CreateFlashcard = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedVocab, setSelectedVocab] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [view, setView] = useState('create') // 'create', 'preview', 'manage'
    const [flashcardType, setFlashcardType] = useState('vocabulary') // 'vocabulary' or 'grammar'

    // Sample vocabulary data
    const sampleVocabulary = [
        {
            id: 1,
            word: '猫',
            reading: 'ねこ',
            meaning: 'Cat',
            example: '猫が好きです。',
        },
        {
            id: 2,
            word: '犬',
            reading: 'いぬ',
            meaning: 'Dog',
            example: '犬を飼っています。',
        },
        {
            id: 3,
            word: '家',
            reading: 'いえ',
            meaning: 'House',
            example: '家に帰ります。',
        },
        {
            id: 4,
            word: '学校',
            reading: 'がっこう',
            meaning: 'School',
            example: '学校へ行きます。',
        },
        {
            id: 5,
            word: '本',
            reading: 'ほん',
            meaning: 'Book',
            example: '本を読みます。',
        },
        {
            id: 6,
            word: '水',
            reading: 'みず',
            meaning: 'Water',
            example: '水を飲みます。',
        },
        {
            id: 7,
            word: '食べる',
            reading: 'たべる',
            meaning: 'To eat',
            example: 'ご飯を食べます。',
        },
        {
            id: 8,
            word: '飲む',
            reading: 'のむ',
            meaning: 'To drink',
            example: 'お茶を飲みます。',
        },
    ]

    // Sample grammar data
    const sampleGrammar = [
        {
            id: 101,
            pattern: 'Nは Nが あります/います',
            level: 'N5',
            meaning: 'Có (cái gì đó/ai đó) ở (đâu đó)',
            example: '部屋には机があります。',
            translation: 'Trong phòng có bàn.',
        },
        {
            id: 102,
            pattern: 'Nを Vます',
            level: 'N5',
            meaning: 'Động từ tác động lên đối tượng',
            example: 'りんごを食べます。',
            translation: 'Tôi ăn táo.',
        },
        {
            id: 103,
            pattern: 'Nに Vます',
            level: 'N5',
            meaning: 'Đi đến (địa điểm)',
            example: '学校に行きます。',
            translation: 'Tôi đi đến trường.',
        },
        {
            id: 104,
            pattern: 'Vて、Vます',
            level: 'N5',
            meaning: 'Làm việc này rồi làm việc kia',
            example: '朝ご飯を食べて、学校に行きます。',
            translation: 'Tôi ăn sáng rồi đi học.',
        },
        {
            id: 105,
            pattern: 'Vない形 + ければなりません',
            level: 'N4',
            meaning: 'Phải làm (nghĩa vụ)',
            example: '明日は早く起きなければなりません。',
            translation: 'Ngày mai tôi phải dậy sớm.',
        },
        {
            id: 106,
            pattern: 'Vた + ことがあります',
            level: 'N4',
            meaning: 'Đã từng làm gì đó',
            example: '日本に行ったことがあります。',
            translation: 'Tôi đã từng đi Nhật Bản.',
        },
    ]

    // Filter data based on search term and type
    const getFilteredData = () => {
        if (flashcardType === 'vocabulary') {
            return sampleVocabulary.filter(
                (item) =>
                    item.word.includes(searchTerm) ||
                    item.reading.includes(searchTerm) ||
                    item.meaning
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
        } else {
            // grammar
            return sampleGrammar.filter(
                (item) =>
                    item.pattern.includes(searchTerm) ||
                    item.meaning
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.level.includes(searchTerm.toUpperCase())
            )
        }
    }

    const filteredData = getFilteredData()

    // Add item to selected list
    const addToSelected = (item) => {
        if (!selectedVocab.find((selected) => selected.id === item.id)) {
            setSelectedVocab([...selectedVocab, item])
        }
    }

    // Remove item from selected list
    const removeFromSelected = (id) => {
        setSelectedVocab(selectedVocab.filter((item) => item.id !== id))
    }

    // Create flashcards from selected items
    const createFlashcards = () => {
        if (selectedVocab.length === 0 || !deckName) return

        let newCards

        if (flashcardType === 'vocabulary') {
            newCards = selectedVocab.map((vocab) => ({
                id: vocab.id,
                front: { text: vocab.word, subtext: vocab.reading },
                back: { text: vocab.meaning, example: vocab.example },
            }))
        } else {
            // grammar
            newCards = selectedVocab.map((grammar) => ({
                id: grammar.id,
                front: { text: grammar.pattern, subtext: grammar.level },
                back: {
                    text: grammar.meaning,
                    example: grammar.example,
                    translation: grammar.translation,
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
        setSelectedVocab([])
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

    // Render based on current view
    return (
        <div className="w-full min-h-screen bg-gray-50">
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
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.word
                                                                : item.pattern}{' '}
                                                            <span className="text-gray-500">
                                                                (
                                                                {flashcardType ===
                                                                'vocabulary'
                                                                    ? item.reading
                                                                    : item.level}
                                                                )
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {item.meaning}
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
                                            ({selectedVocab.length})
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                        {selectedVocab.length > 0 ? (
                                            selectedVocab.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {flashcardType ===
                                                            'vocabulary'
                                                                ? item.word
                                                                : item.pattern}{' '}
                                                            <span className="text-gray-500">
                                                                (
                                                                {flashcardType ===
                                                                'vocabulary'
                                                                    ? item.reading
                                                                    : item.level}
                                                                )
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {item.meaning}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            removeFromSelected(
                                                                item.id
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
                                        selectedVocab.length === 0 || !deckName
                                    }
                                    className={`w-full py-3 rounded-lg font-medium ${
                                        selectedVocab.length === 0 || !deckName
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-red-600 text-white hover:bg-red-700'
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
                                        onClick={() => setView('manage')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                                    >
                                        <SaveIcon className="h-5 w-5 mr-2" />
                                        Lưu
                                    </button>
                                </div>
                            </div>

                            {flashcards.length > 0 && (
                                <>
                                    {/* Flashcard Preview */}
                                    <div
                                        className={`relative h-[500px] w-full mb-6 cursor-pointer transition-all duration-300 ${
                                            isFlipped ? 'rotate-y-180' : ''
                                        }`}
                                        onClick={() => setIsFlipped(!isFlipped)}
                                    >
                                        {/* Front of card */}
                                        <div
                                            className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 p-8 ${
                                                isFlipped
                                                    ? 'opacity-0'
                                                    : 'opacity-100'
                                            } transition-opacity duration-300`}
                                        >
                                            <div className="text-4xl font-bold mb-4">
                                                {
                                                    flashcards[currentCardIndex]
                                                        .front.text
                                                }
                                            </div>
                                            <div className="text-xl text-gray-600">
                                                {
                                                    flashcards[currentCardIndex]
                                                        .front.subtext
                                                }
                                            </div>
                                            <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                                                Nhấn để lật
                                            </div>
                                        </div>

                                        {/* Back of card */}
                                        <div
                                            className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 p-8 ${
                                                isFlipped
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            } transition-opacity duration-300`}
                                        >
                                            <div className="text-2xl font-bold mb-4 text-center">
                                                {
                                                    flashcards[currentCardIndex]
                                                        .back.text
                                                }
                                            </div>
                                            <div className="text-lg text-gray-700 italic text-center mb-4">
                                                {
                                                    flashcards[currentCardIndex]
                                                        .back.example
                                                }
                                            </div>
                                            {flashcardType === 'grammar' && (
                                                <div className="text-gray-600 text-center">
                                                    {
                                                        flashcards[
                                                            currentCardIndex
                                                        ].back.translation
                                                    }
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                                                Nhấn để lật
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={prevCard}
                                            disabled={currentCardIndex === 0}
                                            className={`p-2 rounded-full ${
                                                currentCardIndex === 0
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700'
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
                                            className={`p-2 rounded-full ${
                                                currentCardIndex ===
                                                flashcards.length - 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700'
                                            }`}
                                        >
                                            <ArrowForwardIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {view === 'manage' && (
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-medium">
                                    Quản lý Flashcards
                                </h2>
                                <button
                                    onClick={() => setView('preview')}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Quay lại
                                </button>
                            </div>

                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center text-green-700">
                                    <SaveIcon className="h-5 w-5 mr-2" />
                                    <span>
                                        Đã lưu bộ flashcard "{deckName}" thành
                                        công! ({flashcards.length} thẻ)
                                    </span>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg">
                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <h3 className="font-medium text-gray-900">
                                        Các bộ flashcard của bạn
                                    </h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {deckName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {flashcards.length} thẻ •{' '}
                                                {flashcardType === 'vocabulary'
                                                    ? 'Từ vựng'
                                                    : 'Ngữ pháp'}{' '}
                                                • Tạo ngày{' '}
                                                {new Date().toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <EditIcon className="h-5 w-5" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                <DeleteIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateFlashcard
