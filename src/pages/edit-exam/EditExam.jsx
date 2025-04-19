import QuestionInputForm from '@/components/edit-exam/QuestionInputForm'
import UploadQuestionsFile from '@/components/edit-exam/UploadQuestionsFile'
import axiosInstance from '@/network/httpRequest'
import { ArrowBack, Delete, Edit } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

function EditExam() {
    const { examId } = useParams()
    const navigate = useNavigate()
    const { data: examData, refetch } = useQuery({
        queryKey: ['exam data', examId],
        queryFn: async () => {
            const response = await axiosInstance.get(`exam/${examId}`)
            return response.data.data
        },
    })
    console.log(examData)

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
                    `exam/${examId}/question/${questionId}`
                )
                if (res.status === 200) {
                    refetch()
                    toast.success('Xóa câu hỏi thành công!')
                }
            }
        })
    }

    return (
        <div className="w-full py-4">
            <ToastContainer
                hideProgressBar
                autoClose={3000}
                style={{ marginTop: '80px' }}
            />
            <div className="flex items-center gap-4">
                <button
                    className="p-4 text-primary rounded-full shadow-sm"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                >
                    <ArrowBack />
                </button>
                <div>
                    <label className="font-bold text-2xl">Tên thư mục:</label>
                    <label className="font-bold text-primary text-2xl ml-2">
                        {examData?.title}
                    </label>
                </div>
            </div>
            <hr className="my-4" />
            <div>
                <label className="font-bold text-lg">
                    Upload câu hỏi từ Microsoft Word (.doc, .docx):
                </label>
                <UploadQuestionsFile onSaveCallback={refetch} />
            </div>
            <hr className="my-4" />
            <div>
                <label className="font-bold text-lg">Nhập câu hỏi:</label>
                <QuestionInputForm onSaveCallback={refetch} />
            </div>
            <hr className="my-4" />
            <div>
                <div className="flex justify-between items-center">
                    <label className="font-bold text-lg block ">
                        Danh sách câu hỏi:
                    </label>
                    <Link
                        className="primary-btn"
                        to={'questions'}
                        state={{ questions: examData?.questions }}
                    >
                        Chỉnh sửa câu hỏi
                    </Link>
                </div>
                <hr className="my-6" />

                {examData?.questions?.map((questionGroup, groupIndex) => (
                    <div key={questionGroup._id} className="mb-6">
                        <div className="mb-2 font-semibold text-primary">
                            {groupIndex + 1}. {questionGroup.parentQuestion}
                        </div>

                        {questionGroup.childQuestions.map((q, index) => (
                            <div
                                key={q.id}
                                className="flex justify-between items-center gap-2 border border-gray-400 p-4 rounded-lg shadow mb-4"
                            >
                                <div>
                                    <label className="font-bold text-primary">
                                        Câu hỏi {index + 1}:
                                    </label>
                                    <label className="ml-2">{q.content}</label>
                                </div>
                                <div className="flex gap-4">
                                    <Link
                                        to={`${q.id}`}
                                        state={q}
                                        title="Chỉnh sửa"
                                        className="rounded-full hover:bg-gray-200 p-2 duration-150 text-blue-600"
                                    >
                                        <Edit />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(q.id)}
                                        title="Xóa"
                                        className="rounded-full hover:bg-gray-200 p-2 duration-150 text-primary"
                                    >
                                        <Delete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {examData?.questions?.length <= 0 && (
                <div className="text-gray-500 text-sm mt-2">
                    Không có câu hỏi nào trong danh sách.
                </div>
            )}
        </div>
    )
}

export default EditExam
