import UploadQuestionsFile from '@/components/edit-exam/UploadQuestionsFile'
import axiosInstance from '@/network/httpRequest'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    AlarmOffOutlined,
    AlarmOnOutlined,
    ArrowBack,
    HourglassBottomOutlined,
} from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'

const schema = z
    .object({
        startTime: z.string(),
        endTime: z.string(),
        time_limit: z.union([
            z.number().min(1, 'Thời gian làm bài phải lớn hơn 0 phút'),
            z.string().regex(/^\d+$/, 'Thời gian làm bài phải là số'),
        ]),

        level: z.string().nonempty('Vui lòng chọn cấp độ bài thi'),
    })
    .refine(
        (data) => {
            const start = new Date(data.startTime)
            const end = new Date(data.endTime)
            return start < end
        },
        {
            message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
            path: ['endTime'], // show the error under endTime field
        }
    )

function EditExam() {
    const { examId } = useParams()
    const navigate = useNavigate()
    const [opened, { open, close }] = useDisclosure(false)

    const { data: examData, refetch } = useQuery({
        queryKey: ['exam data', examId],
        queryFn: async () => {
            const response = await axiosInstance.get(`exam/${examId}`)
            return response.data.data
        },
    })

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            startTime: null,
            endTime: null,
            time_limit: '',
            level: '',
        },
    })

    useEffect(() => {
        if (examData) {
            reset({
                startTime: dayjs(examData.startTime).format('YYYY-MM-DDTHH:mm'),
                endTime: dayjs(examData.endTime).format('YYYY-MM-DDTHH:mm'),
                time_limit: examData.time_limit,
                level: examData.level,
            })
        }
    }, [examData, reset])

    const onSubmit = async (data) => {
        console.log(data)
        const res = await axiosInstance.put(`exam/${examId}/schedule`, data)
        if (res.status == 200) {
            refetch()
            toast.success('Cài đặt bài thi đã được lưu!')
            close()
        }
    }

    console.log(examData)

    return (
        <div className="w-full py-4">
            <ToastContainer
                hideProgressBar
                autoClose={3000}
                style={{ marginTop: '80px' }}
            />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        className="p-4 pl-0 text-primary rounded-full shadow-sm"
                        onClick={() => navigate(-1)}
                        title="Quay lại"
                    >
                        <ArrowBack />
                    </button>
                    <div>
                        <label className="font-bold text-2xl">
                            Tên thư mục:
                        </label>
                        <label className="font-bold text-primary text-2xl ml-2">
                            {examData?.title}
                        </label>
                    </div>
                </div>
                <button className="primary-btn" onClick={open}>
                    Cài đặt bài thi
                </button>
            </div>
            <div className="mt-6 w-full flex flex-col justify-center gap-2 items-start ">
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <AlarmOnOutlined fontSize="small" />
                    Bắt đầu:
                    <p className="tracking-wider font-semibold">
                        {dayjs(examData?.startTime).format('DD/MM/YYYY hh:mm')}
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <AlarmOffOutlined fontSize="small" />
                    Kết thúc:
                    <p className="tracking-wider font-semibold">
                        {dayjs(examData?.endTime).format('DD/MM/YYYY hh:mm')}
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <HourglassBottomOutlined fontSize="small" />
                    Thời gian làm bài:
                    <p className="tracking-wider font-semibold">
                        {examData?.time_limit} phút
                    </p>
                </div>
            </div>
            <hr className="my-4" />
            <div>
                <label className="font-bold text-lg">
                    Upload câu hỏi từ Microsoft Word (.doc, .docx):
                </label>
                <UploadQuestionsFile onSaveCallback={refetch} />
            </div>
            <hr className="my-4" />
            <div>
                <div className="flex justify-between items-center">
                    <label className="font-bold text-lg block ">
                        Danh sách câu hỏi:
                    </label>
                    <Link
                        className="primary-btn"
                        to={'questions'}
                        state={{ questions: examData?.questions }}
                    >
                        Chỉnh sửa câu hỏi
                    </Link>
                </div>
                <hr className="my-4" />

                {examData?.questions?.map((questionGroup, groupIndex) => (
                    <div key={groupIndex} className="mb-6">
                        <div className="mb-2 font-semibold text-primary">
                            Part {groupIndex + 1}.{' '}
                            {questionGroup.parentQuestion}
                        </div>
                        <p className="p-4 text-gray-600 text-lg italic">
                            {questionGroup.paragraph}
                        </p>
                        {questionGroup?.imgUrl && (
                            <div className="flex justify-center items-center my-6">
                                <img
                                    src={questionGroup.imgUrl}
                                    className="max-w-2/3 max-h-72"
                                />
                            </div>
                        )}
                        <div className="px-4">
                            {questionGroup.childQuestions.map((q, index) => (
                                <div
                                    key={index}
                                    className="flex justify-start gap-2 border border-gray-400 border-solid p-4 py-6 rounded-lg shadow mb-4"
                                >
                                    <label className="font-bold text-primary">
                                        Câu hỏi {index + 1}:
                                    </label>
                                    <div className="flex flex-col flex-1 gap-4">
                                        <label className="">{q.content}</label>
                                        <p className="italic text-green-600 font-bold">
                                            Đáp án:{' '}
                                            {
                                                q.options.find(
                                                    (o) =>
                                                        o.id == q.correctAnswer
                                                )?.text
                                            }
                                            ({q.correctAnswer})
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {examData?.questions?.length <= 0 && (
                <div className="text-gray-500 text-sm mt-2">
                    Không có câu hỏi nào trong danh sách.
                </div>
            )}

            <Modal
                opened={opened}
                onClose={close}
                title="Cài đặt"
                closeOnClickOutside={false}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div className="w-full flex gap-3 flex-col">
                        <label className="block font-bold">
                            Thời gian bắt đầu làm bài{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('startTime')}
                            min={new Date().toISOString().slice(0, 16)}
                            type="datetime-local"
                            className="border p-2 w-full rounded py-4 px-4"
                        />
                        {errors.startTime && (
                            <p className="text-red-500">
                                {errors.startTime?.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full flex gap-3 flex-col">
                        <label className="block font-bold">
                            Thời gian kết thúc làm bài{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('endTime')}
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            className="border p-2 w-full rounded py-4 px-4"
                        />
                        {errors.endTime && (
                            <p className="text-red-500">
                                {errors.endTime?.message}
                            </p>
                        )}
                    </div>
                    <TextInput
                        label="Thời gian làm bài (phút):"
                        placeholder="Nhập thời gian làm bài"
                        {...register('time_limit')}
                        type="number"
                        error={errors.examDuration?.message}
                    />
                    <Select
                        label="Cấp độ bài thi:"
                        placeholder="Chọn cấp độ"
                        value={watch('level')}
                        data={[
                            { value: 'N1', label: 'N1' },
                            { value: 'N2', label: 'N2' },
                            { value: 'N3', label: 'N3' },
                            { value: 'N4', label: 'N4' },
                            { value: 'N5', label: 'N5' },
                        ]}
                        {...register('level')}
                        error={errors.level?.message}
                    />
                    <div className="flex justify-end">
                        <button className="primary-btn" type="submit">
                            Lưu cài đặt
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditExam
