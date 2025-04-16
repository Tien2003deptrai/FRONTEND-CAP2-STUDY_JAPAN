import React, { useEffect, useRef, useState } from 'react'
import { parseKanjiVG } from './utils/parseKanjiVG'

function getStartAndEndPoints(
    d: string
): { x1: number; y1: number; x2: number; y2: number } | null {
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
    const [strokes, setStrokes] = useState<string[]>([])
    const [step, setStep] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [points, setPoints] = useState<{ x: number; y: number }[]>([])
    const [complete, setComplete] = useState(false)
    const [showGuide, setShowGuide] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3001/api/kanji/金')
            .then((res) => res.text())
            .then(parseKanjiVG)
            .then(setStrokes)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.lineWidth = 4
        ctx.strokeStyle = 'black'
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'

        if (points.length > 1) {
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            points.forEach((p) => ctx.lineTo(p.x, p.y))
            ctx.stroke()
        }
    }, [points])

    const handlePointerDown = (e: React.PointerEvent) => {
        if (complete) return
        setIsDrawing(true)
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
        setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setShowGuide(false)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDrawing || complete) return
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
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
            } else {
                setShowGuide(true)
            }
            return next
        })
        setPoints([])
    }

    const guideLine = strokes[step] ? getStartAndEndPoints(strokes[step]) : null

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-md text-gray-500 mb-1">
                Practice writing Kanji
            </h1>
            <h2 className="text-xl font-bold mb-4">Prohibition</h2>
            <div className="relative w-72 h-72 border-2 border-blue-400 rounded-lg">
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
                                stroke="orange"
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
                <div className="mt-4 text-green-600 font-bold text-lg flex items-center gap-2">
                    <span>✅</span> <span>You completed all strokes!</span>
                </div>
            )}
        </div>
    )
}

export default KanjiStrokePractice
