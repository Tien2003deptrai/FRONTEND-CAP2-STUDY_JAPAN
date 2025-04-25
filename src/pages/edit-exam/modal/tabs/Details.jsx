import useFetchTeacherCourses from '@/hooks/useFetchTeacherCourses'
import { Select } from '@mantine/core'
import { useFormContext } from 'react-hook-form'

function Details() {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext()
    const { data: coursesData } = useFetchTeacherCourses()

    return (
        <div className="flex flex-col gap-4 px-16 h-[380px] overflow-auto">
            <div className="w-full flex gap-3 flex-col">
                <label className="block font-bold">
                    Tên bài thi <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('title')}
                    type="text"
                    className="border p-2 w-full rounded py-4 px-4"
                />
                {errors?.title && (
                    <p className="text-red-500">{errors.title?.message}</p>
                )}
            </div>
            <div className="w-full flex gap-3 flex-col">
                <label className="block font-bold">
                    Mô tả <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('description')}
                    type="text"
                    className="border p-2 w-full rounded py-4 px-4"
                />
                {errors.description && (
                    <p className="text-red-500">
                        {errors.description?.message}
                    </p>
                )}
            </div>

            <Select
                label="Khóa học:"
                placeholder="Chọn khóa học"
                value={watch('courseId')}
                data={
                    coursesData?.data?.map((course) => ({
                        value: course._id,
                        label: course.name,
                    })) || []
                }
                {...register('courseId')}
                error={errors.courseId?.message}
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
        </div>
    )
}

export default Details
