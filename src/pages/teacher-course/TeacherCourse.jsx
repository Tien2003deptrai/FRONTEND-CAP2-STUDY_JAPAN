import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function TeacherCourse() {
  const { user } = useAuthStore()
  const getCourse = async () => {
    const res = await axiosInstance.get('/get-by-teacher', {
      params: {
        teacherId: user.id,
      },
    })
    return res.data
  }

  const { data } = useQuery({
    queryKey: ['getCourseLecturer', user.id],
    queryFn: getCourse,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  })
  console.log(data)

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-1200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Danh sách khóa học của tôi</h1>
          <Link
            to={'new-course'}
            className="primary-btn flex justify-center items-center gap-2"
          >
            <Add />
            Tạo khóa học mới
          </Link>
        </div>
        <hr className="w-full my-5" />
        {/* <CourseList courses={data} /> */}
      </div>
    </div>
  )
}

export default TeacherCourse
