import useFetchLessonList from '@/hook/useFetchLessonList'
import { useParams } from 'react-router-dom'

function EditCourseSidebar() {
  const param = useParams()
  const courseId = param.courseId
  const { data } = useFetchLessonList(courseId)
  console.log(data)
  return (
    <div>
      {data?.data?.lessons.map((lesson) => (
        <div>{lesson.lesson_title}</div>
      ))}
    </div>
  )
}

export default EditCourseSidebar
