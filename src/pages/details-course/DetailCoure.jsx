import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '@/network/httpRequest'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import VideoPlayer from '@/components/lesson/LessonVideo'
import LessonDetail from '@/components/lesson/LessonDetails'
import LessonSidebar from '@/components/lesson/LessonSibar'

function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  const fetchLessons = async (courseId) => {
    const res = await axiosInstance.get(`/lesson/release/all/${courseId}`)
    if (res.data && res.data.success) {
      return res.data.data
    } else {
      throw new Error('Không thể lấy danh sách bài học. Vui lòng thử lại.')
    }
  }

  const { data: lessons, isLoading, isError, error } = useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => fetchLessons(courseId),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  const courseName = lessons?.[0]?.course?.name

  const totalLessons = lessons?.length || 0
  const completedLessons = currentLessonIndex + 1
  const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  if (!courseId) {
    return <p className="text-red-500">Không tìm thấy khóa học.</p>
  }

  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-red-500 text-white shadow-md z-10">
        <button onClick={() => navigate(-1)} className="flex items-center text-lg font-semibold">
          <ArrowBackIcon className="w-5 h-5 mr-2" /> {courseName}
        </button>
        <span className="text-sm font-medium">Tiến độ: {progress}%</span>
      </div>

      <div className="flex flex-row-reverse h-full pt-16">
        <LessonSidebar
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={setCurrentLessonIndex}
        />

        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <VideoPlayer
            lesson={lessons?.[currentLessonIndex]}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />

          <LessonDetail lesson={lessons?.[currentLessonIndex]} />

          {lessons && currentLessonIndex < lessons.length - 1 && (
            <button
              onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
              className="mt-4 ml-auto px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition w-fit"
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