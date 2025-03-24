import useFetchLessonList from '@/hook/useFetchLessonList'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditCourseSidebar() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { data: lessonsData } = useFetchLessonList(courseId)

    console.log(lessonsData)

    useEffect(() => {}, [])

    return (
        <div>
            {lessonsData?.data?.lessons.map((lesson) => (
                <div>{lesson.lesson_title}</div>
            ))}
        </div>
    )
}

export default EditCourseSidebar
