import { Add, Delete } from '@mui/icons-material'
import { useFieldArray } from 'react-hook-form'
import OptionsForm from './OptionsForm'

function ChildQuestionsForm({ control, register, errors, nestIndex }) {
    const childQuestionsPath = `questions.${nestIndex}.childQuestions`
    const { fields, append, remove } = useFieldArray({
        control,
        name: childQuestionsPath,
    })

    const childErrors = errors.questions?.[nestIndex]?.childQuestions

    return (
        <div className="space-y-4 mt-8">
            <h3 className="font-semibold mt-4 mb-2 px-4">Câu hỏi</h3>
            {childErrors?.message && !Array.isArray(childErrors) && (
                <p className="text-red-500 text-sm">{childErrors.message}</p>
            )}
            {fields.map((child, cIndex) => (
                <div
                    id={`q${nestIndex}_c${cIndex}`}
                    key={child.id}
                    className="border border-dashed border-gray-300 rounded-lg p-4 ml-4 mt-32"
                >
                    <div
                        id={`question_${cIndex}`}
                        className="flex justify-between items-center gap-2 mb-4"
                    >
                        <span className="text-lg text-primary font-bold">
                            Câu {cIndex + 1}:
                        </span>
                        <button
                            type="button"
                            onClick={() => remove(cIndex)}
                            className="flex items-center gap-2 second-btn"
                            aria-label={`Remove Child Question ${cIndex + 1}`}
                        >
                            <Delete fontSize="small" /> Xóa câu hỏi {cIndex + 1}
                        </button>
                    </div>
                    <input
                        {...register(`${childQuestionsPath}.${cIndex}.content`)}
                        placeholder={`Nội dung câu hỏi ${cIndex + 1}`}
                        className=" border-gray-300 border p-2 w-full rounded py-4 px-4"
                    />
                    {childErrors?.[cIndex]?.content && (
                        <p className="text-red-500 text-sm mb-2">
                            {childErrors[cIndex].content.message}
                        </p>
                    )}

                    {childErrors?.[cIndex]?.correctAnswer && (
                        <p className="text-red-500 text-sm mb-2">
                            {childErrors[cIndex].correctAnswer.message}
                        </p>
                    )}

                    {/* Options Component */}
                    <OptionsForm
                        control={control}
                        register={register}
                        errors={errors}
                        qIndex={nestIndex}
                        cIndex={cIndex}
                    />
                </div>
            ))}
            {/* Add Child Question Button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() =>
                        append({
                            id: '',
                            content: '',
                            correctAnswer: '',
                        })
                    }
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-blue-700 hover:bg-blue-200 duration-150 bg-blue-100"
                >
                    <Add fontSize="small" /> Thêm câu hỏi
                </button>
            </div>
        </div>
    )
}

export default ChildQuestionsForm
