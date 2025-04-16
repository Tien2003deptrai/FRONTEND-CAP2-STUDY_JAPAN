import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchHina = (courseId, lessonId) => {
    const fetchHina = async () => {
        const res = await axiosInstance.get(`/hina/${courseId}/${lessonId}`)
        return res.data.data
    }
    console.log('useFetchHina', courseId, lessonId)

    return useQuery({
        queryKey: ['hina', courseId, lessonId],
        queryFn: fetchHina,
        enabled: !!courseId && !!lessonId,
        staleTime: 5 * 60 * 1000,
    })
}

export default useFetchHina
