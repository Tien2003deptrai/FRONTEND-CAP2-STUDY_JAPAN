import ExamplesField from '@/components/edit-course/grammar/ExamplesField'
import useFetchGrammar from '@/hook/useFetchGrammar'
import axiosInstance from '@/network/httpRequest'
import { Add, ArrowBack } from '@mui/icons-material'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function EditGrammar() {
    const navigate = useNavigate()
    const { lessonId } = useParams()

    const { control, handleSubmit, register, setValue } = useForm({
        defaultValues: {
            grammars: [
                {
                    _id: '',
                    title: '',
                    structure: '',
                    explain: '',
                    level: '',
                    mean: '',
                    examples: [
                        {
                            _id: '',
                            ja: '',
                            vi: '',
                        },
                    ],
                },
            ],
        },
    })

    const {
        fields: grammarFields,
        append: appendGrammar,
        remove: removeGrammar,
    } = useFieldArray({
        control,
        name: 'grammars',
    })

    const { data: grammars, refetch } = useFetchGrammar(lessonId)

    useEffect(() => {
        if (grammars?.length > 0) {
            setValue('grammars', grammars)
        }
    }, [grammars, setValue])

    const onSubmit = async (data) => {
        const payload = {}
        payload.lesson_id = lessonId
        payload.grammars = data.grammars.map((grammar) => {
            return {
                grammar_id: grammar._id || null,
                ...grammar,
            }
        })
        console.log(payload)

        try {
            const res = await axiosInstance.put(
                `/grammar/lesson/${lessonId}/batch`,
                payload
            )
            if (res.status === 200) {
                toast.success('Cập nhật ngữ pháp thành công!')
            }
        } catch (error) {
            console.error('Failed to update grammar:', error)
            alert('Cập nhật thất bại! Vui lòng thử lại.')
        }
    }

    const onDeleteGrammar = async (field, index) => {
        if (!field?._id) {
            removeGrammar(index)
        } else {
            const res = await axiosInstance.delete(
                `/grammar/${lessonId}/${field._id}`
            )
            if (res.status === 200) {
                toast.success('Đã xóa ngữ pháp')
                refetch()
            }
        }
    }

    return (
        <div className="w-full mx-auto p-4">
            <ToastContainer
                hideProgressBar
                autoClose={3000}
                style={{ marginTop: '80px' }}
            />
            <div className="flex justify-between items-center mb-3 gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full border border-gray-200 shadow-xl p-3 hover:text-primary duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <label className="block w-full font-bold">
                    Chỉnh sửa ngữ pháp
                </label>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mt-8 gap-8"
            >
                {grammarFields.map((grammar, gIndex) => (
                    <div
                        key={grammar.id}
                        className="flex flex-col gap-4 border border-solid border-gray-400 p-4 rounded-lg shadow "
                    >
                        <input
                            required
                            className="border p-2 rounded w-full"
                            placeholder="Tên ngữ pháp"
                            {...register(`grammars.${gIndex}.title`)}
                        />
                        <input
                            required
                            className="border p-2 rounded w-full"
                            placeholder="Cấu trúc"
                            {...register(`grammars.${gIndex}.structure`)}
                        />
                        <textarea
                            required
                            className="border p-2 rounded w-full"
                            placeholder="Giải thích"
                            {...register(`grammars.${gIndex}.explain`)}
                        />
                        <input
                            required
                            className="border p-2 rounded w-full"
                            placeholder="Ý nghĩa"
                            {...register(`grammars.${gIndex}.mean`)}
                        />
                        <select
                            className="border p-2 rounded w-full"
                            {...register(`grammars.${gIndex}.level`)}
                        >
                            <option value="N5">N5</option>
                            <option value="N4">N4</option>
                            <option value="N3">N3</option>
                            <option value="N2">N2</option>
                            <option value="N1">N1</option>
                        </select>

                        {/* Ví dụ cho từng grammar */}
                        <label className="font-bold">Ví dụ:</label>
                        <ExamplesField
                            control={control}
                            register={register}
                            gIndex={gIndex}
                            grammar={grammar}
                            refetch={refetch}
                        />

                        <button
                            type="button"
                            className="second-btn w-fit"
                            onClick={() => onDeleteGrammar(grammar, gIndex)}
                        >
                            🗑 Xóa ngữ pháp
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="text-blue-600 hover:underline underline-offset-2 duration-150 w-fit"
                    onClick={() =>
                        appendGrammar({
                            title: '',
                            structure: '',
                            explain: '',
                            mean: '',
                            level: 'N5',
                            examples: [{ ja: '', vi: '' }],
                        })
                    }
                >
                    <Add /> Thêm ngữ pháp
                </button>

                <hr />
                <button type="submit" className="primary-btn">
                    Lưu
                </button>
            </form>
        </div>
    )
}

export default EditGrammar
