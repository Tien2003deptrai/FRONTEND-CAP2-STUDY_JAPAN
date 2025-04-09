import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'

export const useTeachers = () => {
    const getTeachers = async () => {
        const response = await axiosInstance.get('/admin/teachers')
        return response.data.data
    }
    return useQuery({
        queryKey: ['teachers'],
        queryFn: getTeachers,
    })
}
export const useTeacherById = (teacherId) => {
    return useQuery({
        queryKey: ['teacher', teacherId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/admin/teachers/${teacherId}`)
            return res.data.data
        },
        enabled: !!teacherId,
    })
}

export const useTeacherCourses = (teacherId) => {
    return useQuery({
        queryKey: ['teacher-courses', teacherId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/course/teacher/${teacherId}`)
            return res.data.data
        },
        enabled: !!teacherId,
    })
}
