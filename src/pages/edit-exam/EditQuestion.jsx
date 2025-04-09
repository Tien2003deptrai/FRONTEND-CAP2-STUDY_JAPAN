import QuestionInputForm from '@/components/edit-exam/QuestionInputForm'
import { ArrowBack } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

function EditQuestion() {
    const location = useLocation()
    const navigate = useNavigate()
    const question = location.state
    console.log(question)

    return (
        <div className="py-4">
            <div className="flex items-center gap-4">
                <button
                    className="p-4 text-primary rounded-full shadow-sm"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                >
                    <ArrowBack />
                </button>
                <label className="font-bold text-2xl">Chỉnh sửa câu hỏi:</label>
            </div>
            <QuestionInputForm
                question={question}
                onSaveCallback={() => navigate(-1)}
            />
        </div>
    )
}

export default EditQuestion
