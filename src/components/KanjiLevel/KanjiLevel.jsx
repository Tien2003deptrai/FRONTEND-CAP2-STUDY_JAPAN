import React, { useEffect, useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { Link } from 'react-router-dom' // Import Link for navigation

const KanjiLevel = ({ jlptLevel }) => {
    const [kanjiData, setKanjiData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchKanjiData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axiosInstance.get(
                    `/kanji/level/${jlptLevel}`
                )
                if (response.data.data.kanji.length === 0) {
                    setError('No Kanji found for this level.')
                } else {
                    setKanjiData(response.data.data.kanji)
                }
            } catch (error) {
                setError('Error fetching Kanji data.')
                console.error('Error fetching kanji:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchKanjiData()
    }, [jlptLevel])

    if (loading) {
        return (
            <div className="text-center text-xl text-gray-500">Loading...</div>
        )
    }

    if (error) {
        return <div className="text-center text-xl text-red-500">{error}</div>
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {kanjiData.map((kanji) => (
                    <Link
                        key={kanji._id}
                        to={`/kanji/${kanji._id}`}
                        className="flex items-center justify-center h-16 w-16 bg-white border border-gray-300 rounded-xl shadow hover:shadow-md hover:scale-105 transition duration-200"
                    >
                        <span className="text-2xl font-bold text-gray-800">
                            {kanji.kanji}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default KanjiLevel
