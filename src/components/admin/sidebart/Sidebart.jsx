import React from 'react'
import {
    Menu,
    People,
    Book,
    Movie,
    Description,
    EmojiEvents,
    Settings,
    Logout,
    BarChart,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar = ({ collapsed, toggleSidebar, activeTab, setActiveTab }) => {
    return (
        <div
            className={`bg-red-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-red-700">
                {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-md hover:bg-red-700"
                >
                    <Menu style={{ fontSize: 24 }} />
                </button>
            </div>
            <nav className="mt-6">
                <Link to={'/admin/main'}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <BarChart style={{ fontSize: 20 }} />
                        {!collapsed && <span className="ml-4">Tổng quan</span>}
                    </div>
                </Link>
                {/* main */}
                <Link to={'/admin/students'}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'students' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                        onClick={() => setActiveTab('students')}
                    >
                        <People style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí học viên</span>
                        )}
                    </div>
                </Link>
                <Link to={'/admin/teachers'}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'lessons' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                        onClick={() => setActiveTab('lessons')}
                    >
                        <Book style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí giáo viên</span>
                        )}
                    </div>
                </Link>
                <Link to={'/admin/courses'}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'videos' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        <Movie style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí khóa học</span>
                        )}
                    </div>
                </Link>

                <Link to={'/admin/create-account'}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'videos' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        <Movie style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Tạo tài khoản</span>
                        )}
                    </div>
                </Link>

                <div
                    className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'settings' ? 'bg-red-900' : 'hover:bg-red-700'}`}
                    onClick={() => setActiveTab('settings')}
                >
                    <Settings style={{ fontSize: 20 }} />
                    {!collapsed && <span className="ml-4">Cài đặt</span>}
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
