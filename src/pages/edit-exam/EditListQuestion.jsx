import { saveQuestions } from '@/components/edit-exam/api/questionService'
import ChildQuestionsForm from '@/components/edit-exam/questionList/ChildQuestionsForm'
import { formSchema } from '@/components/edit-exam/questionList/schemaValidate'
import { uploadImage } from '@/util/firebase/firebaseUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Progress } from '@mantine/core'
import { Add, ArrowBack, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditListQuestion() {
    const { state } = useLocation()
    const { examId } = useParams()
    const navigate = useNavigate()
    const [imgUrls, setImgUrls] = useState({})
    const [audioUrl, setAudioUrl] = useState({})
    const [progress, setProgress] = useState()
    const [childQuestions, setChildQuestions] = useState([])

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

    const handleAudioChange = async (e, qIndex) => {
        const file = e.target.files[0]
        if (file) {
            const url = await uploadImage(file, (progress) => {
                setProgress(progress)
            })
            setValue(`questions.${qIndex}.audioUrl`, url, {
                shouldValidate: true,
                shouldDirty: true,
            })
            setAudioUrl((prev) => ({
                ...prev,
                [qIndex]: url,
            }))
            console.log('Audio URL:', url)
        }
    }

    const handleThumbnailChange = async (e, qIndex) => {
        const file = e.target.files[0]
        if (file) {
            const url = await uploadImage(file, () => {})
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
        const res = await saveQuestions(examId, [...data.questions])
        if (res.status === 200) {
            alert('Lưu câu hỏi thành công')
            navigate(-1)
        }
    }

    const watchedQuestions = useWatch({
        control,
        name: 'questions', // Watch the `questions` field
    })

    useEffect(() => {
        const allChildQuestions = watchedQuestions?.map(
            (question) => question.childQuestions || []
        )
        setChildQuestions(allChildQuestions)
        console.log(allChildQuestions)
    }, [watchedQuestions])

    return (
        <div className="w-full my-8">
            <div className="relative flex justify-end items-center">
                <div className="w-1/4 fixed left-4 top-24 bottom-10 px-6 py-8 border border-solid border-gray-300 rounded-2xl bg-white">
                    <div className="flex items-center gap-6">
                        <button
                            className="text-primary rounded-full shadow-sm"
                            onClick={() =>
                                navigate(`/manage-document/exam/edit/${examId}`)
                            }
                            title="Quay lại"
                            type="button"
                        >
                            <ArrowBack />
                        </button>
                        <h1 className="text-2xl font-bold">
                            Chỉnh sửa câu hỏi
                        </h1>
                    </div>
                    <hr className="my-4" />
                    <div className="overflow-auto h-[90%] pb-10">
                        {childQuestions?.map((q, qIndex) => (
                            <div key={`parent-${qIndex}`} className="mb-8">
                                <h2 className="font-bold rounded-md text-primary mb-4">
                                    <a
                                        href={`#q${qIndex}`}
                                        className="hover:underline duration-150"
                                    >
                                        Part {qIndex + 1}
                                    </a>
                                </h2>
                                <div className="flex items-center flex-wrap gap-6">
                                    {q?.map((c, cIndex) => (
                                        <a
                                            key={`child-${qIndex}-${cIndex}`}
                                            href={`#q${qIndex}_c${cIndex}`}
                                            className="w-8 h-8 text-primary rounded-full bg-red-100 flex items-center justify-center font-bold hover:bg-primary hover:text-white duration-150"
                                        >
                                            {cIndex + 1}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center gap-10 px-4 w-3/4"
                >
                    {questionFields.map((question, qIndex) => (
                        <div
                            key={question.id}
                            className="border border-gray-300 border-solid rounded-lg p-4 shadow-sm bg-white"
                            id={`q${qIndex}`}
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
                                            errors.questions[qIndex]
                                                .parentQuestion.message
                                        }
                                    </p>
                                )}

                                <textarea
                                    {...register(
                                        `questions.${qIndex}.paragraph`
                                    )}
                                    placeholder="Đoạn văn bản"
                                    className="border-gray-300 mt-1 h-24 border p-2 w-full rounded py-4 px-4"
                                />
                                {errors.questions?.[qIndex]?.paragraph && (
                                    <p className="text-red-500 text-sm">
                                        {
                                            errors.questions[qIndex].paragraph
                                                .message
                                        }
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
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100"
                                    />

                                    {errors.questions?.[qIndex]?.thumbnail && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.questions[qIndex]
                                                    .thumbnail.message
                                            }
                                        </p>
                                    )}
                                    {progress > 0 && progress < 100 && (
                                        <Progress value={progress} />
                                    )}
                                    {(question?.imgUrl || imgUrls[qIndex]) && (
                                        <img
                                            src={
                                                question.imgUrl ||
                                                imgUrls[qIndex]
                                            }
                                            alt={`Thumbnail Preview ${qIndex + 1}`}
                                            className="mt-4 w-80 object-cover rounded"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <label className="block font-bold text-gray-700 mb-2">
                                        Audio file
                                    </label>
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) =>
                                            handleAudioChange(e, qIndex)
                                        }
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100"
                                    />

                                    {errors.questions?.[qIndex]?.audioUrl && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.questions[qIndex]
                                                    .audioUrl.message
                                            }
                                        </p>
                                    )}
                                    {/* {progress > 0 && progress < 100 && (
                                        <Progress value={progress} />
                                    )} */}
                                    {(question.audioUrl ||
                                        audioUrl[qIndex]) && (
                                        <audio
                                            controls
                                            className="mt-4"
                                            src={
                                                question.audioUrl ||
                                                audioUrl[qIndex]
                                            }
                                        >
                                            Your browser does not support the
                                            audio element.
                                        </audio>
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
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                appendQuestion(defaultSingleQuestion)
                            }
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
                    {errors.questions?.message &&
                        !Array.isArray(errors.questions) && (
                            <p className="text-red-600 text-center font-semibold mt-2">
                                {errors.questions.message}
                            </p>
                        )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className=" bg-green-600 px-4 py-3 text-white rounded-md hover:bg-green-700 duration-150"
                        >
                            Lưu bài thi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditListQuestion
