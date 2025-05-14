import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '@/network/httpRequest'
import { parseKanjiVG } from '@/util/parseKanjiVG'
import Swal from 'sweetalert2'

const getBoundingBox = (d) => {
    const coords = Array.from(d.matchAll(/(\d+(\.\d+)?)/g)).map((m) =>
        parseFloat(m[0])
    )
    const xs = coords.filter((_, i) => i % 2 === 0)
    const ys = coords.filter((_, i) => i % 2 === 1)
    const minX = Math.min(...xs),
        maxX = Math.max(...xs)
    const minY = Math.min(...ys),
        maxY = Math.max(...ys)
    const scaleX = 300 / 109,
        scaleY = 300 / 109
    return {
        x1: minX * scaleX,
        y1: minY * scaleY,
        x2: maxX * scaleX,
        y2: maxY * scaleY,
    }
}

const validateStroke = (drawnPoints, strokePath) => {
    const box = getBoundingBox(strokePath)
    if (!box || drawnPoints.length < 2) return false
    const tolerance = 20
    return drawnPoints.some(
        (p) =>
            p.x >= box.x1 - tolerance &&
            p.x <= box.x2 + tolerance &&
            p.y >= box.y1 - tolerance &&
            p.y <= box.y2 + tolerance
    )
}

const getStartPoint = (d) => {
    const match = d.match(/M\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i)
    if (match) {
        return {
            x: (parseFloat(match[1]) * 300) / 109,
            y: (parseFloat(match[2]) * 300) / 109,
        }
    }
    return null
}

const KanjiStrokePractice = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { kanji } = location.state || {}
    const [strokes, setStrokes] = useState([])
    const [step, setStep] = useState(0)
    const [complete, setComplete] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [points, setPoints] = useState([])
    const [showGuide, setShowGuide] = useState(true)
    const [nextKanji, setNextKanji] = useState(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        if (kanji) fetchSvgContent()
    }, [kanji])

    const fetchSvgContent = async () => {
        try {
            const res = await axiosInstance.post('/kanji/svg', { kanji })
            parseKanjiVG(res.data.data).then(setStrokes)
        } catch (err) {
            console.error('SVG load error:', err)
        }
    }

    const fetchNextKanji = async () => {
        try {
            const res = await axiosInstance.get(`/kanji/next/${kanji}`)
            setNextKanji(res.data.data)
        } catch (err) {
            console.error('Next kanji load error:', err)
        }
    }

    const handlePointerDown = (e) => {
        if (complete) return
        setIsDrawing(true)
        const rect = e.target.getBoundingClientRect()
        setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setShowGuide(false)
    }

    const handlePointerMove = (e) => {
        if (!isDrawing || complete) return
        const rect = e.target.getBoundingClientRect()
        setPoints((prev) => [
            ...prev,
            { x: e.clientX - rect.left, y: e.clientY - rect.top },
        ])
    }

    const handlePointerUp = () => {
        if (complete) return
        setIsDrawing(false)
        const isCorrect = validateStroke(points, strokes[step])
        if (!isCorrect) {
            Swal.fire({
                icon: 'error',
                title: 'Sai rồi!',
                text: 'Hãy thử lại nét này, bạn đang lệch vị trí rồi.',
            })
            setPoints([])
            return
        }

        setStep((prev) => {
            const next = prev + 1
            if (next >= strokes.length) {
                setComplete(true)
                Swal.fire({
                    icon: 'success',
                    title: 'Hoàn thành!',
                    text: 'Bạn đã viết xong chữ này!',
                })
            } else {
                setShowGuide(true)
            }
            return next
        })
        setPoints([])
    }

    useEffect(() => {
        if (points.length > 1) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.lineWidth = 4
            ctx.strokeStyle = 'black'
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            points.forEach((p) => ctx.lineTo(p.x, p.y))
            ctx.stroke()
        }
    }, [points])

    useEffect(() => {
        if (nextKanji) {
            navigate(`/kanji/${nextKanji._id}/stroke-practice`, {
                state: { kanji: nextKanji.kanji },
            })
        }
    }, [nextKanji, navigate])

    useEffect(() => {
        if (nextKanji) {
            setStep(0)
            setPoints([])
            setComplete(false)
            setShowGuide(true)
            setStrokes([])
            fetchSvgContent()
        }
    }, [nextKanji])

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 py-10 px-4 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-3 tracking-wide">
                Luyện viết chữ Kanji
            </h1>
            <h2 className="text-6xl font-black text-gray-800 mb-6 drop-shadow">
                {kanji}
            </h2>

            <div className="relative w-[300px] h-[300px] border-[5px] border-blue-400 rounded-2xl shadow-2xl bg-white overflow-hidden hover:shadow-indigo-400/50 transition-all duration-500">
                {/* SVG Layer */}
                <svg
                    viewBox="0 0 109 109"
                    className="absolute inset-0 w-full h-full"
                >
                    <defs>
                        <marker
                            id="arrow"
                            markerWidth="8"
                            markerHeight="8"
                            refX="5"
                            refY="4"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path d="M0,0 L0,8 L8,4 Z" fill="orange" />
                        </marker>
                    </defs>

                    <line
                        x1="0"
                        y1="54.5"
                        x2="109"
                        y2="54.5"
                        stroke="gray"
                        strokeDasharray="6,6"
                    />
                    <line
                        x1="54.5"
                        y1="0"
                        x2="54.5"
                        y2="109"
                        stroke="gray"
                        strokeDasharray="6,6"
                    />

                    {strokes.map((d, i) => (
                        <path
                            key={i}
                            d={d}
                            stroke={i === step ? 'orange' : 'gray'}
                            strokeWidth="5"
                            fill="none"
                            className={`transition-all duration-300 ${i < step ? 'opacity-10' : i === step ? 'opacity-100' : 'opacity-30'}`}
                        />
                    ))}

                    {showGuide &&
                        strokes[step] &&
                        (() => {
                            const p = getStartPoint(strokes[step])
                            return p ? (
                                <g>
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r="10"
                                        fill="orange"
                                        className="animate-ping"
                                    />
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r="8"
                                        fill="orange"
                                    />
                                    <text
                                        x={p.x}
                                        y={p.y + 4}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="white"
                                        fontWeight="bold"
                                    >
                                        {step + 1}
                                    </text>
                                </g>
                            ) : null
                        })()}
                </svg>

                {/* Canvas Layer */}
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="absolute inset-0 z-10"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                />

                {/* Step Indicator */}
                {!complete && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow">
                        {step + 1}
                    </div>
                )}
            </div>

            {/* Button */}
            {complete && (
                <button
                    onClick={fetchNextKanji}
                    className="mt-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
                >
                    ➡️ Kanji tiếp theo
                </button>
            )}
        </div>
    )
}

export default KanjiStrokePractice
