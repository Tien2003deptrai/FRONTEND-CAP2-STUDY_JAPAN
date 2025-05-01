import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from '@/network/httpRequest'

const EXAM_KEYS = {
    all: ['exams'],
    list: () => [...EXAM_KEYS.all, 'list'],
    detail: (examId) => [...EXAM_KEYS.all, 'detail', examId],
    take: (examId) => [...EXAM_KEYS.all, 'take', examId],
    result: (attemptId) => [...EXAM_KEYS.all, 'result', attemptId],
    history: (examId) => [...EXAM_KEYS.all, 'history', examId],
}

const examApi = {
    getExamList: async () => {
        const res = await axiosInstance.get('/exam/enrolled')
        return res.data.data
    },

    getExamById: async (examId) => {
        const res = await axiosInstance.get(`/exam/${examId}`)
        return res.data.data
    },

    getExamTake: async (examId) => {
        const res = await axiosInstance.get(`/exam/take/${examId}`)
        return res.data.data
    },

    startExam: async (examId) => {
        if (!examId) throw new Error('Exam ID is required')
        const res = await axiosInstance.post(`/exam/start/${examId}`)
        return res.data.data // trả về attemptId
    },

    submitExam: async ({ attemptId, answers }) => {
        const res = await axiosInstance.post(`/exam/submit/${attemptId}`, {
            answers,
        })
        return res.data.data
    },

    getExamResult: async (attemptId) => {
        const res = await axiosInstance.get(`/exam/result/${attemptId}`)
        return res.data.data
    },

    getExamHistory: async (examId) => {
        const res = await axiosInstance.get(`/exam/history?examId=${examId}`)
        return res.data.data.results || []
    },
}

export const useExamList = () =>
    useQuery({ queryKey: EXAM_KEYS.list(), queryFn: examApi.getExamList })

export const useExamById = (examId) =>
    useQuery({
        queryKey: EXAM_KEYS.detail(examId),
        queryFn: () => examApi.getExamById(examId),
        enabled: !!examId,
    })

export const useExamTake = (examId) =>
    useQuery({
        queryKey: EXAM_KEYS.take(examId),
        queryFn: () => examApi.getExamTake(examId),
        enabled: !!examId,
    })

export const useStartExam = () =>
    useMutation({
        mutationFn: examApi.startExam,
        onError: (error) => {
            console.error('Start exam error:', error.message)
        },
    })

export const useSubmitExam = () =>
    useMutation({
        mutationFn: examApi.submitExam,
        onError: (error) => {
            console.error('Submit exam error:', error.message)
        },
    })

export const useExamResult = (attemptId) =>
    useQuery({
        queryKey: EXAM_KEYS.result(attemptId),
        queryFn: () => examApi.getExamResult(attemptId),
        enabled: !!attemptId,
    })

export const useExamHistory = (examId) =>
    useQuery({
        queryKey: EXAM_KEYS.history(examId),
        queryFn: () => examApi.getExamHistory(examId),
        enabled: !!examId,
    })

export { examApi, EXAM_KEYS }
