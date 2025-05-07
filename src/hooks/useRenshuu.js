import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

export const useRenshuu = (lessonId) => {
    return useQuery({
        queryKey: ['renshuu', lessonId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/renshuu/${lessonId}`)
            return res.data.data
        },
        enabled: !!lessonId,
    })
}
