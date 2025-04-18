import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingOverlay } from '@mantine/core'
import { ArrowBack } from '@mui/icons-material'
import axiosInstance from '@/network/httpRequest'
import { useState } from 'react'

function FlashcardDetail() {
    const { deckId } = useParams()
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['deckDetail', deckId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/flashcard/${deckId}`)
            return res.data.data
        },
        enabled: !!deckId,
    })

    const flashcards =
        data?.flashcard?.map((item) => ({
            id: item._id,
            front: {
                text: item.front,
                subtext: item.vocab?.kana || '',
            },
            back: {
                text: item.back,
                example: '', // Nếu sau này API trả thêm, có thể cập nhật
                translation: '',
            },
        })) || []

    const deckTitle = data?.deck_title || 'Flashcards'

    const nextCard = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setIsFlipped(false)
        }
    }

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setIsFlipped(false)
        }
    }

    if (isLoading) return <LoadingOverlay visible={true} overlayBlur={2} />

    if (isError || !data)
        return (
            <div className="p-6 text-red-500">
                Không thể tải dữ liệu flashcard.
            </div>
        )

    return (
        <div className="w-full min-h-screen bg-gray-50 relative">
            <div className="w-full max-w-[1440px] mx-auto px-4 py-6">
                <div className="bg-white shadow-sm rounded-lg">
                    {/* Header giống CreateFlashcard */}
                    <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                        <h1 className="text-xl font-bold">
                            Học Flashcards: {deckTitle}
                        </h1>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full hover:bg-red-700 transition"
                        >
                            <ArrowBack />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col items-center justify-center">
                        <h2 className="text-lg text-gray-700 mb-4">
                            ({currentIndex + 1}/{flashcards.length})
                        </h2>

                        <div className="flip-card w-full max-w-md h-[300px] mb-6">
                            <div
                                className={`flip-card-inner ${
                                    isFlipped ? 'flipped' : ''
                                }`}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {/* Front */}
                                <div className="flip-card-front p-6 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl shadow-md w-full h-full flex flex-col items-center justify-center">
                                    <div className="text-4xl font-bold mb-3 text-center">
                                        {flashcards[currentIndex]?.front.text}
                                    </div>
                                    <div className="text-lg text-white/80 text-center">
                                        {
                                            flashcards[currentIndex]?.front
                                                .subtext
                                        }
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                                        Nhấn để lật
                                    </div>
                                </div>

                                {/* Back */}
                                <div className="flip-card-back p-6 bg-white text-gray-800 rounded-xl shadow-md w-full h-full flex flex-col items-center justify-center">
                                    <div className="text-2xl font-semibold mb-3 text-center">
                                        {flashcards[currentIndex]?.back.text}
                                    </div>
                                    <div className="text-gray-600 italic text-center mb-2">
                                        {flashcards[currentIndex]?.back.example}
                                    </div>
                                    {flashcards[currentIndex]?.back
                                        .translation && (
                                        <div className="text-gray-500 text-sm text-center">
                                            {
                                                flashcards[currentIndex]?.back
                                                    .translation
                                            }
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                                        Nhấn để lật lại
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-center space-x-6 mt-4">
                            <button
                                onClick={prevCard}
                                disabled={currentIndex === 0}
                                className={`px-4 py-2 rounded-lg ${
                                    currentIndex === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                            >
                                Trước
                            </button>
                            <button
                                onClick={nextCard}
                                disabled={
                                    currentIndex === flashcards.length - 1
                                }
                                className={`px-4 py-2 rounded-lg ${
                                    currentIndex === flashcards.length - 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                            >
                                Tiếp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flip Card Styles */}
            <style jsx>{`
                .flip-card {
                    perspective: 1000px;
                    cursor: pointer;
                }
                .flip-card-inner {
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .flip-card-inner.flipped {
                    transform: rotateY(180deg);
                }
                .flip-card-front,
                .flip-card-back {
                    backface-visibility: hidden;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .flip-card-back {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    )
}

export default FlashcardDetail
