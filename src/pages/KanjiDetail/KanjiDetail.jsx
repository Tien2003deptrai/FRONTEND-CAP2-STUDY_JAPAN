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
            setError('Error fetching Kanji data.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSvgContent = async () => {
        if (!kanjiData?.kanji) return
        setLoading(true)
        setError(null)
        try {
            const response = await axiosInstance.post('/kanji/svg', {
                kanji: kanjiData.kanji,
            })
            parseKanjiVG(response.data.data).then(setStrokes)
        } catch (error) {
            setError('Error fetching SVG.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchKanjiData()
    }, [kanjiId])

    useEffect(() => {
        if (kanjiData?.kanji) {
            fetchSvgContent()
        }
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

    if (loading)
        return <div className="text-center text-xl mt-10">Loading...</div>
    if (error) return <div className="text-center text-red-500">{error}</div>

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
                {/* Kanji SVG */}
                <div
                    className="border-2 border-blue-400 rounded-lg"
                    style={{ width: 160, height: 160 }}
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

                {/* Meaning */}
                <p className="text-xl font-semibold text-center">
                    {kanjiData.mean}
                </p>

                {/* Onyomi + Kunyomi */}
                <div className="flex justify-center gap-8">
                    <div className="bg-yellow-50 border border-red-300 rounded-full px-6 py-2 text-sm text-center">
                        <p className="text-red-600 text-xs mb-1">Onyomi</p>
                        <p className="font-semibold">
                            {kanjiData.onyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-400 rounded-full px-6 py-2 text-sm text-center">
                        <p className="text-yellow-600 text-xs mb-1">Kunyomi</p>
                        <p className="font-semibold">
                            {kanjiData.kunyomi.join(', ') || 'ー'}
                        </p>
                    </div>
                </div>

                {/* Start Learning */}
                <button
                    onClick={handleStartLearning}
                    className="bg-green-600 text-white px-6 py-2 rounded-full mt-4 hover:bg-green-700"
                >
                    Start learning
                </button>
            </div>

            {/* Related Words */}
            <div className="max-w-3xl mx-auto mt-10">
                <h3 className="text-lg font-semibold mb-4">Related words</h3>
                <div className="space-y-6">
                    {kanjiData.examples.map((example, index) => (
                        <div key={index} className="border-b pb-3">
                            <p className="text-lg font-bold">{example.ja}</p>
                            <p className="text-sm text-gray-600">
                                {example.vi}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-blue-500 text-sm underline"
                                >
                                    See detail
                                </a>
                                <button className="text-yellow-600 text-xl">
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
