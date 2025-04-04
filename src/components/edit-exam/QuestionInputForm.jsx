import axiosInstance from '@/network/httpRequest'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add, Delete } from '@mui/icons-material'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

const questionSchema = z.object({
    content: z.string().min(1, 'Câu hỏi không được để trống'),
    options: z
        .array(
            z.object({
                id: z.string(),
                text: z.string().min(1, 'Đáp án không được để trống'),
            })
        )
        .min(2, 'Phải có ít nhất 2 đáp án'),
    correctAnswer: z.string().min(1, 'Phải chọn một đáp án đúng'),
})

function QuestionInputForm({ question = null, onSaveCallback }) {
    const { examId } = useParams()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            content: question?.content || '',
            options: question?.options || [],
            correctAnswer: question?.correctAnswer || '',
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    })

    const correctAnswer = watch('correctAnswer')

    const generateOptionId = (index) => {
        return String.fromCharCode(97 + index)
    }

    const onSubmit = async (data) => {
        console.log([data])
        data.type = 'multiple_choice'

        let res = null

        if (question) {
            res = await axiosInstance.put(
                `exam/${examId}/question/${question.id}`,
                data
            )
        } else {
            res = await axiosInstance.post(`exam/${examId}/questions`, {
                questions: [data],
            })
        }
        if (res.status == 200) {
            alert('Question saved successfully')
            reset()
            onSaveCallback()
        }
    }

    const handleRemoveOption = (index) => {
        if (correctAnswer === fields[index].id) {
            setValue('correctAnswer', '')
        }
        remove(index)
    }

    const handleAddOption = () => {
        const newId = generateOptionId(fields.length)
        append({
            id: newId,
            text: '',
        })
        setValue(`options.${fields.length}.id`, newId)
    }

    return (
        <form className="my-3 pl-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2 mb-4">
                <label className="font-bold text-sm">Câu hỏi:</label>
                <input
                    type="text"
                    className={`border border-gray-400 rounded-sm flex-1 p-2 ${errors.content ? 'border-red-500' : ''}`}
                    {...register('content')}
                    placeholder="Nhập câu hỏi"
                />
                {errors.content && (
                    <span className="text-red-500 text-sm">
                        {errors.content.message}
                    </span>
                )}
            </div>

            <label className="font-bold text-sm block mb-4">
                Đáp án (Nhấn vào radio để chọn đáp án đúng):
            </label>
            <div className="flex flex-col justify-center items-start gap-2 mb-4 pl-8">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex items-center gap-2 mb-2"
                    >
                        <span className="font-medium w-6">
                            {generateOptionId(index)}.
                        </span>
                        <input
                            type="text"
                            className={`border border-gray-400 rounded-sm flex-1 p-2 ${errors.options?.[index]?.text ? 'border-red-500' : ''}`}
                            {...register(`options.${index}.text`)}
                            placeholder={`Nhập đáp án ${index + 1}`}
                        />
                        {errors.options?.[index]?.text && (
                            <span className="text-red-500 text-sm">
                                {errors.options[index].text.message}
                            </span>
                        )}

                        <input
                            type="radio"
                            name="correctAnswer"
                            className="w-4 h-4 cursor-pointer"
                            value={generateOptionId(index)}
                            checked={correctAnswer === generateOptionId(index)}
                            onChange={() =>
                                setValue(
                                    'correctAnswer',
                                    generateOptionId(index)
                                )
                            }
                        />
                        <button
                            type="button"
                            className="rounded-full hover:bg-gray-200 p-2 duration-150 text-red-500"
                            title="Xóa đáp án"
                            onClick={() => handleRemoveOption(index)}
                        >
                            <Delete fontSize="small" />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    disabled={fields.length >= 6}
                    className="second-btn flex items-center gap-2"
                    onClick={handleAddOption}
                    title="Thêm đáp án"
                >
                    <Add fontSize="small" />
                    Thêm đáp án
                </button>

                {errors.options && fields.length < 2 && (
                    <span className="text-red-500 text-sm">
                        Phải có ít nhất 2 đáp án.
                    </span>
                )}
            </div>

            {errors.correctAnswer && (
                <span className="text-red-500 text-sm">
                    {errors.correctAnswer.message}
                </span>
            )}

            <button type="submit" className="primary-btn block">
                Lưu câu hỏi
            </button>
        </form>
    )
}

export default QuestionInputForm
