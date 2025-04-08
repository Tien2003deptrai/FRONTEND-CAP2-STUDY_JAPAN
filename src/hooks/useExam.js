import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from '@/network/httpRequest'

const EXAM_KEYS = {
    all: ['exams'],
    list: () => [...EXAM_KEYS.all, 'list'],
    detail: (examId) => [...EXAM_KEYS.all, 'detail', examId],
    take: (attemptId) => [...EXAM_KEYS.all, 'take', attemptId],
    result: (attemptId) => [...EXAM_KEYS.all, 'result', attemptId],
    history: (examId) => [...EXAM_KEYS.all, 'history', examId],
}

const examApi = {
    getExamList: async () => {
        const res = await axiosInstance.get('/exam')
        return res.data.data
    },

    getExamById: async (examId) => {
        const res = await axiosInstance.get(`/exam/take/${examId}`)
        return res.data
    },

    getExamTake: async (attemptId) => {
        const res = await axiosInstance.get(`/exam/take/${attemptId}`)
        return res.data.data
    },

    startExam: async (examId) => {
        if (!examId) throw new Error('Exam ID is required')
        const res = await axiosInstance.post(`/exam/start/${examId}`)
        const data = res.data.data
        if (!data?.attemptId) throw new Error('Server không trả về attemptId')
        return data
    },

    // ✅ Đã sửa đúng format answer
    submitExam: async ({ attemptId, answers }) => {
        const formattedAnswers = Object.entries(answers).map(
            ([questionId, answer]) => ({
                questionId,
                answer: String(answer).toUpperCase(), // đảm bảo gửi "A", "B", "C", "D"
            })
        )
        const res = await axiosInstance.post(`/exam/submit/${attemptId}`, {
            answers: formattedAnswers,
        })
        return res.data.data
    },

    getExamResult: async (attemptId) => {
        const res = await axiosInstance.get(`/exam/result/${attemptId}`)
        return res.data.data
    },

    getExamHistory: async (examId) => {
        const res = await axiosInstance.get(
            `/exam/history?examId=${examId}&status=completed`
        )
        return res.data.data
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

export const useExamTake = (attemptId) =>
    useQuery({
        queryKey: EXAM_KEYS.take(attemptId),
        queryFn: () => examApi.getExamTake(attemptId),
        enabled: !!attemptId,
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
