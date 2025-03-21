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

  if (!courseId) {
    return <p className="text-red-500">Không tìm thấy khóa học.</p>
  }
  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full flex items-center p-4 bg-red-500 text-white shadow-md z-10">
        <button onClick={() => navigate(-1)} className="flex items-center text-lg font-semibold">
          <ArrowBackIcon className="w-5 h-5 mr-2" /> {courseName}
        </button>
      </div>
  
      <div className="flex flex-row-reverse h-full pt-16">
        <LessonSidebar
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={setCurrentLessonIndex}
        />
  
        <div className="flex-1 flex flex-col p-6">
          <VideoPlayer lesson={lessons?.[currentLessonIndex]} isLoading={isLoading} isError={isError} error={error} />
  
          <LessonDetail lesson={lessons?.[currentLessonIndex]} />
        </div>
      </div>
    </div>
  )
}

export default CourseDetail