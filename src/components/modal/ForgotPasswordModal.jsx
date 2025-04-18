// File: src/components/modal/ForgotPasswordModal.jsx
import React, { useState } from 'react'

const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Call API to send reset link
        console.log('Send reset password email to:', email)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Lấy lại mật khẩu
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email đã đăng ký
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
                    >
                        Gửi liên kết đặt lại mật khẩu
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordModal
