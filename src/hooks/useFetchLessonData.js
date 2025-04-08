import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchLessonData = (course_id) => {
    const getLessons = async () => {
        const res = await axiosInstance.get(`lesson/all/course/${course_id}`)
        if (res.data?.success) {
            const { lessons, course } = res.data.data
            return { lessons, course }
        }
        throw new Error('Không thể lấy danh sách bài học.')
    }

    return useQuery({
        queryKey: ['lessons', course_id],
        queryFn: getLessons,
        staleTime: 1000 * 60 * 5,
        retry: 3,
        enabled: !!course_id,
    })
}

export default useFetchLessonData
