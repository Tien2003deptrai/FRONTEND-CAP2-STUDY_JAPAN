import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useCourses } from '../../../../hooks/useCourses'
import CourseCard from '../../../../components/CourseCard'
import useAuthStore from '@/store/useAuthStore'

const Course = () => {
  // TODO: Replace with actual user ID from auth context
  // const userId = '123' // This should come from your auth context
  const userId = useAuthStore((state) => state.user._id)
  console.log('userId', userId)
  const { data: courses, isLoading, error } = useCourses(userId)

  const handleViewCourse = (course) => {
    // Implement view course logic
    console.log('View course:', course)
  }

  const handleEditCourse = (course) => {
    // Implement edit course logic
    console.log('Edit course:', course)
  }

  const handleDeleteCourse = (course) => {
    // Implement delete course logic
    console.log('Delete course:', course)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading courses: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-800">Khóa học</h1>
            <span className="ml-2 text-sm text-gray-500">{courses?.length || 0}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <AddIcon fontSize="small" className="mr-1" />
            Thêm Khóa Học
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={handleViewCourse}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course
