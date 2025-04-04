import UploadQuestionsFile from '@/components/edit-exam/UploadQuestionsFile'
import axiosInstance from '@/network/httpRequest'
import { Delete, Edit } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function EditExam() {
    const { examId } = useParams()

    const { data: examData, refetch } = useQuery({
        queryKey: ['exam data', examId],
        queryFn: async () => {
            const response = await axiosInstance.get(`exam/${examId}`)
            return response.data.data
        },
    })

    const onSave = async () => {
        const payload = {
            questions: [...examData.questions],
        }
        console.log(payload)
    }

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
                await axiosInstance.delete(
                    `exam/${examId}/question/${questionId}`
                )
                Swal.fire({
                    title: 'Đã xóa!',
                    text: 'Câu hỏi của bạn đã bị xóa.',
                    icon: 'success',
                    didClose: () => {
                        refetch()
                    },
                })
            }
        })
    }

    return (
        <div className="w-full">
            <label className="font-bold text-2xl">Tên thư mục:</label>
            <label className="font-bold text-primary text-2xl ml-2">
                {examData?.title}
            </label>
            <hr className="my-4" />
            <div>
                <label className="font-bold text-lg">
                    Upload câu hỏi (Word, .docx):
                </label>
                <UploadQuestionsFile onSaveCallback={refetch} />
            </div>
            <hr className="my-4" />
            <div>
                <label className="font-bold text-lg block mb-3">
                    Danh sách câu hỏi:
                </label>
                {/* Questions */}
                {examData?.questions?.map((question, index) => (
                    <div
                        key={question.id}
                        className="flex justify-between items-center gap-2 border border-solid border-gray-400 p-4 rounded-lg shadow mb-4"
                    >
                        <div>
                            <label className="font-bold text-primary w-fit">
                                Câu hỏi {index + 1}:
                            </label>
                            <label className="w-fit ml-2">
                                {question.content}
                            </label>
                        </div>
                        <div className="flex gap-4 ">
                            <Link
                                to={`${question._id}`}
                                title="Chỉnh sửa"
                                className="rounded-full hover:bg-gray-200 p-2 duration-150 text-blue-600"
                            >
                                <Edit />
                            </Link>
                            <button
                                onClick={() => onDelete(question.id)}
                                title="Xóa"
                                className="rounded-full hover:bg-gray-200 p-2 duration-150 text-primary"
                            >
                                <Delete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {examData?.questions?.length > 0 ? (
                <button className="primary-btn" onClick={onSave}>
                    Lưu
                </button>
            ) : (
                <div className="text-gray-500 text-sm mt-2">
                    Không có câu hỏi nào trong danh sách.
                </div>
            )}
        </div>
    )
}

export default EditExam
