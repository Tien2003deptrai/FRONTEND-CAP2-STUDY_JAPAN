import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'

const TeacherCard = ({ teacher, onStatusUpdated }) => {
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        blocked: 'bg-red-100 text-red-800',
    }

    const [showDropdown, setShowDropdown] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log('loading', loading)

    const handleStatusChange = async (newStatus) => {
        if (newStatus === teacher.status) return
        setLoading(true)
        try {
            await axiosInstance.patch(`/admin/teachers/${teacher.id}/status`, {
                status: newStatus,
            })
            onStatusUpdated?.(teacher.id, newStatus)
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: `Trạng thái giáo viên đã được cập nhật sang "${newStatus}"`,
                confirmButtonColor: '#3085d6',
            })
        } catch (err) {
            console.error('Lỗi cập nhật trạng thái:', err)
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Cập nhật trạng thái thất bại. Vui lòng thử lại.',
                confirmButtonColor: '#d33',
            })
        } finally {
            setLoading(false)
            setShowDropdown(false)
        }
    }

    return (
        <div className="relative bg-white rounded-lg shadow-sm border p-4">
            {/* Nút 3 chấm */}
            <div className="absolute top-2 right-2 z-10">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <MoreVertIcon fontSize="small" />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow z-20">
                        {['active', 'pending', 'blocked'].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                                    teacher.status === status
                                        ? 'font-semibold text-red-600'
                                        : ''
                                }`}
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Nội dung giáo viên */}
            <div className="flex items-center mb-4">
                <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h2 className="font-medium text-gray-800 truncate">
                        {teacher.name}
                    </h2>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                    <p className="text-xs text-gray-400">{teacher.phone}</p>
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

            {/* Trạng thái nằm dưới */}
            <div className="mt-2 text-sm">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[teacher.status] ||
                        'bg-gray-100 text-gray-800'
                    }`}
                >
                    {teacher.status.charAt(0).toUpperCase() +
                        teacher.status.slice(1)}
                </span>
            </div>
        </div>
    )
}

export default TeacherCard
