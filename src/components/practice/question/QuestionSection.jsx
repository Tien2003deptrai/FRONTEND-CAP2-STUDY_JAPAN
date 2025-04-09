import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionSection = ({
    section,
    questions,
    answers,
    onAnswerChange,
    sectionIndex,
}) => {
    return (
        <div className="bg-white rounded shadow p-5">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
                Phần {sectionIndex + 1}: {section.title || 'Không có tiêu đề'}
            </h2>

            {questions.map((q, qIndex) => (
                <QuestionItem
                    key={q._id}
                    question={q}
                    index={qIndex}
                    answer={answers[q._id]}
                    onAnswerChange={onAnswerChange}
                />
            ))}
        </div>
    )
}

export default QuestionSection
