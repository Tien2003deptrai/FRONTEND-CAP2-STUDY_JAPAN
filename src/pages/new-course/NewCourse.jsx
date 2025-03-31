import ImageUpload from '@/components/image-upload/ImageUpload'
import useFetchLessonList from '@/hooks/useFetchLessonList'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

// Schema Validation
const courseSchema = z.object({
    name: z.string().min(3, 'Tên khóa học phải có ít nhất 3 ký tự'),
    description: z.string().min(10, 'Mô tả khóa học phải có ít nhất 10 ký tự'),
    lessons: z
        .array(
            z.object({
                lesson_id: z.string(),
                lesson_title: z
                    .string()
                    .min(3, 'Tên bài học phải có ít nhất 3 ký tự'),
                index: z.number(),
            })
        )
        .min(1, 'Phải có ít nhất một bài học'),
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

    const { data: lessonList } = useFetchLessonList(courseId)

    useEffect(() => {
        if (isEditMode && lessonList) {
            setValue('name', lessonList.data.course.name)
            setValue('description', lessonList.data.course.description)
            setValue('lessons', lessonList.data.lessons)
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
                queryKey: ['getCourseLecturer', user._id],
            })
            navigate('/teacher')
        } catch (error) {
            setApiError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="p-10 w-full">
            <h1 className="text-2xl font-bold mb-5">
                {isEditMode ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
            </h1>
            <hr className="w-full my-5" />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8">
                <div className="w-full flex gap-3 flex-col">
                    <label className="block font-bold">
                        Tên khóa học <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('name')}
                        className="border p-2 w-full rounded py-4 px-4"
                        placeholder="Nhập tên khóa học"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div className="w-full flex gap-3 flex-col mt-4">
                    <label className="block font-bold">
                        Mô tả khóa học <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register('description')}
                        className="border p-2 w-full rounded py-4 px-4"
                        placeholder="Nhập mô tả khóa học"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="w-full flex gap-3 flex-col mt-4">
                    <label className="block font-bold">Hình ảnh khóa học</label>
                    <ImageUpload
                        thumb={thumbnail}
                        onImageUpload={setThumbnail}
                    />
                </div>

                <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold text-primary">
                        Danh sách bài học
                    </h2>
                    <hr className="w-full my-5" />

                    {fields.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            className="border p-3 rounded mb-3"
                        >
                            <div className="w-full flex gap-3 flex-col">
                                <label className="block font-bold">
                                    Tên bài học{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register(
                                        `lessons.${index}.lesson_title`
                                    )}
                                    className="border p-2 w-full rounded py-4 px-4"
                                    placeholder="Nhập tên bài học"
                                />
                                {errors.lessons?.[index]?.lesson_title && (
                                    <p className="text-red-500">
                                        {
                                            errors.lessons[index].lesson_title
                                                ?.message
                                        }
                                    </p>
                                )}
                            </div>
                            <input
                                type="hidden"
                                {...register(`lessons.${index}.index`)}
                                value={index}
                            />

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-blue-100 rounded text-sm px-4 py-2 mt-2 text-blue-700 hover:bg-blue-300 duration-150"
                            >
                                Xóa bài học
                            </button>
                        </div>
                    ))}

                    {errors.lessons && (
                        <p className="text-red-500">{errors.lessons.message}</p>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            append({
                                lesson_id: uuidv4(),
                                lesson_title: '',
                                index: fields.length,
                            })
                        }
                        className="mt-3 second-btn"
                    >
                        Thêm bài học
                    </button>
                </div>

                <hr className="w-full my-5" />

                {apiError && (
                    <p className="text-red-500 text-center">{apiError}</p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="primary-btn"
                >
                    {submitting
                        ? 'Đang lưu...'
                        : isEditMode
                          ? 'Lưu chỉnh sửa'
                          : 'Tạo khóa học'}
                </button>
            </form>
        </div>
    )
}

export default NewCourse
