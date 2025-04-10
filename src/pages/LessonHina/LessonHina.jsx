import React from 'react'
import useFetchHina from '@/hooks/useFetchHina'

const LessonHina = ({ courseId, lessonId }) => {
    const { data, isLoading, error } = useFetchHina(courseId, lessonId)

    if (isLoading) return <p>Đang tải Hina...</p>
    if (error) return <p className="text-red-500">Lỗi tải Hina</p>

    const { words, questions } = data || {}

    return (
        <div className="mt-6 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">Hina</h2>

            {/* Words Section */}
            {words && (
                <div>
                    <h3 className="font-semibold text-lg">Từ vựng</h3>
                    <ul className="space-y-2">
                        {words.map((word) => (
                            <li
                                key={word._id}
                                className="flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold">
                                        {word.word}
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
                                {word.audio && (
                                    <audio
                                        controls
                                        src={word.audio}
                                        className="ml-4"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Questions Section */}
            {questions && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Câu hỏi</h3>
                    <ul className="space-y-4">
                        {questions.map((question) => (
                            <li key={question._id} className="border-b pb-2">
                                <div>
                                    <p className="text-sm">
                                        {question.content}
                                    </p>
                                    <p className="text-sm text-gray-500 italic">
                                        {question.sentence}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    {question.quiz && (
                                        <ul className="list-disc ml-5">
                                            {question.quiz.map(
                                                (option, index) => (
                                                    <li
                                                        key={index}
                                                        className="text-sm"
                                                    >
                                                        {option}
                                                    </li>
                                                )
                                            )}
                                        </ul>
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
