import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import useFetchLessonList from '@/hooks/useFetchLessonList'
import { ArrowBack } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

function EditCourseLayout() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { data: lessonList } = useFetchLessonList(courseId) // Fetch lessons

    // Manage which lesson is selected
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
    const lessons = useMemo(() => lessonList?.data?.lessons || [], [lessonList]) // Ensure lessons is always an array
    const selectedLesson = lessons[currentLessonIndex]?._id // Get the current lesson's ID

    // If lesson list updates, reset the index if it's out of bounds
    useEffect(() => {
        if (lessons.length > 0 && currentLessonIndex >= lessons.length) {
            setCurrentLessonIndex(0) // Reset to the first lesson
        }
    }, [lessons, currentLessonIndex])

    return (
        <div className="w-full flex flex-col items-center">
            {/* Header */}
            <header className="z-50 fixed flex h-16 bg-primary top-0 right-0 left-0 shadow-md">
                <button
                    onClick={() => navigate('/teacher')}
                    className="p-3 px-7 text-white duration-150"
                >
                    <ArrowBack fontSize="small" />
                </button>
                <hr className="w-[1px] h-full bg-white" />
                <a
                    href="/"
                    className="font-mono text-2xl font-extrabold text-white flex items-center ml-8"
                >
                    {'Study Japan'}
                </a>
            </header>

            <div className="w-full flex">
                {/* Sidebar */}
                <div className="w-1/4 fixed top-16 left-0 bottom-0 p-4 border-r border-solid border-gray-300 overflow-y-auto bg-white">
                    <EditCourseSidebar
                        lessonId={selectedLesson} // Pass the selected lesson ID
                        onSelectLesson={setCurrentLessonIndex} // Pass function to update lesson index
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 ml-[25%] mt-16 p-6 overflow-auto flex justify-center">
                    <div className="max-w-[900px] w-full flex flex-col gap-6">
                        <Outlet context={{ selectedLesson }} />
                        {/* Pass selectedLesson as context to child routes */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourseLayout
