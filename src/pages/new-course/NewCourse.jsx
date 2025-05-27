// NewCourse.jsx
import ImageUpload from '@/components/image-upload/ImageUpload'
import useFetchLessonData from '@/hooks/useFetchLessonData'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const courseSchema = z.object({
    name: z.string().min(3, 'Tên khóa học phải có ít nhất 3 ký tự'),
    description: z.string().min(10, 'Mô tả khóa học phải có ít nhất 10 ký tự'),
    lessons: z.array(
        z.object({
            lesson_id: z.string(),
            lesson_title: z
                .string()
                .min(3, 'Tên bài học phải có ít nhất 3 ký tự'),
            index: z.number(),
        })
    ),
    // .min(1, 'Phải có ít nhất một bài học'),
})

function NewCourse({ isEditMode }) {
    const queryClient = useQueryClient()
    const { user } = useAuthStore()
    const [submitting, setSubmitting] = useState(false)
    const [apiError, setApiError] = useState(null)
    const navigate = useNavigate()
    const [thumbnail, setThumbnail] = useState()
    const { courseId } = useParams()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: '',
            description: '',
            lessons: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'lessons',
    })

    const { data: lessonList } = useFetchLessonData(courseId)

    useEffect(() => {
        if (isEditMode && lessonList) {
            setValue('name', lessonList.data.course.name)
            setValue('description', lessonList.data.course.description)
            setValue(
                'lessons',
                lessonList.data.lessons.sort((a, b) => a.index - b.index)
            )
            setThumbnail(lessonList.data.course?.thumb || null)
        }
    }, [isEditMode, lessonList, setValue])

    const onSubmit = async (data) => {
        setSubmitting(true)
        setApiError(null)
        data.thumb = thumbnail

        try {
            const response = isEditMode
                ? await axiosInstance.put(`/course/${courseId}`, data)
                : await axiosInstance.post('/course', data)

            if (!response.status == 200) {
                throw new Error(
                    isEditMode
                        ? 'Không thể lưu chỉnh sửa. Vui lòng thử lại!'
                        : 'Không thể tạo khóa học. Vui lòng thử lại!'
                )
            }

            alert(
                isEditMode
                    ? 'Khóa học đã được cập nhật thành công!'
                    : 'Khóa học đã được tạo thành công!'
            )
            queryClient.invalidateQueries({
                queryKey: ['getCourseLecturer', user?._id],
            })
            navigate(-1)
        } catch (error) {
            setApiError(
                error.response?.data?.message ||
                    error.message ||
                    'Đã xảy ra lỗi khi lưu khóa học. Vui lòng thử lại!'
            )
        } finally {
            setSubmitting(false)
        }
    }

    console.log(errors)

    return (
        <div className="p-10 w-full px-4 flex justify-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        {isEditMode ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Nhập tên, mô tả và thêm bài học cho khóa học mới của
                        bạn.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên khóa học
                                </label>
                                <input
                                    {...register('name')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên khóa học"
                                    readOnly={user?.role !== 'admin'}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả khóa học
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả khóa học..."
                                    readOnly={user?.role !== 'admin'}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <ImageUpload
                                thumb={thumbnail}
                                onImageUpload={setThumbnail}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Danh sách bài học
                        </h2>
                        <div className="space-y-4">
                            {fields.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Tên bài học {index + 1}
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            {...register(
                                                `lessons.${index}.lesson_title`
                                            )}
                                            placeholder="Nhập tên bài học"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            ✕
                                        </button>
                                        <input
                                            type="hidden"
                                            {...register(
                                                `lessons.${index}.index`
                                            )}
                                            value={index}
                                        />
                                    </div>
                                    {errors?.lessons?.[index]?.lesson_title
                                        ?.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.lessons[index]
                                                    .lesson_title.message
                                            }
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                    append({
                                        lesson_id: uuidv4(),
                                        lesson_title: '',
                                        index: fields.length + 1,
                                    })
                                }
                                className="text-blue-700 hover:underline text-sm mt-2"
                            >
                                + Thêm bài học
                            </button>
                        </div>
                    </div>

                    {apiError && (
                        <p className="text-red-500 text-center">{apiError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-md hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M17.707 5.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" />
                        </svg>
                        {submitting
                            ? 'Đang lưu...'
                            : isEditMode
                              ? 'Lưu chỉnh sửa'
                              : 'Lưu khóa học'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewCourse
