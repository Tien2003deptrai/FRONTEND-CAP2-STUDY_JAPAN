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
        <div className="space-y-4 mt-4">
            <h3 className="font-semibold mt-4 mb-2">Câu hỏi</h3>
            {childErrors?.message && !Array.isArray(childErrors) && (
                <p className="text-red-500 text-sm">{childErrors.message}</p>
            )}
            {fields.map((child, cIndex) => (
                <div
                    key={child.id}
                    className="border border-dashed border-gray-300 rounded-lg p-4 ml-4"
                >
                    <label className="block mb-2">
                        <span className="text-gray-700">
                            Câu hỏi {cIndex + 1}
                        </span>
                        <input
                            {...register(
                                `${childQuestionsPath}.${cIndex}.content`
                            )}
                            placeholder={`Nội dung câu hỏi ${cIndex + 1}`}
                            className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                        />
                    </label>
                    {childErrors?.[cIndex]?.content && (
                        <p className="text-red-500 text-sm mb-2">
                            {childErrors[cIndex].content.message}
                        </p>
                    )}

                    {/* Correct Answer Input - This is now handled by the radio buttons in OptionsForm */}
                    {/* We still need to show the error message for the correctAnswer field itself if no radio is selected */}
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

                    {/* Remove Child Question Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={() => remove(cIndex)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
                            aria-label={`Remove Child Question ${cIndex + 1}`}
                        >
                            <Delete fontSize="small" /> Xóa câu hỏi {cIndex + 1}
                        </button>
                    </div>
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
                            options: [{ id: '', text: '', _id: '' }],
                        })
                    }
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                >
                    <Add /> Thêm câu hỏi
                </button>
            </div>
        </div>
    )
}

export default ChildQuestionsForm
