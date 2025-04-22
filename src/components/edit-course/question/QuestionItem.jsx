import axiosInstance from '@/network/httpRequest'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

function QuestionItem({
    question,
    index,
    lessonId,
    renshuuId,
    onDeleteCallback,
}) {
    const onDelete = (questionId) => {
        console.log(questionId)
        Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể hoàn tác hành động này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xóa nó!',
            cancelButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosInstance.delete(
                    `renshuu/${renshuuId}/question/${questionId}`
                )
                if (res.status === 200) {
                    onDeleteCallback()
                    toast.success('Xóa câu hỏi thành công!')
                }
            }
        })
    }
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
                    onClick={() => onDelete(question._id)}
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
