import axiosInstance from '@/network/httpRequest'

const updateQuestionExam = async (examId, questionId, data) => {
    return await axiosInstance.put(
        `exam/${examId}/question/${questionId}`,
        data
    )
}
const createQuestionExam = async (examId, data) => {
    return await axiosInstance.post(`exam/${examId}/questions`, {
        questions: [data],
    })
}

const createQuestionRevision = async (data) => {
    return await axiosInstance.post(`renshuu`, data)
}
const updateQuestionRevision = async (data) => {
    return await axiosInstance.put(`renshuu/question`, data)
}

export {
    createQuestionExam,
    createQuestionRevision,
    updateQuestionExam,
    updateQuestionRevision,
}
