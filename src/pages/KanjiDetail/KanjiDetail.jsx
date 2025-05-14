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
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 p-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
                {/* Kanji stroke SVG */}
                <div
                    className="border-4 border-blue-400 bg-white rounded-2xl shadow-xl hover:shadow-blue-500/50 overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105"
                    style={{ width: 200, height: 200 }}
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
                                stroke="#111827"
                                strokeWidth="5"
                                fill="none"
                            />
                        ))}
                    </svg>
                </div>

                {/* Kanji character */}
                <p className="text-5xl font-extrabold text-indigo-800 tracking-wide">
                    {kanjiData.kanji}
                </p>
                <p className="text-lg font-medium text-gray-700 italic">
                    {kanjiData.mean}
                </p>

                {/* Onyomi - Kunyomi */}
                <div className="flex justify-center gap-6 flex-wrap mt-4">
                    <div className="bg-rose-100 border border-rose-300 rounded-full px-6 py-2 text-sm text-center shadow-md">
                        <p className="text-rose-600 text-xs font-semibold mb-1 uppercase">
                            Onyomi
                        </p>
                        <p className="font-bold tracking-wider">
                            {kanjiData.onyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                    <div className="bg-yellow-100 border border-yellow-400 rounded-full px-6 py-2 text-sm text-center shadow-md">
                        <p className="text-yellow-600 text-xs font-semibold mb-1 uppercase">
                            Kunyomi
                        </p>
                        <p className="font-bold tracking-wider">
                            {kanjiData.kunyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                </div>

                {/* Nút luyện viết */}
                <button
                    onClick={handleStartLearning}
                    className="mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform hover:scale-105"
                >
                    Bắt đầu luyện viết
                </button>
            </div>

            {/* Danh sách ví dụ từ */}
            <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
                    Từ vựng liên quan
                </h3>
                <div className="space-y-5">
                    {kanjiData.examples.map((example, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold text-indigo-900">
                                    {example.ja}
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                    {example.vi}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    const utterance =
                                        new SpeechSynthesisUtterance(example.ja)
                                    utterance.lang = 'ja-JP'
                                    speechSynthesis.speak(utterance)
                                }}
                                className="text-indigo-600 text-2xl hover:scale-110 transition"
                            >
                                🔊
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KanjiDetailPage
