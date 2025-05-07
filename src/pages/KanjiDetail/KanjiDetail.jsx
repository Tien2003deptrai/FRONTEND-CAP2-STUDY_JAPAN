import React, { useEffect, useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import { useNavigate, useParams } from 'react-router-dom'
import { parseKanjiVG } from '@/util/parseKanjiVG'

const KanjiDetailPage = () => {
    const { kanjiId } = useParams()
    const [kanjiData, setKanjiData] = useState(null)
    const [strokes, setStrokes] = useState([])
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchKanjiData = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axiosInstance.get(`/kanji/${kanjiId}`)
            setKanjiData(response.data.data)
        } catch (error) {
            setError('Không thể tải dữ liệu Kanji.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSvgContent = async () => {
        if (!kanjiData?.kanji) return
        try {
            const response = await axiosInstance.post('/kanji/svg', {
                kanji: kanjiData.kanji,
            })
            parseKanjiVG(response.data.data).then(setStrokes)
        } catch (error) {
            console.error('SVG load error:', error)
        }
    }

    useEffect(() => {
        fetchKanjiData()
    }, [kanjiId])

    useEffect(() => {
        if (kanjiData?.kanji) fetchSvgContent()
    }, [kanjiData])

    useEffect(() => {
        if (step < strokes.length) {
            const t = setTimeout(() => setStep((s) => s + 1), 500)
            return () => clearTimeout(t)
        }
    }, [step, strokes])

    const handleSvgClick = () => {
        setStep(0)
        setStrokes([])
        fetchSvgContent()
    }

    const handleStartLearning = () => {
        navigate(`/kanji/${kanjiId}/stroke-practice`, {
            state: { kanji: kanjiData.kanji },
        })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
                {/* SVG preview */}
                <div
                    className="border-4 border-blue-400 rounded-xl overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    style={{ width: 180, height: 180 }}
                    onClick={handleSvgClick}
                >
                    <svg viewBox="0 0 109 109" className="w-full h-full">
                        <line
                            x1="0"
                            y1="54.5"
                            x2="109"
                            y2="54.5"
                            stroke="gray"
                            strokeDasharray="4,4"
                        />
                        <line
                            x1="54.5"
                            y1="0"
                            x2="54.5"
                            y2="109"
                            stroke="gray"
                            strokeDasharray="4,4"
                        />
                        {strokes.slice(0, step).map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                stroke="black"
                                strokeWidth="5"
                                fill="none"
                            />
                        ))}
                    </svg>
                </div>

                {/* Kanji info */}
                <p className="text-4xl font-extrabold text-blue-900 text-center">
                    {kanjiData.kanji}
                </p>
                <p className="text-lg font-medium text-gray-700 text-center">
                    {kanjiData.mean}
                </p>

                <div className="flex justify-center gap-6 flex-wrap mt-4">
                    <div className="bg-yellow-50 border border-red-300 rounded-full px-6 py-2 text-sm text-center shadow">
                        <p className="text-red-600 text-xs mb-1">Onyomi</p>
                        <p className="font-semibold">
                            {kanjiData.onyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-400 rounded-full px-6 py-2 text-sm text-center shadow">
                        <p className="text-yellow-600 text-xs mb-1">Kunyomi</p>
                        <p className="font-semibold">
                            {kanjiData.kunyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleStartLearning}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition"
                >
                    Bắt đầu luyện viết
                </button>
            </div>

            {/* Examples */}
            <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Từ vựng liên quan
                </h3>
                <div className="space-y-6">
                    {kanjiData.examples.map((example, index) => (
                        <div key={index} className="border-b pb-3">
                            <p className="text-lg font-bold text-blue-900">
                                {example.ja}
                            </p>
                            <p className="text-sm text-gray-600">
                                {example.vi}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-blue-500 text-sm underline cursor-pointer">
                                    Xem chi tiết
                                </span>
                                <button className="text-yellow-600 text-xl hover:scale-110 transition">
                                    🔊
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KanjiDetailPage
