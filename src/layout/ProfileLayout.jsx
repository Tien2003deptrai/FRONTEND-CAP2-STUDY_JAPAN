// File: src/layouts/UserLayout.jsx
import React, { useState } from 'react'
import Footer from '@/components/footer/Footer'
import ScrollToTop from '@/components/scroll-to-top/ScrollToTop'
import { Outlet, useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChangePasswordModal from '@/components/modal/ChangePasswordModal'
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal'

const UserLayout = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const navigate = useNavigate()

    const handleAction = (action) => {
        setShowMenu(false)
        if (action === 'change-password') setShowChangePassword(true)
        if (action === 'forgot-password') setShowForgotPassword(true)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ScrollToTop />

            <div className="bg-red-500 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="text-xl font-bold text-white hover:text-yellow-100"
                >
                    ✕
                </button>
                <h1 className="text-lg font-bold text-white">
                    Cài đặt tài khoản
                </h1>
                <div className="relative inline-block text-left">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 rounded-full hover:bg-red-600"
                    >
                        <MoreVertIcon className="text-white" />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <button
                                onClick={() => handleAction('change-password')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🔐 Đổi mật khẩu
                            </button>
                            <button
                                onClick={() => handleAction('forgot-password')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                🔁 Lấy lại mật khẩu
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Full-width content */}
            <main className="flex-1 px-4 py-8">
                <Outlet />
            </main>

            <Footer />

            {/* Modals */}
            {showChangePassword && (
                <ChangePasswordModal
                    onClose={() => setShowChangePassword(false)}
                />
            )}
            {showForgotPassword && (
                <ForgotPasswordModal
                    onClose={() => setShowForgotPassword(false)}
                />
            )}
        </div>
    )
}

export default UserLayout
