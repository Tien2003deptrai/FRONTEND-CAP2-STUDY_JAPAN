import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CircularProgress from '@mui/material/CircularProgress'

import useFetchLessonData from '@/hooks/useFetchLessonData'
import VideoPlayer from '@/components/lesson/LessonVideo'
import LessonDetail from '@/components/lesson/LessonDetails'
import LessonSidebar from '@/components/lesson/LessonSibar'



function CourseDetail() {
    const { courseId } = useParams()
    const navigate = useNavigate()

    const getInitialLessonIndex = (courseId) => {
        const saved = localStorage.getItem(`lesson-progress-${courseId}`)
        return saved ? Number(saved) : 0
    }
    
    const getInitialMaxUnlocked = (courseId) => {
        const saved = localStorage.getItem(`max-unlocked-${courseId}`)
        const initial = getInitialLessonIndex(courseId)
        return saved ? Number(saved) : initial + 1
    }

    // lay bai hoc
    const [currentLessonIndex, setCurrentLessonIndex] = useState(() =>
        getInitialLessonIndex(courseId)
    )
    //hoc bai 1 -> lock bai 3
    const [maxUnlockedLesson, setMaxUnlockedLesson] = useState(() =>
        getInitialMaxUnlocked(courseId)
    )

    const { data, isLoading, isError, error } = useFetchLessonData(courseId)

    const lessons = data?.data?.lessons || []
    const course = data?.data?.course || {}
    const courseName = course.name || 'Khóa học'

    const totalLessons = lessons.length
    const completedLessons = Math.min(maxUnlockedLesson, totalLessons)
    //%
    const progress = totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0
    // next index
    const isNextLessonUnlocked = currentLessonIndex + 1 <= maxUnlockedLesson
   
    useEffect(() => {
        localStorage.setItem(`lesson-progress-${courseId}`, currentLessonIndex)

        setMaxUnlockedLesson((prev) => {
            const updated = Math.max(prev, currentLessonIndex + 1)
            localStorage.setItem(`max-unlocked-${courseId}`, updated)
            return updated
        })
    }, [currentLessonIndex, courseId])

    if (!courseId) {
        return <p className="text-red-500">Không tìm thấy khóa học.</p>
    }

    const goToNextLesson = () => {
        const nextIndex = currentLessonIndex + 1
        if (nextIndex < lessons.length) {
            setCurrentLessonIndex(nextIndex)
        }
    }

    return (
        <div className="relative h-screen w-screen bg-gray-100">
            <div className="absolute top-0 left-0 w-full flex items-center justify-between p-3 bg-red-500 text-white shadow-md z-10">
                <button
                    onClick={() => navigate(`/courses`)}
                    className="flex items-center text-lg font-semibold"
                >
                    <ArrowBackIcon className="w-5 h-5 mr-2" />
                    {courseName}
                </button>

                <div className="relative w-12 h-12">
                    <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={48}
                        thickness={4}
                        style={{ color: 'white' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                        {progress}%
                    </div>
                </div>
            </div>

            <div className="flex flex-row-reverse h-full pt-16">
                <LessonSidebar
                    lessons={lessons}
                    currentLessonIndex={currentLessonIndex}
                    maxUnlockedLesson={maxUnlockedLesson}
                    onSelectLesson={(index) => {
                        if (index <= maxUnlockedLesson) {
                            setCurrentLessonIndex(index)
                        } else {
                            alert('⚠️ Bạn cần hoàn thành bài học trước đó để mở bài này.')
                        }
                    }}
                />

                <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                    <VideoPlayer
                        lesson={lessons[currentLessonIndex]}
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                    />

                    <LessonDetail lesson={lessons[currentLessonIndex]} />

                    {lessons && currentLessonIndex < lessons.length - 1 && (
                        <button
                            onClick={goToNextLesson}
                            className={`mt-4 ml-auto px-6 py-2 rounded-lg shadow-md transition w-fit ${
                                isNextLessonUnlocked
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!isNextLessonUnlocked}
                        >
                            Tiếp theo bài học
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseDetail