import React from 'react'
import useFetchVocabulary from '@/hooks/useFetchVocabulary'

const LessonVocabulary = ({ lessonId }) => {
    const { data, isLoading, error } = useFetchVocabulary(lessonId)

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ja-JP'
        speechSynthesis.speak(utterance)
    }

    if (isLoading) return <p>Đang tải từ vựng...</p>
    if (error) return <p className="text-red-500">Lỗi tải từ vựng</p>

    return (
        <div className="mt-6 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">Từ vựng</h2>
            <ul className="space-y-4">
                {data?.map((vocab) => (
                    <li key={vocab._id} className="border-b pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    {vocab.word} ({vocab.kana}) -{' '}
                                    {vocab.meaning}
                                    <button
                                        onClick={() => speak(vocab.word)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                        title="Nghe phát âm"
                                    >
                                        🔊
                                    </button>
                                </p>
                                <p className="text-sm text-gray-500 italic">
                                    {vocab.example}
                                </p>
                                {vocab.notes && (
                                    <p className="text-sm text-gray-400 mt-1">
                                        {vocab.notes}
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LessonVocabulary
