import React from 'react'

const QuestionSection = ({
    section,
    sectionIndex,
    questions = [],
    answers,
    onAnswerChange,
}) => {
    return (
        <div className="space-y-10 mb-2">
            {section?.title && (
                <h2 className="text-2xl font-bold text-red-700 border-b-2 border-red-300 pb-3">
                    {section.title} 
                </h2>
            )}

            {questions.map((q) => (
                <div
                    key={q._id}
                    className="border border-red-200 rounded-2xl shadow-md bg-white"
                >
                    {/* Header */}
                    {q.parentQuestion && (
                        <div className="bg-red-50 px-6 py-3 text-md italic text-gray-800 border-b border-red-200 rounded-t-2xl">
                            <strong className="text-red-700">
                                問題 {sectionIndex + 1}:
                            </strong>{' '}
                            {q.parentQuestion}
                        </div>
                    )}

                    {q.paragraph && (
                        <div className="bg-red-100 px-6 py-4 text-base text-gray-900 border-b border-red-300">
                            📖 {q.paragraph}
                        </div>
                    )}

                    {/* Child Questions */}
                    {(q.childQuestions || []).map((child, childIdx, arr) => (
                        <div
                            key={child._id}
                            id={`q-${child._id}`}
                            className={`px-6 py-6 ${
                                childIdx !== arr.length - 1
                                    ? 'border-b-2 border-dashed border-red-200'
                                    : ''
                            }`}
                        >
                            <div className="mb-4 text-base font-semibold text-gray-800">
                                {childIdx + 1}. {child.content}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {child.options.map((opt) => (
                                    <label
                                        key={opt._id}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${child._id}`}
                                            value={opt.id}
                                            checked={
                                                answers[child._id] === opt.id
                                            }
                                            onChange={() =>
                                                onAnswerChange(
                                                    child._id,
                                                    opt.id
                                                )
                                            }
                                            className="w-5 h-5 accent-red-600 focus:ring-2 focus:ring-red-300"
                                        />
                                        <span className="text-gray-800 text-base">
                                            {opt.text}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default QuestionSection
