import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const TeacherCard = ({ teacher, onView }) => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium text-gray-800">
                        {teacher.name}
                    </h2>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            teacher.status === 'active'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-pink-100 text-pink-800'
                        }`}
                    >
                        •{' '}
                        {teacher.status.charAt(0).toUpperCase() +
                            teacher.status.slice(1)}
                    </span>
                </div>

                <div className="flex items-center mb-4">
                    <img
                        src={teacher.avatar || '/api/placeholder/32/32'}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                        <p className="text-sm font-medium">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                        <p className="text-xs text-gray-500">Region</p>
                        <p className="text-sm">{teacher.region || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Sub Region</p>
                        <p className="text-sm">{teacher.subRegion || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[...Array(Math.min(3, teacher.members || 0))].map(
                            (_, i) => (
                                <img
                                    key={i}
                                    src={`/api/placeholder/${24 + i}/${24 + i}`}
                                    alt="Member"
                                    className="w-6 h-6 rounded-full border border-white"
                                />
                            )
                        )}
                        {teacher.members > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                                +{teacher.members - 3}
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
                            View
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherCard
