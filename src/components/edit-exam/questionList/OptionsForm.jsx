import { Add, Delete } from '@mui/icons-material'
import { useFieldArray } from 'react-hook-form'

const generateOptionId = (index) => {
    return String.fromCharCode(97 + index)
}

function OptionsForm({ control, register, errors, qIndex, cIndex }) {
    const optionsPath = `questions.${qIndex}.childQuestions.${cIndex}.options`
    const { fields, append, remove } = useFieldArray({
        control,
        name: optionsPath,
    })

    const optionsErrors =
        errors.questions?.[qIndex]?.childQuestions?.[cIndex]?.options

    return (
        <div className="space-y-2 mt-4 pl-4">
            {' '}
            {/* Added padding */}
            <h4 className="font-medium mb-2">Options</h4>
            {/* Display error if the entire options array is invalid (e.g., empty) */}
            {optionsErrors?.message && !Array.isArray(optionsErrors) && (
                <p className="text-red-500 text-sm">{optionsErrors.message}</p>
            )}
            {fields.map((opt, oIndex) => (
                <div
                    key={opt.id}
                    className="flex items-center gap-4 border-b border-gray-200 pb-2"
                >
                    {/* Option Label (a, b, c) */}
                    <span className="font-medium text-gray-600 w-5 text-center">
                        {generateOptionId(oIndex)}.
                    </span>

                    {/* Option Text Input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            {...register(`${optionsPath}.${oIndex}.text`)}
                            placeholder={`Option text`}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                        {optionsErrors?.[oIndex]?.text && (
                            <p className="text-red-500 text-sm mt-1">
                                {optionsErrors[oIndex].text.message}
                            </p>
                        )}
                    </div>

                    {/* Correct Answer Radio Button */}
                    <input
                        type="radio"
                        {...register(
                            `questions.${qIndex}.childQuestions.${cIndex}.correctAnswer`
                        )}
                        value={generateOptionId(oIndex)}
                        className="w-4 h-4 cursor-pointer"
                    />

                    {/* Remove Option Button */}
                    <button
                        type="button"
                        onClick={() => remove(oIndex)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove Option ${generateOptionId(oIndex)}`}
                    >
                        <Delete fontSize="small" />
                    </button>
                </div>
            ))}
            {/* Add Option Button */}
            <div className="flex justify-end pt-2">
                <button
                    type="button"
                    onClick={() =>
                        append({
                            id: generateOptionId(fields.length),
                            text: '',
                            _id: '',
                        })
                    }
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700 text-sm"
                >
                    <Add fontSize="small" /> Add Option
                </button>
            </div>
        </div>
    )
}

export default OptionsForm
