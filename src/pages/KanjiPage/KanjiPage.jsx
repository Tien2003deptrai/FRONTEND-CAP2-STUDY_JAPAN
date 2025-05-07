import React, { useState } from 'react'
import KanjiLevel from '@/components/KanjiLevel/KanjiLevel'

const KanjiPage = () => {
    const jlptLevels = ['N1', 'N2', 'N3', 'N4', 'N5']
    const [selectedLevel, setSelectedLevel] = useState('N5')

    return (
        <div className="bg-gradient-to-br from-white to-red-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-red-900 mb-10">
                    Học Kanji theo cấp độ JLPT
                </h1>

                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {jlptLevels.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 rounded-full font-semibold transition shadow-sm text-sm ${
                                selectedLevel === level
                                    ? 'bg-red-600 text-white shadow-md'
                                    : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
                            }`}
                        >
                            JLPT {level}
                        </button>
                    ))}
                </div>

                <KanjiLevel jlptLevel={selectedLevel} />
            </div>
        </div>
    )
}

export default KanjiPage
