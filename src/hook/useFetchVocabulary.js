import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchVocabulary = (lesson_id) => {
    const getVocabulary = async () => {
        const res = await axiosInstance.get(`/vocabulary/lesson/${lesson_id}`)
        return res.data.data
    }

    return useQuery({
        queryKey: ['vocabulary', lesson_id],
        queryFn: getVocabulary,
        enabled: !!lesson_id,
        gcTime: 1000 * 60 * 5, // 5 mins
    })
}

export default useFetchVocabulary
