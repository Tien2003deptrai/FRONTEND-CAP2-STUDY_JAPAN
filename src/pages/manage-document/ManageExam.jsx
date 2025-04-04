import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add, ArrowForward, Delete, Edit } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const examFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Tiêu đề không được để trống')
        .max(100, 'Tiêu đề không được quá 100 ký tự'),
    description: z
        .string()
        .min(1, 'Mô tả không được để trống')
        .max(500, 'Mô tả không được quá 500 ký tự'),
    time_limit: z.coerce
        .number()
        .min(1, 'Thời gian phải lớn hơn 0')
        .max(180, 'Thời gian không được quá 180 phút'),
    level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1'], {
        required_error: 'Cấp độ không được để trống',
    }),
})

function ManageExam() {
    const { user } = useAuthStore()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedExam, setSelectedExam] = useState(null)

    // Initialize React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(examFormSchema),
        defaultValues: {
            title: '',
            description: '',
            time_limit: '',
        },
    })

    const handleOpenDialog = (exam = null) => {
        if (exam) {
            setSelectedExam(exam)
            reset({
                title: exam.title,
                description: exam.description,
                time_limit: exam.time_limit,
            })
        } else {
            setSelectedExam(null)
            reset({
                title: '',
                description: '',
                time_limit: '',
            })
        }
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setSelectedExam(null)
        reset()
    }

    const onSubmit = async (data) => {
        console.log(data)

        try {
            if (selectedExam) {
                await axiosInstance.put(`exam/${selectedExam._id}`, data)
            } else {
                await axiosInstance.post('exam', data)
            }
            refetch()
            handleCloseDialog()
        } catch (error) {
            console.error('Error submitting exam:', error)
        }
    }

    const { data: exams, refetch } = useQuery({
        queryKey: ['exams teacher', user?._id],
        queryFn: async () => {
            const res = await axiosInstance.get(`exam/teacher/${user?._id}`)
            return res.data.data
        },
        gcTime: 1000 * 60 * 5, // 5 minutes
    })

    const onDelete = async (examId) => {
        try {
            await axiosInstance.delete(`exam/${examId}`)
            refetch()
        } catch (error) {
            console.error('Error deleting exam:', error)
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Quản lý bài thi
                </h1>
                <button
                    onClick={() => handleOpenDialog()}
                    className="flex items-center second-btn"
                >
                    <Add />
                    Tạo bài thi mới
                </button>
            </div>

            <hr className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams?.map((exam) => (
                    <div
                        key={exam._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {exam.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {exam.description}
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                                <p>Thời gian: {exam.time_limit} phút</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-between space-x-2">
                            <div>
                                <button
                                    onClick={() => handleOpenDialog(exam)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                    title="Chỉnh sửa thư mục"
                                >
                                    <Edit />
                                </button>
                                <button
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Xóa"
                                    onClick={() => onDelete(exam._id)}
                                >
                                    <Delete />
                                </button>
                            </div>
                            <Link
                                to={`edit/${exam._id}`}
                                className="primary-btn flex items-center gap-2"
                                title="Xem chi tiết"
                            >
                                Xem chi tiết
                                <ArrowForward fontSize="small" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog */}
            {openDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {selectedExam
                                        ? 'Chỉnh sửa thư mục bài thi'
                                        : 'Tạo bài thi mới'}
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tiêu đề
                                        </label>
                                        <input
                                            {...register('title')}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                                errors.title
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả
                                        </label>
                                        <textarea
                                            {...register('description')}
                                            rows={3}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                                errors.description
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.description.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Thời gian (phút)
                                        </label>
                                        <input
                                            type="number"
                                            {...register('time_limit')}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                                errors.time_limit
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                        />
                                        {errors.time_limit && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.time_limit.message}
                                            </p>
                                        )}
                                    </div>
                                    <select
                                        className="border p-2 rounded w-full"
                                        {...register('level')}
                                    >
                                        <option value="N5">N5</option>
                                        <option value="N4">N4</option>
                                        <option value="N3">N3</option>
                                        <option value="N2">N2</option>
                                        <option value="N1">N1</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseDialog}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {selectedExam ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageExam
