import { useQuery } from '@tanstack/react-query'
import CourseList from '@/components/course/courseList'
import axiosInstance from '@/network/httpRequest'

function StudentCourse() {
  const userId = '605c72ef5f5b2c1d4c8e1003' // chua xu ly login nen su dung tam 
  const fetchCourses = async () => {
    const res = await axiosInstance.get('/course/all')
    if (res.data && res.data.success) {
      return res.data.data.map((course) => ({
        id: course._id,
        title: course.name,
        description: `${course.type} - Tác giả: ${course.author}`,
        image: course.thumb,
        isAvailable: course.enrolledStudents.some(
          (student) => student._id === userId
        ),
        slug: course.course_slug,
      }))
    } else {
      throw new Error('Không thể lấy danh sách khóa học. Vui lòng thử lại.')
    }
  }

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['studentCourses'],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-1200 py-9">
        <h1 className="text-2xl font-bold">Danh sách khóa học của tôi</h1>
        <hr className="w-full my-5" />

        {isLoading ? (
          <p>Đang tải khóa học...</p>
        ) : isError ? (
          <div className="text-red-500 font-semibold">
            {error?.message || 'Đã xảy ra lỗi không xác định.'}
          </div>
        ) : courses?.length > 0 ? (
          <CourseList courses={courses} />
        ) : (
          <p>Không có khóa học nào được tìm thấy.</p>
        )}
      </div>
    </div>
  )
}

export default StudentCourse