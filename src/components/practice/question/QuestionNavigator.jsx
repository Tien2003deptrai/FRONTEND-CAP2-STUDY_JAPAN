import React from 'react'
import TimerDisplay from './TimerDisplay'

const QuestionNavigator = ({
    groupedQuestions = [],
    answers = {},
    timeLeft,
}) => {
    return (
        <div className="bg-white border border-red-200 p-5 rounded-2xl w-full lg:w-60 shadow-md sticky top-6 max-h-[90vh] overflow-y-auto">
            {/* Timer */}
            <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-700 px-6 py-2 rounded-full font-semibold text-lg shadow-sm">
                    <TimerDisplay timeLeft={timeLeft} />
                </div>
            </div>

            {/* Grouped Questions */}
            {groupedQuestions.map((group, groupIdx) => (
                <div key={groupIdx} className="mb-6">
                    <div className="text-red-700 font-bold mb-2 text-base">
                        問題{groupIdx + 1}
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {group.map((q, idx) => (
                            <div
                                key={q._id}
                                onClick={() => {
                                    const el = document.getElementById(
                                        `q-${q._id}`
                                    )
                                    if (el)
                                        el.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                }}
                                className={`cursor-pointer w-9 h-9 rounded-full text-base font-semibold flex items-center justify-center border transition select-none shadow-sm
                                ${
                                    answers[q._id]
                                        ? 'bg-red-500 text-white border-red-600'
                                        : 'text-red-600 border-red-400 hover:bg-red-50'
                                }`}
                            >
                                {idx + 1}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionNavigator
