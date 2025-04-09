import { useTeacherById } from '@/hooks/useTeacher'
import React from 'react'

const TeacherDetailModal = ({ teacherId, onClose }) => {
    const { data, isLoading, error } = useTeacherById(teacherId)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4">Thông tin giáo viên</h2>

                {isLoading ? (
                    <p>Đang tải thông tin...</p>
                ) : error ? (
                    <p className="text-red-500">Lỗi tải thông tin giáo viên.</p>
                ) : (
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm text-gray-500">
                                Họ tên:{' '}
                            </span>
                            {data.name}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Email:{' '}
                            </span>
                            {data.email}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Số điện thoại:{' '}
                            </span>
                            {data.phone}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Trạng thái:{' '}
                            </span>
                            {data.status}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Chuyên môn:{' '}
                            </span>
                            {data.teacher_profile?.subjects?.join(', ') ||
                                'Chưa cập nhật'}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Chứng chỉ:{' '}
                            </span>
                            {data.teacher_profile?.certificates?.join(', ') ||
                                'Chưa có'}
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Kinh nghiệm:{' '}
                            </span>
                            {data.teacher_profile?.experience_years || 0} năm
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Giới thiệu:{' '}
                            </span>
                            {data.teacher_profile?.bio || '...'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeacherDetailModal
