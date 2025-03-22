import { useQuery } from '@tanstack/react-query'
import { useLoading } from '@/contexts/LoadingProvider'
import { getAllCourse } from '.'

export const useCourses = (userId) => {
    const { showLoading, hideLoading } = useLoading()

    const query = useQuery({
        queryKey: ['getAllLessons', userId],
        queryFn: () => getAllCourse(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    })

    if (query.isLoading) {
        showLoading()
    } else {
        hideLoading()
    }

    return query
}
