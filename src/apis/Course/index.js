import axiosInstance from '@/network/httpRequest'

export const getAllCourse = async (userId) => {
    try {
        const response = await axiosInstance.get(`/course/all`, {
            params: { userId },
        })
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
