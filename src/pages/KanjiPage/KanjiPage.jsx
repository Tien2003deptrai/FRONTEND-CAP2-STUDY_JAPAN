import React from 'react'
import KanjiLevel from '@/components/KanjiLevel/KanjiLevel'

const KanjiPage = () => {
    const jlptLevels = ['N1', 'N2', 'N3', 'N4', 'N5']

    return (
        // <div className="bg-gray-50 py-12">
        <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
                    Learn Kanji
                </h1>

                {/* Loop through JLPT levels */}
                {jlptLevels.map((level) => (
                    <div key={level} className="mb-12">
                        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-900">
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
