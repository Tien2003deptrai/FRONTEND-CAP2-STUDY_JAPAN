import { useEffect, useState } from 'react'
import { parseKanjiVG } from './utils/parseKanjiVG'
import KanjiStrokePractice from './KanjiStrokePractice'
import './App.css'
export default function KanjiPlayer() {
    const [strokes, setStrokes] = useState<string[]>([])
    const [step, setStep] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3001/api/kanji/学') // ← thay chữ tại đây
            .then((res) => res.text())
            .then(parseKanjiVG)
            .then(setStrokes)
    }, [])

    useEffect(() => {
        if (step < strokes.length) {
            const t = setTimeout(() => setStep((s) => s + 1), 1000)
            return () => clearTimeout(t)
        }
    }, [step, strokes])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="relative w-64 h-64 border-2 border-blue-300 rounded-md">
                <svg viewBox="0 0 109 109" className="w-full h-full">
                    {/* Đường kẻ nét đứt giữa khung (ngang + dọc) */}
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

                    {/* Nét vẽ chữ */}
                    {strokes.slice(0, step).map((d, i) => (
                        <path
                            key={i}
                            d={d}
                            stroke="black"
                            strokeWidth="5"
                            fill="none"
                            className="animate-stroke"
                        />
                    ))}
                </svg>
            </div>

            <div className="text-center mt-4 text-xl font-semibold tracking-wide text-gray-700">
                Prohibition
            </div>
        </div>
        // <>
        //     <KanjiStrokePractice />
        // </>
    )
}
