import React, { useEffect, useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { useParams } from 'react-router-dom'

const KanjiDetailPage = () => {
    const { kanjiId } = useParams() // Get kanjiId from the URL
    const [kanjiData, setKanjiData] = useState(null)
    const [relatedKanji, setRelatedKanji] = useState([]) // State for related Kanji
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchKanjiData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axiosInstance.get(`/kanji/${kanjiId}`)
                setKanjiData(response.data.data) // Set Kanji data to state
            } catch (error) {
                setError('Error fetching Kanji data.')
                console.error('Error fetching kanji:', error)
            } finally {
                setLoading(false)
            }
        }

        const fetchRelatedKanji = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axiosInstance.get(
                    `/kanji/related/${kanjiId}`
                )
                setRelatedKanji(response.data.data) // Set related Kanji data
            } catch (error) {
                setError('Error fetching related Kanji.')
                console.error('Error fetching related kanji:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchKanjiData()
        fetchRelatedKanji()
    }, [kanjiId])

    if (loading) {
        return (
            <div className="text-center text-xl text-gray-500">Loading...</div>
        )
    }

    if (error) {
        return <div className="text-center text-xl text-red-500">{error}</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            {kanjiData && (
                <div className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-xl mx-auto space-y-6">
                    {/* Kanji Character Display */}
                    <div className="text-center">
                        <div className="text-8xl font-extrabold text-gray-900 mb-4">
                            {kanjiData.kanji}
                        </div>
                        <div className="flex justify-center gap-10 mb-4 text-lg text-gray-600">
                            {/* Onyomi */}
                            <div className="flex flex-col items-center bg-yellow-100 py-2 px-4 rounded-xl">
                                <span className="font-semibold text-red-600">
                                    Onyomi
                                </span>
                                <span className="text-sm">
                                    {kanjiData.onyomi.join(', ') || 'N/A'}
                                </span>
                            </div>
                            {/* Kunyomi */}
                            <div className="flex flex-col items-center bg-yellow-100 py-2 px-4 rounded-xl">
                                <span className="font-semibold text-red-600">
                                    Kunyomi
                                </span>
                                <span className="text-sm">
                                    {kanjiData.kunyomi.join(', ') || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-all hover:bg-green-700">
                            Start Learning
                        </button>
                    </div>

                    {/* Kanji Meaning */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Meaning
                        </h3>
                        <p className="text-gray-600">{kanjiData.mean}</p>
                    </div>

                    {/* Kanji Examples */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Examples
                        </h3>
                        {kanjiData.examples.map((example, index) => (
                            <div key={index} className="space-y-2">
                                <p className="text-gray-600">{example.ja}</p>
                                <p className="text-gray-400">{example.vi}</p>
                            </div>
                        ))}
                    </div>

                    {/* Related Kanji Section */}
                    {relatedKanji.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Related Kanji
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {relatedKanji.map((kanji) => (
                                    <div
                                        key={kanji._id}
                                        className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all"
                                    >
                                        <div className="text-3xl font-bold text-gray-800 mb-2">
                                            {kanji.kanji}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {kanji.mean}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default KanjiDetailPage
