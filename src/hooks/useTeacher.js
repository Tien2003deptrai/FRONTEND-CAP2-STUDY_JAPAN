import axiosInstance from "@/network/httpRequest"
import { useQuery } from "@tanstack/react-query"

const useTeachers = () => {
    const getTeachers = async () => {
        const response = await axiosInstance.get('/admin/teachers')
        return response.data.data
    }
    return useQuery({
        queryKey: ['teachers'],
        queryFn: getTeachers,
    })
}
export default useTeachers