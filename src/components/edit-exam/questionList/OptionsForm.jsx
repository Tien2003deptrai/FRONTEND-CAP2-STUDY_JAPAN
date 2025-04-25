import { Add, Delete } from '@mui/icons-material'
import { useFieldArray } from 'react-hook-form'

const generateOptionId = (index) => {
    return String.fromCharCode(97 + index)
}

function OptionsForm({
    control,
    register,
    errors,
    qIndex,
    cIndex,
    isStartTimeOver, // Receive the state as a prop
}) {
    const optionsPath = `questions.${qIndex}.childQuestions.${cIndex}.options`
    const { fields, append, remove } = useFieldArray({
        control,
        name: optionsPath,
    })

    const optionsErrors =
        errors.questions?.[qIndex]?.childQuestions?.[cIndex]?.options

    return (
        <div className="space-y-2 mt-8 pl-4">
            <h4 className="font-medium mb-2">Đáp án</h4>
            {optionsErrors?.message && !Array.isArray(optionsErrors) && (
                <p className="text-red-500 text-sm">{optionsErrors.message}</p>
            )}
            {fields.map((opt, oIndex) => (
                <div
                    key={opt.id}
                    className="flex items-center gap-4 border-b border-gray-200 pb-2"
                >
                    <span className="font-medium text-gray-600 w-5 text-center">
                        {generateOptionId(oIndex)}.
                    </span>

                    <div className="flex-1">
                        <input
                            type="text"
                            {...register(`${optionsPath}.${oIndex}.text`)}
                            placeholder={`Đáp án ${oIndex + 1}`}
                            className=" border-gray-300 border p-2 w-full rounded py-4 px-4"
                            disabled={isStartTimeOver} // Disable input if startTime is over
                        />
                        {optionsErrors?.[oIndex]?.text && (
                            <p className="text-red-500 text-sm mt-1">
                                {optionsErrors[oIndex].text.message}
                            </p>
                        )}
                    </div>

                    <input
                        type="radio"
                        {...register(
                            `questions.${qIndex}.childQuestions.${cIndex}.correctAnswer`
                        )}
                        value={generateOptionId(oIndex)}
                        className="w-4 h-4 border-gray-300 rounded-full text-teal-600 focus:ring-teal-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-teal-500 dark:checked:border-teal-500"
                        disabled={isStartTimeOver} // Disable radio button if startTime is over
                    />

                    <button
                        type="button"
                        onClick={() => remove(oIndex)}
                        className={`text-gray-400 hover:text-red-700 ${
                            isStartTimeOver ? 'cursor-not-allowed' : ''
                        }`}
                        disabled={isStartTimeOver} // Disable button if startTime is over
                    >
                        <Delete fontSize="small" />
                    </button>
                </div>
            ))}

            <div className="flex justify-end pt-2">
                <button
                    type="button"
                    disabled={fields.length >= 4 || isStartTimeOver} // Disable button if startTime is over
                    onClick={() =>
                        append({
                            id: generateOptionId(fields.length),
                            text: '',
                        })
                    }
                    className={`flex items-center gap-2 text-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-600 ${
                        isStartTimeOver
                            ? 'cursor-not-allowed text-gray-400'
                            : ''
                    }`}
                >
                    <Add fontSize="small" /> Thêm đáp án
                </button>
            </div>
        </div>
    )
}

export default OptionsForm
