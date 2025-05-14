import React, { useEffect, useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { Link } from 'react-router-dom'

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
                    setError('Không tìm thấy Kanji cho cấp độ này.')
                } else {
                    setKanjiData(response.data.data.kanji)
                }
            } catch (error) {
                setError('Lỗi khi tải dữ liệu Kanji.')
                console.error('Error fetching kanji:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchKanjiData()
    }, [jlptLevel])

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">{error}</div>
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-xl border border-red-200">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {kanjiData.map((kanji, idx) => (
                    <Link
                        key={kanji._id}
                        to={`/kanji/${kanji._id}`}
                        className="group relative flex items-center justify-center h-24 w-24 rounded-xl bg-gradient-to-br from-white via-red-50 to-red-100 border border-red-300 shadow-sm hover:shadow-2xl hover:scale-105 transition duration-300"
                    >
                        <span className="text-3xl font-bold text-red-900 group-hover:text-orange-500 transition">
                            {kanji.kanji}
                        </span>
                        <div className="absolute top-1 left-1 bg-white border border-gray-300 text-gray-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow">
                            {idx + 1}
                        </div>
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition text-xs text-gray-700 bg-white border rounded px-2 py-1 shadow-md z-10 whitespace-nowrap">
                            {kanji.meaning || 'No meaning'}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default KanjiLevel
