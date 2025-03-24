import useFetchLessonList from '@/hook/useFetchLessonList'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function EditCourse() {
    const { courseId, lessonId } = useParams()
    const location = useLocation()
    const lesson = location.state
    console.log(lesson)

    const navigate = useNavigate()
    console.log(courseId, lessonId)

    const { data } = useFetchLessonList(courseId)

    useEffect(() => {
        if (data && lessonId == undefined) {
            // Redirect to first lesson
            navigate(`/teacher/edit/${courseId}/${data.data.lessons[0]._id}`, {
                replace: true,
                state: { lesson: data?.data?.lessons[0] },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div></div>
}

export default EditCourse
