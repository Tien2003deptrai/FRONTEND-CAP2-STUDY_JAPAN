import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/network/httpRequest'

export const useVocabulary = (lessonId) => {
    return useQuery({
        queryKey: ['vocabulary', lessonId],
        queryFn: async () => {
            const res = await axios.get(`/vocabulary/lesson/${lessonId}`)
            return res.data.data
        },
        enabled: !!lessonId,
    })
}

export const useAddVocab = (lessonId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) =>
            axios.post(`/vocabulary/lesson/${lessonId}`, data),
        onSuccess: () =>
            queryClient.invalidateQueries(['vocabulary', lessonId]),
    })
}

export const useUpdateVocab = (lessonId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) => axios.put(`/vocabulary/${id}`, data),
        onSuccess: () =>
            queryClient.invalidateQueries(['vocabulary', lessonId]),
    })
}

export const useDeleteVocab = (lessonId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => axios.delete(`/vocabulary/${id}`),
        onSuccess: () =>
            queryClient.invalidateQueries(['vocabulary', lessonId]),
    })
}
