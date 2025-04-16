import React from 'react'
import useFetchVocabulary from '@/hooks/useFetchVocabulary'

const LessonVocabulary = ({ lessonId }) => {
    const { data, isLoading, error } = useFetchVocabulary(lessonId)
    console.log('data', data)

    if (isLoading) return <p>Đang tải từ vựng...</p>
    if (error) return <p className="text-red-500">Lỗi tải từ vựng</p>

    return (
        <div className="mt-6 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">Từ vựng</h2>
            <ul className="space-y-4">
                {data?.map((vocab) => (
                    <li key={vocab._id} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">
                                    {vocab.word} ({vocab.kana}) -{' '}
                                    {vocab.meaning}
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
                            {vocab.audio && (
                                <audio
                                    controls
                                    src={vocab.audio}
                                    className="ml-4"
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LessonVocabulary
