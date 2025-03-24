import useFetchLessonList from '@/hook/useFetchLessonList'
import { ArrowBack } from '@mui/icons-material'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditCourseSidebar() {
    const { courseId, lessonId } = useParams()
    const navigate = useNavigate()
    const { data: lessonsData } = useFetchLessonList(courseId)
    console.log(lessonsData)
    return (
        <div className="w-full flex flex-col gap-8">
            <div className="w-full flex">
                <button
                    onClick={() => navigate('/teacher')}
                    className="rounded-full border border-solid border-gray-200 shadow-xl p-3 hover:text-primary duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <div className="flex-1 flex justify-center items-center">
                    <a
                        href="/"
                        className="font-mono text-3xl font-extrabold text-primary tracking-wide flex items-center"
                    >
                        STUDY JAPAN
                    </a>
                </div>
            </div>
            <hr />
            <div className="w-full flex flex-col gap-3">
                {lessonsData?.data?.lessons.map((lesson) => (
                    <Link
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
