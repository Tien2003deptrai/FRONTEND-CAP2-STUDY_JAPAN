import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, MenuItem, IconButton } from '@mui/material'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'

const StudentCard = ({ student, onViewDetail, onViewCourses }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleStatusChange = async (newStatus) => {
        try {
            await axiosInstance.patch(`/admin/students/${student.id}/status`, {
                status: newStatus,
            })
            handleClose()
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                text: `Trạng thái đã được chuyển sang "${newStatus}".`,
                confirmButtonColor: '#3085d6',
            }).then(() => {
                window.location.reload()
            })
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error)
            handleClose()
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thất bại!',
                text: error?.response?.data?.message || 'Vui lòng thử lại.',
                confirmButtonColor: '#d33',
            })
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4 relative">
            {/* Nút 3 chấm */}
            <div className="absolute top-2 right-2">
                <IconButton size="small" onClick={handleMenuClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => handleStatusChange('active')}>
                        ✅ Active
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange('pending')}>
                        ⏳ Pending
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange('blocked')}>
                        Blocked
                    </MenuItem>
                </Menu>
            </div>

            <div className="flex items-center mb-4">
                <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h3 className="font-medium text-gray-800">
                        {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">{student.email}</p>
                </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>Trình độ: {student.learningLevel}</p>
                <p>Tiến độ: {student.progress}%</p>
                <p>
                    Trạng thái:{' '}
                    <span
                        className={`capitalize font-semibold ${
                            student.status === 'active'
                                ? 'text-green-600'
                                : student.status === 'pending'
                                  ? 'text-yellow-600'
                                  : 'text-red-500'
                        }`}
                    >
                        {student.status}
                    </span>
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onViewDetail}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 text-sm rounded hover:bg-blue-200"
                >
                    Xem chi tiết
                </button>
                <button
                    onClick={onViewCourses}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                >
                    Khóa học
                </button>
            </div>
        </div>
    )
}

export default StudentCard
