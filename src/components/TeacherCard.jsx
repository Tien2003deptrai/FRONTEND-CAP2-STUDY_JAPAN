import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'

const TeacherCard = ({ teacher, onView }) => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => setShowMenu(!showMenu)

    const statusColors = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        blocked: 'bg-red-100 text-red-800',
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium text-gray-800 truncate">
                        {teacher.name}
                    </h2>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            statusColors[teacher.status] ||
                            'bg-gray-100 text-gray-800'
                        }`}
                    >
                        •{' '}
                        {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                    </span>
                </div>

                <div className="flex items-center mb-4">
                    <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <p className="text-sm font-medium">{teacher.email}</p>
                        <p className="text-xs text-gray-500">{teacher.phone}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                        <p className="text-xs text-gray-500">Kinh nghiệm</p>
                        <p className="text-sm">{teacher.experienceYears} năm</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Chứng chỉ</p>
                        <p className="text-sm">
                            {teacher.certificates.length > 0
                                ? teacher.certificates.join(', ')
                                : 'Chưa cập nhật'}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {teacher.subjects.slice(0, 3).map((subject, i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-blue-100 text-xs flex items-center justify-center text-blue-700 border border-white"
                            >
                                {subject[0]}
                            </div>
                        ))}
                        {teacher.subjects.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                                +{teacher.subjects.length - 3}
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
                                onView(teacher)
                                toggleMenu()
                            }}
                            className="w-full py-2 flex items-center text-sm text-blue-600 hover:bg-blue-100 rounded px-2"
                        >
                            <VisibilityIcon className="w-4 h-4 mr-2" />
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherCard
