import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../network/httpRequest'

const COURSE_KEYS = {
    all: ['courses'],
    list: () => [...COURSE_KEYS.all, 'list'],
    detail: (id) => [...COURSE_KEYS.all, 'detail', id],
}

const courseApi = {
    getAllCourses: async (userId) => {
        try {
            const response = await axiosInstance.get('/course/all', {
                params: { userId },
            })
            return response.data.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getCourseById: async (courseId) => {
        const response = await axiosInstance.get(`/course/${courseId}`)
        console.log('getCourseById response:', response.data.data)

        return response.data.data
    },

    updateCourseStatus: async (courseId, status) => {
        const response = await axiosInstance.patch(
            `/course/${courseId}/status`,
            { status }
        )
        return response.data
    },
}

export const useCourses = (userId) => {
    return useQuery({
        queryKey: COURSE_KEYS.list(),
        queryFn: () => courseApi.getAllCourses(userId),
        enabled: !!userId,
    })
}

export const useCourseById = (courseId) => {
    return useQuery({
        queryKey: COURSE_KEYS.detail(courseId),
        queryFn: () => courseApi.getCourseById(courseId),
        enabled: !!courseId,
    })
}

export { courseApi }
