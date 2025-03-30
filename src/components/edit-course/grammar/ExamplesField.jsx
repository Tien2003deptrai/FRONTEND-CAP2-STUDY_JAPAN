import axiosInstance from '@/network/httpRequest'
import { Add } from '@mui/icons-material'
import { useFieldArray } from 'react-hook-form'

const ExamplesField = ({ control, register, gIndex, grammar, refetch }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `grammars.${gIndex}.examples`,
    })

    const onDeleteExamples = async (field, index) => {
        if (!field?._id) {
            remove(index)
        } else {
            const res = await axiosInstance.delete(
                `grammar/${grammar?._id}/example/${field?._id}`
            )
            if (res.status === 200) {
                refetch()
            }
        }
    }

    console.log(grammar, fields)

    return (
        <>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                    <div className="grow grid grid-cols-2 gap-3">
                        <input
                            className="border p-2 rounded"
                            placeholder="Câu tiếng Nhật"
                            {...register(
                                `grammars.${gIndex}.examples.${index}.ja`
                            )}
                        />
                        <input
                            className="border p-2 rounded"
                            placeholder="Dịch tiếng Việt"
                            {...register(
                                `grammars.${gIndex}.examples.${index}.vi`
                            )}
                        />
                    </div>
                    <button
                        type="button"
                        className="second-btn"
                        onClick={() => onDeleteExamples(field, gIndex)}
                    >
                        🗑 Xóa ví dụ
                    </button>
                </div>
            ))}
            <button
                type="button"
                className="bg-blue-100 text-blue-600 px-4 py-2 text-sm rounded-md w-fit hover:bg-blue-300 duration-150"
                onClick={() => append({ ja: '', vi: '' })}
            >
                <Add fontSize="small" /> Thêm ví dụ
            </button>
        </>
    )
}
export default ExamplesField
