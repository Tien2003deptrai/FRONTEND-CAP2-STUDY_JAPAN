import { saveQuestions } from '@/components/edit-exam/api/questionService'
import ChildQuestionsForm from '@/components/edit-exam/questionList/ChildQuestionsForm'
import { formSchema } from '@/components/edit-exam/questionList/schemaValidate'
import { uploadImage } from '@/util/firebase/firebaseUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Progress } from '@mantine/core'
import { Add, ArrowBack, Delete } from '@mui/icons-material'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditListQuestion() {
    const { state } = useLocation()
    const { examId } = useParams()
    const navigate = useNavigate()
    const [imgUrls, setImgUrls] = useState({})
    const [progress, setProgress] = useState()

    const defaultSingleQuestion = {
        parentQuestion: '',
        imgUrl: '',
        paragraph: '',
        type: '',
        point: 0,
        instruction: '',
        childQuestions: [
            {
                id: '',
                content: '',
                correctAnswer: '',
                options: [{ id: '', text: '' }],
            },
        ],
    }

    const defaultValues = {
        questions: state?.questions || [defaultSingleQuestion],
    }

    const {
        control,
        register,
        handleSubmit,
        setValue,
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

    const handleThumbnailChange = async (e, qIndex) => {
        const file = e.target.files[0]
        if (file) {
            const url = await uploadImage(file, (progress) => {
                setProgress(progress)
            })
            setValue(`questions.${qIndex}.imgUrl`, url, {
                shouldValidate: true,
                shouldDirty: true,
            })
            setImgUrls((prev) => ({
                ...prev,
                [qIndex]: url,
            }))
            console.log(url)
        }
    }

    const onSubmit = async (data) => {
        console.log('Form Data:', data)
        const res = await saveQuestions(examId, [...data.questions])
        if (res.status === 200) {
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
                    className="text-primary rounded-full shadow-sm"
                    onClick={() => navigate(-1)}
                    title="Quay lại"
                    type="button"
                >
                    <ArrowBack />
                </button>
                <h1 className="text-2xl font-bold">Chỉnh sửa câu hỏi</h1>
            </div>
            <hr />
            {questionFields.map((question, qIndex) => (
                <div
                    key={question.id}
                    className="border border-gray-300 border-solid rounded-lg p-4 shadow-sm bg-white"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg mb-4 text-primary">
                            Part {qIndex + 1}
                        </h2>
                        <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="flex items-center gap-2 second-btn"
                            aria-label={`Remove Question ${qIndex + 1}`}
                        >
                            <Delete /> Xóa Part {qIndex + 1}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* Parent Question Input */}
                        <label className="block">
                            <input
                                {...register(
                                    `questions.${qIndex}.parentQuestion`
                                )}
                                placeholder="Tiêu đề"
                                className="border-gray-300 mt-1 border p-2 w-full rounded py-4 px-4"
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
                            className="border-gray-300 mt-1 h-24 border p-2 w-full rounded py-4 px-4"
                        />
                        {errors.questions?.[qIndex]?.paragraph && (
                            <p className="text-red-500 text-sm">
                                {errors.questions[qIndex].paragraph.message}
                            </p>
                        )}

                        <div className="p-4">
                            <label className="block font-bold text-gray-700 mb-2">
                                Hình ảnh
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleThumbnailChange(e, qIndex)
                                }
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />

                            {errors.questions?.[qIndex]?.thumbnail && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.questions[qIndex].thumbnail.message}
                                </p>
                            )}
                            {progress > 0 && progress < 100 && (
                                <Progress value={progress} />
                            )}
                            {(question?.imgUrl || imgUrls[qIndex]) && (
                                <img
                                    src={question.imgUrl || imgUrls[qIndex]}
                                    alt={`Thumbnail Preview ${qIndex + 1}`}
                                    className="mt-4 w-80 object-cover rounded"
                                />
                            )}
                        </div>
                    </div>

                    {/* Child Questions Component */}
                    <ChildQuestionsForm
                        control={control}
                        register={register}
                        errors={errors}
                        nestIndex={qIndex}
                    />
                </div>
            ))}

            {/* Add Question Button */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={() => appendQuestion(defaultSingleQuestion)}
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-blue-700 hover:bg-blue-200 duration-150 bg-blue-100"
                >
                    <Add fontSize="small" /> Thêm phần câu hỏi mới
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
                    className=" bg-green-600 px-4 py-3 text-white rounded-md hover:bg-green-700 duration-150"
                >
                    Lưu bài thi
                </button>
            </div>
        </form>
    )
}

export default EditListQuestion
