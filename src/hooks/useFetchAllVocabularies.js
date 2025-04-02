import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchAllVocabularies = () => {
    const getVocabulary = async () => {
        const res = await axiosInstance.get(`/vocabulary/all`)
        return res.data.data
    }

    return useQuery({
        queryKey: ['vocabulary-all'],
        queryFn: getVocabulary,
        gcTime: 1000 * 60 * 5, // 5 mins
    })
}

export default useFetchAllVocabularies
