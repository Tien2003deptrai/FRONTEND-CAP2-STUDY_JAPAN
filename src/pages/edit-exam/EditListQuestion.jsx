import { saveQuestions } from '@/components/edit-exam/api/questionService'
import ChildQuestionsForm from '@/components/edit-exam/questionList/ChildQuestionsForm'
import { formSchema } from '@/components/edit-exam/questionList/schemaValidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add, ArrowBack, Delete } from '@mui/icons-material'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditListQuestion() {
    const { state } = useLocation()
    const { examId } = useParams()
    const navigate = useNavigate()
    const defaultSingleQuestion = {
        parentQuestion: '',
        paragraph: '',
        type: '',
        point: 0,
        instruction: '',
        childQuestions: [
            {
                id: '',
                content: '',
                correctAnswer: '',
                options: [{ id: '', text: '', _id: '' }],
            },
        ],
        _id: '',
    }

    const defaultValues = {
        questions: state?.questions || [defaultSingleQuestion],
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    })

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: 'questions',
    })

    const onSubmit = async (data) => {
        const res = await saveQuestions(examId, [...data.questions])
        if (res.status == 200) {
            alert('Lưu câu hỏi thành công')
            navigate(-1)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-4xl mx-auto p-4"
        >
            <div className="flex items-center gap-6 mb-6">
                <button
                    className=" text-primary rounded-full shadow-sm"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                    type="button"
                >
                    <ArrowBack />
                </button>
                <h1 className="text-2xl font-bold"> Chỉnh sửa câu hỏi</h1>
            </div>
            <hr />
            {questionFields.map((question, qIndex) => (
                <div
                    key={question.id}
                    className="border border-gray-300 border-solid rounded-lg p-4 shadow-sm bg-white"
                >
                    <h2 className="font-bold text-lg mb-4 text-primary">
                        Part {qIndex + 1}
                    </h2>
                    <div className="space-y-4">
                        {/* Parent Question Input */}
                        <label className="block">
                            <input
                                {...register(
                                    `questions.${qIndex}.parentQuestion`
                                )}
                                placeholder="Tiêu đề"
                                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                            />
                        </label>
                        {errors.questions?.[qIndex]?.parentQuestion && (
                            <p className="text-red-500 text-sm">
                                {
                                    errors.questions[qIndex].parentQuestion
                                        .message
                                }
                            </p>
                        )}

                        <textarea
                            {...register(`questions.${qIndex}.paragraph`)}
                            placeholder="Đoạn văn bản"
                            className="border border-gray-300 rounded-lg p-2 w-full mt-1 h-24"
                            Increased
                            height
                        />
                        {errors.questions?.[qIndex]?.paragraph && (
                            <p className="text-red-500 text-sm">
                                {errors.questions[qIndex].paragraph.message}
                            </p>
                        )}
                    </div>

                    {/* Child Questions Component */}
                    <ChildQuestionsForm
                        control={control}
                        register={register}
                        errors={errors}
                        nestIndex={qIndex}
                    />

                    {/* Remove Question Button */}
                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded hover:bg-red-50"
                            aria-label={`Remove Question ${qIndex + 1}`}
                        >
                            <Delete /> Xóa Part {qIndex + 1}
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Question Button */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={() => appendQuestion(defaultSingleQuestion)}
                    className="flex items-center gap-2 second-btn"
                >
                    <Add /> Thêm phần câu hỏi mới
                </button>
            </div>

            {Object.keys(errors).length > 0 && (
                <p className="text-red-600 text-center font-semibold mt-4">
                    Please fix the validation errors marked above before
                    submitting.
                </p>
            )}
            {errors.questions?.message && !Array.isArray(errors.questions) && (
                <p className="text-red-600 text-center font-semibold mt-2">
                    {errors.questions.message}
                </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
                <button
                    type="submit"
                    className="primary-btn"
                    disabled={Object.keys(errors).length > 0}
                >
                    Lưu
                </button>
            </div>
        </form>
    )
}

export default EditListQuestion
