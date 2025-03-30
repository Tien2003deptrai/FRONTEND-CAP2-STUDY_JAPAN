import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useStudents } from '../../../../hooks/useStudents'
import StudentCard from '../../../../components/StudentCard'

const Student = () => {
  const { data: students, isLoading, error } = useStudents()

  const handleViewStudent = (student) => {
    // Implement view student logic
    console.log('View student:', student)
  }

  const handleEditStudent = (student) => {
    // Implement edit student logic
    console.log('Edit student:', student)
  }

  const handleDeleteStudent = (student) => {
    // Implement delete student logic
    console.log('Delete student:', student)
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
        <div className="text-red-500">Error loading students: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-800">Sinh viên</h1>
            <span className="ml-2 text-sm text-gray-500">{students?.length || 0}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <AddIcon fontSize="small" className="mr-1" />
            Thêm Sinh Viên
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {students?.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={handleViewStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Student
