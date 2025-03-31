import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchGrammar = (lesson_id) => {
    const getGramma = async () => {
        const res = await axiosInstance.get(`/grammar/lesson/${lesson_id}`)
        return res.data.data
    }

    return useQuery({
        queryKey: ['grammar', lesson_id],
        queryFn: getGramma,
        enabled: !!lesson_id,
        gcTime: 1000 * 60 * 5, // 5 mins
    })
}

export default useFetchGrammar
