import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const CourseCard = ({ course, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-800">{course.name}</h2>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              course.status === 'active'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-pink-100 text-pink-800'
            }`}
          >
            {/* • {course.status.charAt(0).toUpperCase() + course.status.slice(1)} */}
            {course?.status}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <img
            src={course.thumbnail || '/api/placeholder/32/32'}
            alt={course.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium">{course.name}</p>
            <p className="text-xs text-gray-500">{course.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm">{course.duration || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Level</p>
            <p className="text-sm">{course.level || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {[...Array(Math.min(3, course.students?.length || 0))].map((_, i) => (
              <img
                key={i}
                src={`/api/placeholder/${24 + i}/${24 + i}`}
                alt="Student"
                className="w-6 h-6 rounded-full border border-white"
              />
            ))}
            {course.students?.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                +{course.students.length - 3}
              </div>
            )}
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={toggleMenu}
          >
            <MoreHorizIcon fontSize="small" />
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="border-t border-gray-100">
          <div className="p-2 bg-blue-50">
            <button
              onClick={() => {
                onView(course)
                toggleMenu()
              }}
              className="w-full py-2 flex items-center text-sm text-blue-600 hover:bg-blue-100 rounded px-2"
            >
              <VisibilityIcon className="w-4 h-4 mr-2" />
              View
            </button>
            <button
              onClick={() => {
                onEdit(course)
                toggleMenu()
              }}
              className="w-full py-2 flex items-center text-sm text-gray-600 hover:bg-blue-100 rounded px-2"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(course)
                toggleMenu()
              }}
              className="w-full py-2 flex items-center text-sm text-red-600 hover:bg-red-50 rounded px-2"
            >
              <DeleteIcon className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseCard
