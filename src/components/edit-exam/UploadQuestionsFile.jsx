import mammoth from 'mammoth'
import { useState } from 'react'

function UploadQuestionsFile() {
    const [questions, setQuestions] = useState([])

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                if (e.target?.result instanceof ArrayBuffer) {
                    const extractedText = await extractTextFromDocx(
                        e.target.result
                    )
                    console.log('Extracted Text:\n', extractedText)
                    const parsedQuestions = formatQuestions(extractedText)
                    setQuestions(parsedQuestions)
                }
            }
            reader.readAsArrayBuffer(file)
        }
    }

    const extractTextFromDocx = async (arrayBuffer) => {
        const result = await mammoth.extractRawText({ arrayBuffer })
        return result.value
    }

    const formatQuestions = (text) => {
        const lines = text.split('\n').filter((line) => line.trim() !== '')
        const parsedData = []
        let currentQuestion = null
        let questionCount = 1
        let collectingQuestionText = false

        lines.forEach((line) => {
            console.log('Processing line:', line) // Debugging

            // Detect Question Number
            const questionMatch = line.match(/^(\d+)\.\s*(.*)/)
            if (questionMatch) {
                if (currentQuestion) parsedData.push(currentQuestion)

                const questionId = `q${String(questionCount).padStart(3, '0')}`
                currentQuestion = {
                    id: questionId,
                    type: 'multiple_choice',
                    content: '',
                    options: [],
                    correctAnswer: '',
                    point: 10,
                }
                questionCount++
                collectingQuestionText = true

                let questionText = questionMatch[2].trim()
                questionText = questionText
                    .replace(/\(\d+\.\d+\s*point\)/i, '')
                    .trim() // Remove "(0.300 point)"

                // If question text exists in the same line, assign it
                if (questionText) {
                    currentQuestion.content = questionText
                    collectingQuestionText = false // No need to collect further lines
                }
            } else if (collectingQuestionText && currentQuestion) {
                // Continue collecting the question text (next line)
                let questionText = line.trim()
                questionText = questionText
                    .replace(/\(\d+\.\d+\s*point\)/i, '')
                    .trim() // Remove "(0.300 point)"

                if (questionText) {
                    currentQuestion.content += ` ${questionText}`.trim()
                    collectingQuestionText = false
                }
            } else {
                // Detect Answer Choices
                const answerMatch = line.match(/^(\*?)([a-d])\.\s(.+)/)
                if (answerMatch && currentQuestion) {
                    const isCorrect = answerMatch[1] === '*'
                    const optionId = answerMatch[2]
                    const text = answerMatch[3].trim()

                    currentQuestion.options.push({ id: optionId, text })

                    if (isCorrect) {
                        currentQuestion.correctAnswer = optionId
                    }
                }
            }
        })

        if (currentQuestion) parsedData.push(currentQuestion)
        console.log('Parsed Questions:', JSON.stringify(parsedData, null, 2)) // Debugging
        return { questions: parsedData }
    }
    console.log(questions)

    return (
        <div>
            <input type="file" accept=".docx" onChange={handleFileUpload} />
            <div className="flex flex-col gap-4 mt-4">
                {questions?.questions?.map((question, index) => (
                    <div
                        key={question.id}
                        className='w-full border border-solid border-gray-400 p-4 rounded-lg shadow mb-4"'
                    >
                        <h2 className="font-semibold">
                            {index + 1}. {question.content}
                        </h2>
                        <ul className={`pl-6 mt-2 gap-2 flex flex-col`}>
                            {question.options.map((option) => (
                                <li
                                    key={option.id}
                                    className={`${
                                        question.correctAnswer === option.id
                                            ? 'text-primary font-semibold'
                                            : ''
                                    }`}
                                >
                                    {option.id}. {option.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button
                onClick={() => console.log(questions)}
                className="primary-btn mt-4"
            >
                Lưu bộ câu hỏi
            </button>
        </div>
    )
}

export default UploadQuestionsFile
