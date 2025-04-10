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
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {kanjiData.map((kanji) => (
                    <Link
                        key={kanji._id}
                        to={`/kanji/${kanji._id}`} // Using Link to navigate to the KanjiDetail page
                        className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="text-3xl font-semibold text-gray-800 mb-4">
                            {kanji.kanji}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default KanjiLevel
