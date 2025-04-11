import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function QuestionItem({ question, index, lessonId, renshuuId }) {
    return (
        <div
            key={question._id}
            className="border border-gray-200 border-solid p-4 rounded-md flex flex-col gap-2 "
        >
            <h3 className="w-full text-lg font-semibold text-gray-700">
                {index + 1}. {question.content}
            </h3>
            <div className="flex flex-col gap-4 px-5">
                {question.options.map((option, i) => (
                    <div key={i} className="flex items-center gap-2 ">
                        <label
                            className={`${question.correctAnswer == option.id ? 'text-primary font-bold' : ''}`}
                        >
                            {option.id}. {option.text}
                        </label>
                    </div>
                ))}
            </div>
            <hr className="my-2" />
            <div className="flex justify-start items-center gap-2">
                <Link
                    to={`question/${lessonId}/${renshuuId}`}
                    state={question}
                    title="Chỉnh sửa"
                    className="rounded-full hover:bg-gray-200 p-2 duration-150 text-blue-600"
                >
                    <Edit />
                </Link>
                <button
                    // onClick={() => onDelete(question.id)}
                    title="Xóa"
                    className="rounded-full hover:bg-gray-200 p-2 duration-150 text-primary"
                >
                    <Delete />
                </button>
            </div>
        </div>
    )
}

export default QuestionItem
