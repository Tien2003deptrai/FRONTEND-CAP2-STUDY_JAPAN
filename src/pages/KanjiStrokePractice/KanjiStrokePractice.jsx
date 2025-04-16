import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '@/network/httpRequest'
import { parseKanjiVG } from '@/util/parseKanjiVG'
import Swal from 'sweetalert2'

function getStartAndEndPoints(d) {
    const moveTo = d.match(/M\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i)
    const endMatch = d.match(
        /.*\s(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)(?!.*\s\d)/
    )
    if (moveTo && endMatch) {
        return {
            x1: parseFloat(moveTo[1]),
            y1: parseFloat(moveTo[2]),
            x2: parseFloat(endMatch[1]),
            y2: parseFloat(endMatch[2]),
        }
    }
    return null
}

const KanjiStrokePractice = () => {
    const location = useLocation() // Dùng useLocation để lấy state
    const navigate = useNavigate() // Khai báo useNavigate để điều hướng
    const { kanji } = location.state || {} // Lấy kanji từ state khi navigate qua
    const [strokes, setStrokes] = useState([])
    const [step, setStep] = useState(0)
    const [complete, setComplete] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [points, setPoints] = useState([])
    const [showGuide, setShowGuide] = useState(true)
    const [nextKanji, setNextKanji] = useState(null) // To store next Kanji info
    const canvasRef = useRef(null)

    useEffect(() => {
        if (kanji) {
            fetchSvgContent()
        }
    }, [kanji])

    const fetchSvgContent = async () => {
        if (!kanji) return
        try {
            const response = await axiosInstance.post('/kanji/svg', {
                kanji: kanji, // Truyền kanji vào API để lấy SVG content
            })
            parseKanjiVG(response.data.data).then(setStrokes) // Chuyển SVG thành strokes
        } catch (error) {
            console.error('Error fetching SVG content:', error)
        }
    }

    const fetchNextKanji = async () => {
        // Fetch thông tin Kanji tiếp theo, giả sử API trả về Kanji tiếp theo theo id hiện tại
        try {
            const response = await axiosInstance.get(`/kanji/next/${kanji}`)
            setNextKanji(response.data.data) // Lưu ID Kanji tiếp theo
        } catch (error) {
            console.error('Error fetching next Kanji:', error)
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
        setStep((prev) => {
            const next = prev + 1
            if (next >= strokes.length) {
                setComplete(true)
                Swal.fire({
                    title: 'Chúc mừng!',
                    text: 'Tuyệt vời! Hãy chuyển sang bài tập tiếp theo!',
                    icon: 'success',
                    confirmButtonText: 'Continue',
                })
            } else {
                setShowGuide(true)
            }
            return next
        })
        setPoints([])
    }

    const guideLine = strokes[step] ? getStartAndEndPoints(strokes[step]) : null

    // Vẽ lên canvas dựa trên các điểm mà học viên đã vẽ
    useEffect(() => {
        if (points.length > 1) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas before drawing
            ctx.lineWidth = 4
            ctx.strokeStyle = 'black'
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            points.forEach((p) => {
                ctx.lineTo(p.x, p.y)
            })
            ctx.stroke()
        }
    }, [points])

    useEffect(() => {
        if (nextKanji) {
            // Khi Kanji tiếp theo đã được tải, điều hướng đến đó
            navigate(`/kanji/${nextKanji._id}/stroke-practice`, {
                state: { kanji: nextKanji.kanji },
            })
        }
    }, [nextKanji, navigate])

    // Reset points and step when moving to next Kanji
    useEffect(() => {
        if (nextKanji) {
            setStep(0)
            setPoints([])
            setComplete(false)
            setShowGuide(true)
            setStrokes([]) // Reset strokes for new kanji
            fetchSvgContent() // Fetch new kanji strokes
        }
    }, [nextKanji])

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-xl text-gray-500 mb-1 mt-5">
                Practice writing Kanji
            </h1>
            <h2 className="text-2xl font-bold mb-4">{kanji}</h2>

            <div className="relative w-72 h-72 outline-4 outline-blue-500 rounded-lg">
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
                            stroke={i === step ? 'orange' : 'gray'} // Chuyển sang nét cam khi vẽ đúng
                            strokeWidth="6"
                            fill="none"
                            opacity={i < step ? 0.1 : i === step ? 1 : 0.05}
                        />
                    ))}

                    {showGuide && guideLine && (
                        <g>
                            <line
                                x1={guideLine.x1}
                                y1={guideLine.y1}
                                x2={guideLine.x2}
                                y2={guideLine.y2}
                                stroke={
                                    step === strokes.length - 1
                                        ? 'orange'
                                        : 'gray'
                                }
                                strokeWidth="2"
                                strokeDasharray="6,4"
                                strokeLinecap="round"
                                markerEnd="url(#arrow)"
                            />
                            <circle
                                cx={guideLine.x1}
                                cy={guideLine.y1}
                                r="7"
                                fill="orange"
                            />
                            <text
                                x={guideLine.x1}
                                y={guideLine.y1 + 4}
                                textAnchor="middle"
                                fontSize="10"
                                fill="white"
                            >
                                {step + 1}
                            </text>
                        </g>
                    )}
                </svg>

                <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="absolute inset-0 z-10"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                />
                {!complete && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-orange-500 text-white text-sm rounded-full flex items-center justify-center z-20">
                        {step + 1}
                    </div>
                )}
            </div>

            {complete && (
                <button
                    onClick={() => fetchNextKanji()} // Fetch next Kanji when clicked
                    className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all"
                >
                    Continue
                </button>
            )}
        </div>
    )
}

export default KanjiStrokePractice
