import axiosInstance from '@/network/httpRequest'
import mammoth from 'mammoth'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

function UploadQuestionsFile({ onSaveCallback }) {
    const [questions, setQuestions] = useState([])
    const [file, setFile] = useState(null)
    const fileInputRef = useRef(null)
    const { examId } = useParams()

    const handleFileUpload = () => {
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
        let collectingQuestionText = false

        lines.forEach((line) => {
            console.log('Processing line:', line) // Debugging

            // Detect Question Number
            const questionMatch = line.match(/^(\d+)\.\s*(.*)/)
            if (questionMatch) {
                if (currentQuestion) parsedData.push(currentQuestion)

                currentQuestion = {
                    type: 'multiple_choice',
                    content: '',
                    options: [],
                    correctAnswer: '',
                    point: 10,
                }
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
        console.log('Parsed Questions:', JSON.stringify(parsedData, null, 2))
        return { questions: parsedData }
    }

    useEffect(() => {
        if (file) {
            handleFileUpload()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    console.log(questions)

    const onSaveQuestions = async () => {
        const res = await axiosInstance.post(`exam/${examId}/questions`, {
            questions: questions.questions,
        })
        if (res.status == 200) {
            alert('Questions saved successfully')
            clearFileInput()
            onSaveCallback()
        }
    }

    const clearFileInput = () => {
        setFile(null)
        setQuestions([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="my-3">
            <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0])}
            />
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
            {questions?.questions?.length > 0 && (
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={clearFileInput}
                        className="primary-btn bg-blue-100 hover:bg-blue-200 text-blue-700
                         hover:border-blue-200 hover:text-blue-700"
                        title="Xóa bộ câu hỏi"
                    >
                        Xóa bộ câu hỏi
                    </button>
                    <button onClick={onSaveQuestions} className="primary-btn ">
                        Lưu bộ câu hỏi
                    </button>
                </div>
            )}
        </div>
    )
}

export default UploadQuestionsFile
