import EditCourseSidebar from '@/components/edit-course-sidebar/EditCourseSidebar'
import ScrollToTop from '@/components/scroll-to-top/ScrollToTop'
import useFetchLessonList from '@/hooks/useFetchLessonList'
import { ArrowBack } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

function EditCourseLayout() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { data: lessonList } = useFetchLessonList(courseId)

    const lessons = useMemo(() => lessonList?.data?.lessons || [], [lessonList])

    // Initialize selectedLesson state instead of using an index
    const [selectedLesson, setSelectedLesson] = useState(null)

    // Set initial lesson when data loads
    useEffect(() => {
        if (lessons.length > 0 && !selectedLesson) {
            setSelectedLesson(lessons[0]._id)
        }
    }, [lessons])

    const handleLessonSelect = (lessonId) => {
        setSelectedLesson(lessonId)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <ScrollToTop />
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
                        lessonId={selectedLesson}
                        onSelectLesson={handleLessonSelect}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 ml-[25%] mt-16 p-6 overflow-auto flex justify-center">
                    <div className="max-w-[900px] w-full flex flex-col gap-6">
                        <Outlet context={{ selectedLesson }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourseLayout
