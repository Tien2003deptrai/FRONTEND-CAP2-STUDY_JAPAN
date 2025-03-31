import useFetchLessonList from '@/hooks/useFetchLessonList'
import { Link, useParams } from 'react-router-dom'

function EditCourseSidebar({ lessonId, onSelectLesson }) {
    const { courseId } = useParams()
    const { data: lessonsData } = useFetchLessonList(courseId)
    const lessons = lessonsData?.data?.lessons || []

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
                {lessons
                    .sort((a, b) => a.index - b.index)
                    .map((lesson, index) => (
                        <p
                            key={lesson._id}
                            className={`block w-full p-4 
                            ${lesson._id === lessonId ? 'font-bold bg-red-100 text-red-600' : ''} 
                            rounded-md truncate hover:text-primary duration-150 cursor-pointer`}
                            onClick={() => onSelectLesson(index)}
                        >
                            {lesson.lesson_title}
                        </p>
                    ))}
            </div>
        </div>
    )
}

export default EditCourseSidebar
