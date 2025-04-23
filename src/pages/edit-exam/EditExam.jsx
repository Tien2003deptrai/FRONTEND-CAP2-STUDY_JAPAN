import UploadQuestionsFile from '@/components/edit-exam/UploadQuestionsFile'
import axiosInstance from '@/network/httpRequest'
import { Modal } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { ArrowBack } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function EditExam() {
    const { examId } = useParams()
    const navigate = useNavigate()
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [opened, { open, close }] = useDisclosure(false)

    const { data: examData, refetch } = useQuery({
        queryKey: ['exam data', examId],
        queryFn: async () => {
            const response = await axiosInstance.get(`exam/${examId}`)
            return response.data.data
        },
    })

    console.log(examData)

    const onSubmit = async () => {
        if (startTime > endTime) {
            toast.error(
                'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu'
            )
            return
        }
    }

    dayjs.locale('vi')

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
                        className="p-4 text-primary rounded-full shadow-sm"
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
                    <div key={questionGroup._id} className="mb-6">
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
                                    key={q.id}
                                    className="flex justify-between items-center gap-2 border border-gray-400 border-solid p-4 py-6 rounded-lg shadow mb-4"
                                >
                                    <div className="flex">
                                        <label className="font-bold text-primary">
                                            Câu hỏi {index + 1}:
                                        </label>
                                        <label className="ml-2">
                                            {q.content}
                                        </label>
                                    </div>
                                    <p className="italic text-green-600 font-bold">
                                        ({q.correctAnswer}.{' '}
                                        {
                                            q.options.find(
                                                (o) => o.id == q.correctAnswer
                                            )?.text
                                        }
                                        )
                                    </p>
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

            <Modal opened={opened} onClose={close} title="Cài đặt">
                <div className="flex flex-col gap-6">
                    <DateTimePicker
                        label="Thời gian bắt đầu:"
                        placeholder="Chọn ngày và giờ"
                        value={startTime}
                        onChange={setStartTime}
                        valueFormat="DD/MM/YYYY HH:mm"
                        minDate={new Date()}
                        amPm={false}
                        locale="vi"
                    />
                    <DateTimePicker
                        label="Thời gian kết thúc:"
                        placeholder="Chọn ngày và giờ"
                        value={endTime}
                        onChange={setEndTime}
                        valueFormat="DD/MM/YYYY HH:mm"
                        minDate={new Date()}
                        amPm={false}
                        locale="vi"
                    />
                    <div className="flex justify-end">
                        <button
                            className="primary-btn"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Lưu cài đặt
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditExam
