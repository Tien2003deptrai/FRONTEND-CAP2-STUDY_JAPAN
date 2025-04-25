import UploadQuestionsFile from '@/components/edit-exam/UploadQuestionsFile'
import axiosInstance from '@/network/httpRequest'
import { useDisclosure } from '@mantine/hooks'
import {
    AlarmOffOutlined,
    AlarmOnOutlined,
    AlignVerticalBottom,
    ArrowBack,
    BookOutlined,
    HourglassBottomTwoTone,
} from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import ExamModal from './modal/ExamModal'

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
            {examData?.description && (
                <p className="my-4 text-gray-500 italic tracking-wider">
                    {examData?.description}
                </p>
            )}
            <div className="mt-6 w-full flex flex-col justify-center gap-3 items-start ">
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <AlarmOnOutlined fontSize="small" />
                    Bắt đầu:
                    <p className="tracking-wider font-semibold">
                        {examData?.startTime
                            ? dayjs(examData.startTime).format(
                                  'DD/MM/YYYY hh:mm'
                              )
                            : 'Chưa có'}
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <AlarmOffOutlined fontSize="small" />
                    Kết thúc:
                    <p className="tracking-wider font-semibold">
                        {examData?.startTime
                            ? dayjs(examData.startTime).format(
                                  'DD/MM/YYYY hh:mm'
                              )
                            : 'Chưa có'}
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <HourglassBottomTwoTone fontSize="small" />
                    Thời gian làm bài:
                    <p className="tracking-wider font-semibold">
                        {examData?.time_limit} phút
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <BookOutlined fontSize="small" />
                    Khóa học:
                    <p className="tracking-wider font-semibold">
                        {examData?.course?.name}
                    </p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-500">
                    <AlignVerticalBottom fontSize="small" />
                    Level:
                    <p className="tracking-wider font-semibold">
                        {examData?.level}
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

            <ExamModal
                opened={opened}
                close={close}
                examData={examData && examData}
                onSubmitCallback={() => {
                    refetch()
                    toast.success('Cài đặt bài thi đã được lưu!')
                }}
            />
        </div>
    )
}

export default EditExam
