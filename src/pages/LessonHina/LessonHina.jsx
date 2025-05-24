import React from 'react'
import useFetchHina from '@/hooks/useFetchHina'

const LessonHina = ({ courseId, lessonId }) => {
    const { data, isLoading, error } = useFetchHina(courseId, lessonId)

    if (isLoading) return <p>Đang tải Hina...</p>
    if (error) return <p className="text-red-500">Lỗi tải Hina</p>
    console.log(data)

    const { words } = data || {}

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        speechSynthesis.speak(utterance)
    }

    return (
        <div className="mt-6 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">Hina</h2>

            {/* Words Section */}
            {words && (
                <div>
                    <h3 className="font-semibold text-lg mb-2">Từ vựng</h3>
                    <ul className="space-y-3">
                        {words.map((word) => (
                            <li
                                key={word._id}
                                className="flex justify-between items-start"
                            >
                                <div>
                                    <p className="text-lg font-semibold flex items-center gap-2">
                                        {word.word}
                                        <button
                                            onClick={() => speak(word.word)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                            title="Nghe phát âm"
                                        >
                                            🔊
                                        </button>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {word.trans}
                                    </p>
                                    {word.note && (
                                        <p className="text-sm text-gray-400 mt-1">
                                            {word.note}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LessonHina
