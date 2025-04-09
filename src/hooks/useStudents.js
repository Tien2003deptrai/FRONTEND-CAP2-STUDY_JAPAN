import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../network/httpRequest'

const STUDENT_KEYS = {
    all: ['students'],
    list: () => [...STUDENT_KEYS.all, 'list'],
    detail: (id) => [...STUDENT_KEYS.all, 'detail', id],
}

const studentApi = {
    getAllStudents: async () => {
        const response = await axiosInstance.get('/admin/students')
        return response.data.data
    },

    getStudentById: async (studentId) => {
        const response = await axiosInstance.get(`/admin/students/${studentId}`)
        return response.data
    },

    updateStudentStatus: async (studentId, status) => {
        const response = await axiosInstance.patch(
            `/admin/students/${studentId}/status`,
            { status }
        )
        return response.data
    },
}

export const useStudents = () => {
    return useQuery({
        queryKey: STUDENT_KEYS.list(),
        queryFn: studentApi.getAllStudents,
    })
}

export const useStudentById = (studentId) => {
    return useQuery({
        queryKey: STUDENT_KEYS.detail(studentId),
        queryFn: () => studentApi.getStudentById(studentId),
        enabled: !!studentId,
    })
}

export { studentApi }
