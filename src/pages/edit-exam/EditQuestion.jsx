import QuestionInputForm from '@/components/edit-exam/QuestionInputForm'
import { ArrowBack } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

function EditQuestion({ isRevisionMode = false }) {
    const location = useLocation()
    const navigate = useNavigate()
    const question = location.state

    return (
        <div className="py-4">
            <div className="flex items-center gap-4">
                <button
                    className="p-2 text-primary rounded-full shadow-sm"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                >
                    <ArrowBack />
                </button>
                <label className="font-bold text-2xl">Chỉnh sửa câu hỏi:</label>
            </div>
            <hr className="my-4" />
            <QuestionInputForm
                isRevisionMode={isRevisionMode}
                question={question}
                onSaveCallback={() => navigate(-1, { replace: true })}
            />
        </div>
    )
}

export default EditQuestion
