import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchLessonData = (course_id) => {
    const getLessons = async () => {
        const res = await axiosInstance.get(`lesson/all/course/${course_id}`)
        return res.data
    }

    return useQuery({
        queryKey: ['lessons'],
        queryFn: getLessons,
        retry: 3,
    })
}

export default useFetchLessonData
