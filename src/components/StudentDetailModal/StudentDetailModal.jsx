import { useStudentById } from '@/hooks/useStudents'
import React from 'react'

const StudentDetailModal = ({ studentId, onClose }) => {
    const { data, isLoading, error } = useStudentById(studentId)
    console.log('data', data)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4">Thông tin học viên</h2>

                {isLoading ? (
                    <p>Đang tải thông tin...</p>
                ) : error ? (
                    <p className="text-red-500">Lỗi tải thông tin học viên.</p>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Họ tên</p>
                            <p className="text-base font-medium">{data.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-base">{data.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Số điện thoại
                            </p>
                            <p className="text-base">{data.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Trạng thái</p>
                            <p className="text-base capitalize">
                                {data.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Trình độ học
                            </p>
                            <p className="text-base capitalize">
                                {data.student_profile?.learning_level ||
                                    'Chưa cập nhật'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tiến độ (%)</p>
                            <p className="text-base">
                                {data.student_profile?.progress || 0}%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentDetailModal
