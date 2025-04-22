import mammoth from 'mammoth'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { saveQuestions } from './api/questionService'

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
        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)

        const parentQuestions = []
        let currentParent = null
        let currentChild = null

        lines.forEach((line, index) => {
            const parentMatch = line.match(/^(I+)\.\s+(.+)/i)
            const paragraphMatch = line.toLowerCase().startsWith('paragraph:')
            const questionMatch = line.match(/^(\d+)\.\s*$/)
            const answerMatch = line.match(/^(\*?)([a-d])\.\s(.+)/)

            // 1. Detect parent question
            if (parentMatch) {
                if (currentParent) {
                    if (currentChild)
                        currentParent.childQuestions.push(currentChild)
                    parentQuestions.push(currentParent)
                }

                currentParent = {
                    parentQuestion: parentMatch[2].trim(),
                    paragraph: '',
                    childQuestions: [],
                }
                currentChild = null
            }

            // 2. Detect paragraph
            else if (paragraphMatch && currentParent) {
                currentParent.paragraph = line
                    .replace(/^paragraph:/i, '')
                    .trim()
            }

            // 3. Detect start of a child question
            else if (questionMatch && currentParent) {
                if (currentChild) {
                    currentParent.childQuestions.push(currentChild)
                }

                currentChild = {
                    content: '', // will be set in next line(s)
                    type: 'multiple_choice',
                    correctAnswer: '',
                    options: [],
                }

                // Try to use the next line as the question content
                const nextLine = lines[index + 1]?.trim()
                if (nextLine && !nextLine.match(/^(\*?)[a-d]\.\s/)) {
                    currentChild.content = nextLine
                }
            }

            // 4. Detect answer options
            else if (answerMatch && currentChild) {
                const [_, star, id, text] = answerMatch
                currentChild.options.push({ id, text })
                if (star === '*') {
                    currentChild.correctAnswer = id
                }
            }
        })

        // Push any remaining questions
        if (currentChild && currentParent) {
            currentParent.childQuestions.push(currentChild)
        }
        if (currentParent) {
            parentQuestions.push(currentParent)
        }

        return { newQuestions: parentQuestions }
    }

    useEffect(() => {
        if (file) {
            handleFileUpload()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    console.log(questions)

    const onSaveQuestions = async () => {
        const res = await saveQuestions(examId, [...questions.newQuestions])
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
            <div className="flex flex-col gap-6 mt-4">
                {questions?.newQuestions?.map((parent, pIndex) => (
                    <div
                        key={pIndex}
                        className="border border-gray-300 p-4 rounded shadow"
                    >
                        <h2 className="text-lg font-bold">
                            {pIndex + 1}. {parent.parentQuestion}
                        </h2>
                        <p className="italic text-gray-600 mt-1">
                            {parent.paragraph}
                        </p>

                        <div className="mt-4 space-y-4">
                            {parent.childQuestions.map((child, cIndex) => (
                                <div
                                    key={cIndex}
                                    className="border border-gray-200 p-3 rounded"
                                >
                                    <p className="font-medium">
                                        {pIndex + 1}.{cIndex + 1}{' '}
                                        {child.content}
                                    </p>
                                    <ul className="mt-2 space-y-1 pl-4">
                                        {child.options.map((opt) => (
                                            <li
                                                key={opt.id}
                                                className={`${
                                                    opt.id ===
                                                    child.correctAnswer
                                                        ? 'text-green-600 font-semibold'
                                                        : ''
                                                }`}
                                            >
                                                {opt.id}. {opt.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {questions?.newQuestions?.length > 0 && (
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
