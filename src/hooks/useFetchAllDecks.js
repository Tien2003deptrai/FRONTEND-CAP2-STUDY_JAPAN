import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

const useFetchAllDecks = () => {
    return useQuery({
        queryKey: ['decks'],
        queryFn: async () => {
            const response = await axiosInstance.get('/deck/all')
            return response.data.data
        },
    })
}
export default useFetchAllDecks
