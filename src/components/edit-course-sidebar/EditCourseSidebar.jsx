import useFetchLessonList from '@/hooks/useFetchLessonList'
import { Link, useParams } from 'react-router-dom'

function EditCourseSidebar() {
    const { courseId, lessonId } = useParams()
    const { data: lessonsData } = useFetchLessonList(courseId)
    return (
        <div className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-2">
                <Link
                    className="primary-btn"
                    to={`/teacher/edit-course/${courseId}`}
                >
                    Chỉnh sửa cấu trúc khóa học
                </Link>
                <Link className="primary-btn">Quản lý học viên</Link>
            </div>
            <hr />

            <div className="w-full flex flex-col gap-3">
                {lessonsData?.data?.lessons.map((lesson) => (
                    <Link
                        key={lesson._id}
                        to={`/teacher/edit/${courseId}/${lesson._id}`}
                        className={`block w-full p-4 
                            ${lesson._id === lessonId ? 'font-bold bg-red-100 text-red-600' : ''} 
                            rounded-md truncate hover:text-primary duration-150 `}
                        state={lesson}
                    >
                        {lesson.lesson_title} Lorem ipsum, dolor sit amet
                        consectetur adipisicing elit. Ea natus reprehenderit cum
                        facilis sed dolor. Qui beatae aliquid ab, sed,
                        doloremque impedit aspernatur, maxime repellat eaque
                        quis autem. Repellendus, cupiditate?
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default EditCourseSidebar
