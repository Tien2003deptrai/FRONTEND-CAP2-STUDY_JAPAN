import React from 'react'

const QuestionItem = ({ question, answer, onAnswerChange, index }) => {
    return (
        <div className="mt-6 border p-4 rounded bg-gray-50">
            <p className="font-medium mb-2">
                Câu {index + 1}: {question.content}
            </p>

            {question.instruction && (
                <p className="text-sm text-gray-500 italic mb-2">
                    {question.instruction}
                </p>
            )}

            {question.mediaUrl && (
                <div className="mb-3">
                    <audio controls className="w-full">
                        <source src={question.mediaUrl} type="audio/mpeg" />
                        Trình duyệt không hỗ trợ audio.
                    </audio>
                </div>
            )}

            {question.readingPassage && (
                <div className="bg-yellow-50 text-sm italic p-3 rounded mb-2">
                    {question.readingPassage}
                </div>
            )}

            {question.options?.length > 0 ? (
                <div className="grid gap-2">
                    {question.options.map((opt) => (
                        <label
                            key={opt._id}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="radio"
                                name={`question_${question._id}`}
                                value={opt.id}
                                checked={answer === opt.id}
                                onChange={() =>
                                    onAnswerChange(question._id, opt.id)
                                }
                                className="form-radio text-blue-600"
                            />
                            <span>{opt.text}</span>
                        </label>
                    ))}
                </div>
            ) : (
                <input
                    type="text"
                    placeholder="Nhập câu trả lời..."
                    className="mt-2 w-full border px-3 py-2 rounded"
                    value={answer || ''}
                    onChange={(e) =>
                        onAnswerChange(question._id, e.target.value)
                    }
                />
            )}
        </div>
    )
}

export default QuestionItem
