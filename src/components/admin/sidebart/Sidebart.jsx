import {
    Menu,
    People,
    Book,
    Movie,
    Settings,
    BarChart,
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ collapsed, toggleSidebar }) => {
    const location = useLocation()

    // Xác định tab đang active theo đường dẫn
    const getActiveTab = (path) => {
        return location.pathname.startsWith(path)
    }

    return (
        <div
            className={`bg-red-800 text-white transition-all duration-300 ${
                collapsed ? 'w-16' : 'w-64'
            }`}
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
                <Link to="/admin/main">
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                            getActiveTab('/admin/main')
                                ? 'bg-red-900'
                                : 'hover:bg-red-700'
                        }`}
                    >
                        <BarChart style={{ fontSize: 20 }} />
                        {!collapsed && <span className="ml-4">Tổng quan</span>}
                    </div>
                </Link>

                <Link to="/admin/students">
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                            getActiveTab('/admin/students')
                                ? 'bg-red-900'
                                : 'hover:bg-red-700'
                        }`}
                    >
                        <People style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí học viên</span>
                        )}
                    </div>
                </Link>

                <Link to="/admin/teachers">
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                            getActiveTab('/admin/teachers')
                                ? 'bg-red-900'
                                : 'hover:bg-red-700'
                        }`}
                    >
                        <Book style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí giáo viên</span>
                        )}
                    </div>
                </Link>

                <Link to="/admin/courses">
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                            getActiveTab('/admin/courses')
                                ? 'bg-red-900'
                                : 'hover:bg-red-700'
                        }`}
                    >
                        <Movie style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Quản lí khóa học</span>
                        )}
                    </div>
                </Link>

                <Link to="/admin/create-account">
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                            getActiveTab('/admin/create-account')
                                ? 'bg-red-900'
                                : 'hover:bg-red-700'
                        }`}
                    >
                        <Movie style={{ fontSize: 20 }} />
                        {!collapsed && (
                            <span className="ml-4">Tạo tài khoản</span>
                        )}
                    </div>
                </Link>

                <div
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                        getActiveTab('/admin/settings')
                            ? 'bg-red-900'
                            : 'hover:bg-red-700'
                    }`}
                    onClick={() => console.log('Cài đặt')}
                >
                    <Settings style={{ fontSize: 20 }} />
                    {!collapsed && <span className="ml-4">Cài đặt</span>}
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
