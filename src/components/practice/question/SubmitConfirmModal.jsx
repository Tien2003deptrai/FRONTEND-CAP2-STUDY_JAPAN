import React from 'react'

const SubmitConfirmModal = ({ open, onClose, onConfirm }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">Xác nhận nộp bài</h2>
                <p className="mb-6">Bạn có chắc chắn muốn nộp bài không?</p>
                <div className="flex justify-end  gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubmitConfirmModal