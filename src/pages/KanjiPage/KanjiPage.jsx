import React from 'react'
import KanjiLevel from '@/components/KanjiLevel/KanjiLevel'

const KanjiPage = () => {
    const jlptLevels = ['N1', 'N2', 'N3', 'N4', 'N5']

    return (
        <div className="bg-gradient-to-br from-white to-blue-50 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-center text-blue-900 mb-14 tracking-tight">
                    Học Kanji theo cấp độ JLPT
                </h1>

                {jlptLevels.map((level) => (
                    <div key={level} className="mb-16">
                        <h2 className="text-2xl font-semibold mb-6 text-black-700 flex items-center gap-2">
                            Kanji {level}
                        </h2>
                        <KanjiLevel jlptLevel={level} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KanjiPage
