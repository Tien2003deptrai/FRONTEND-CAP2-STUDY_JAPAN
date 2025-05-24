import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../network/httpRequest'

/* -------------------- Query Keys -------------------- */
const DASHBOARD_KEYS = {
    all: ['admin-dashboard'],
    summary: () => [...DASHBOARD_KEYS.all, 'summary'],
}

const STUDENT_KEYS = {
    all: ['student-courses'],
    courses: (studentId) => [...STUDENT_KEYS.all, studentId],
}

/* -------------------- API Calls -------------------- */
const fetchDashboardSummary = async () => {
    const { data } = await axiosInstance.get('/admin/dashboard')
    return data.data
}

const fetchStudentCourses = async (studentId) => {
    const { data } = await axiosInstance.get(
        `/admin/students/${studentId}/courses`
    )
    return data.data
}

/* -------------------- React Query Hooks -------------------- */
export const useAdminDashboard = () =>
    useQuery({
        queryKey: DASHBOARD_KEYS.summary(),
        queryFn: fetchDashboardSummary,
        staleTime: 5 * 60 * 1000, // 5 phút
    })

export const useStudentCourses = (studentId) =>
    useQuery({
        queryKey: STUDENT_KEYS.courses(studentId),
        queryFn: () => fetchStudentCourses(studentId),
        enabled: !!studentId,
    })

/* -------------------- Export Keys (optional) -------------------- */

export const useRecentStudents = () =>
    useQuery({
        queryKey: ['recentStudents'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin/recent-students')
            return res.data.data
        },
        staleTime: 5 * 60 * 1000, // cache 5 phút
    })

export { DASHBOARD_KEYS, STUDENT_KEYS }
