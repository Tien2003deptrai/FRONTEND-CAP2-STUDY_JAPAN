import useFetchVocabulary from '@/hook/useFetchVocabulary'
import axiosInstance from '@/network/httpRequest'
import { uploadImage } from '@/util/firebase/firebaseUtils'
import { Add, ArrowBack } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function EditVocabulary() {
    const navigate = useNavigate()
    const { lessonId } = useParams()
    const { control, handleSubmit, register, setValue, watch } = useForm({
        defaultValues: {
            words: [
                {
                    _id: '',
                    word: '',
                    kanji: '',
                    kana: '',
                    meaning: '',
                    audio: '',
                    example: '',
                    notes: '',
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'words',
    })

    const [uploadProgress, setUploadProgress] = useState()

    const handleFileUpload = async (file, index) => {
        if (!file) return

        try {
            const audioUrl = await uploadImage(file, (progress) => {
                setUploadProgress(progress)
            })

            setValue(`words.${index}.audio`, audioUrl)
        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    const onSubmit = async (data) => {
        console.log('Submitted Words:', data.words)

        const payload = {
            lesson_id: lessonId,
            vocabularies: data.words.map((word) => ({
                vocab_id: word.vocab_id || null,
                word: word.word,
                kanji: word.kanji,
                kana: word.kana,
                meaning: word.meaning,
                audio: word.audio || '',
                example: word.example || '',
                notes: word.notes || '',
            })),
        }

        try {
            const res = await axiosInstance.put(
                `vocabulary/lesson/${lessonId}/batch`,
                payload
            )

            if (res.status === 200) {
                toast.success('Đã cập nhật từ vựng thành công!')
                navigate(-1)
            }
        } catch (error) {
            console.error('Failed to update vocabulary:', error)
            alert('Cập nhật thất bại! Vui lòng thử lại.')
        }
    }

    const { data: vocabularies, refetch } = useFetchVocabulary(lessonId)

    useEffect(() => {
        if (vocabularies?.length > 0) {
            setValue('words', vocabularies)
        }
    }, [vocabularies, setValue])

    const onDeleteVocab = async (field, index) => {
        console.log(field, index)
        if (!field?._id) {
            remove(index)
        } else {
            const res = await axiosInstance.delete(`/vocabulary/${field._id}`)
            toast.success('Đã xóa từ vựng')
            console.log('Deleted:', res.data)
            refetch()
        }
    }

    return (
        <div className="w-full mx-auto p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-3 gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full border border-solid border-gray-200 shadow-xl p-3 hover:text-primary duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <label className="block w-full font-bold">
                    Danh sách từ vựng
                </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field, index) => {
                    const audioUrl = watch(`words.${index}.audio`)

                    return (
                        <div
                            key={field.id}
                            className="grid grid-cols-2 gap-3 p-4 border rounded-lg shadow"
                        >
                            <input
                                required
                                className="border p-2 rounded"
                                placeholder="Phiên âm"
                                {...register(`words.${index}.word`)}
                            />
                            <input
                                required
                                className="border p-2 rounded"
                                placeholder="Kanji"
                                {...register(`words.${index}.kanji`)}
                            />
                            <input
                                required
                                className="border p-2 rounded"
                                placeholder="Kana"
                                {...register(`words.${index}.kana`)}
                            />
                            <input
                                required
                                className="border p-2 rounded"
                                placeholder="Ý nghĩa"
                                {...register(`words.${index}.meaning`)}
                            />

                            <input
                                className="border p-2 rounded w-full col-span-2"
                                placeholder="Ví dụ"
                                {...register(`words.${index}.example`)}
                            />
                            <input
                                className="border p-2 rounded col-span-2 w-full"
                                placeholder="Ghi chú"
                                {...register(`words.${index}.notes`)}
                            />
                            {/* Upload file âm thanh */}
                            <div className="col-span-2">
                                <input
                                    id="audio"
                                    type="file"
                                    accept="audio/mp3"
                                    className="border p-2 rounded w-full  hidden"
                                    onChange={(e) =>
                                        handleFileUpload(
                                            e.target.files[0],
                                            index
                                        )
                                    }
                                />
                                <label htmlFor="audio" className="second-btn">
                                    Select audio file
                                </label>

                                {/* Hiển thị tiến trình upload */}
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="w-full bg-gray-200 rounded mt-2">
                                        <div
                                            className="bg-blue-500 text-xs text-white text-center p-1 rounded"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        >
                                            {uploadProgress}%
                                        </div>
                                    </div>
                                )}

                                {/* Hiển thị âm thanh khi upload xong */}
                                {audioUrl && (
                                    <div className="mt-2 w-full flex items-center gap-2">
                                        <audio controls className="flex-1">
                                            <source
                                                src={audioUrl}
                                                type="audio/mp3"
                                            />
                                            Trình duyệt của bạn không hỗ trợ
                                            phát âm thanh.
                                        </audio>
                                        <button
                                            type="button"
                                            className="bg-red-100 text-red-600 text-sm py-1 px-3 rounded hover:bg-red-300 duration-150"
                                            onClick={() =>
                                                setValue(
                                                    `words.${index}.audio`,
                                                    ''
                                                )
                                            }
                                        >
                                            Xóa âm thanh
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                className="bg-blue-200 text-blue-600 text-sm py-2 px-4 rounded hover:bg-blue-300 duration-150 w-fit"
                                onClick={() => onDeleteVocab(field, index)}
                            >
                                🗑 Xóa từ vựng
                            </button>
                        </div>
                    )
                })}
                <button
                    type="button"
                    className="second-btn flex justify-center items-center gap-2"
                    onClick={() =>
                        append({
                            word: '',
                            kanji: '',
                            kana: '',
                            meaning: '',
                            audio: '',
                            example: '',
                            notes: '',
                        })
                    }
                >
                    <Add />
                    Thêm từ vựng mới
                </button>
                <hr />
                <button type="submit" className="primary-btn">
                    Lưu
                </button>
            </form>
        </div>
    )
}

export default EditVocabulary
