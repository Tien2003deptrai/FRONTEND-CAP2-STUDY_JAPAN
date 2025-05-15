// MenuHeader.jsx
import useAuthStore from '@/store/useAuthStore'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DrawIcon from '@mui/icons-material/Draw'
import EventIcon from '@mui/icons-material/Event'
import HomeIcon from '@mui/icons-material/Home'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import { NavLink, useLocation } from 'react-router-dom'

function MenuHeader() {
    const location = useLocation()
    const { user } = useAuthStore()

    const isActive = (path) => {
        return path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)
    }

    const menuItems = [
        { label: 'Trang chủ', path: '/', icon: <HomeIcon fontSize="small" /> },
        {
            label: 'Quản lý khóa học',
            path: '/teacher',
            role: 'teacher',
            icon: <MenuBookIcon fontSize="small" />,
        },
        {
            label: 'Quản lý tài liệu',
            path: '/manage-document',
            role: 'teacher',
            icon: <LibraryBooksIcon fontSize="small" />,
        },
        {
            label: 'Khóa học của tôi',
            path: '/courses',
            role: 'student',
            icon: <AssignmentIcon fontSize="small" />,
        },
        {
            label: 'Kanji',
            path: '/kanji',
            role: 'student',
            icon: <DrawIcon fontSize="small" />,
        },
        {
            label: 'Luyện tập',
            path: '/practice',
            role: 'student',
            icon: <SchoolIcon fontSize="small" />,
        },
        {
            label: 'Sự kiện',
            path: '/event',
            role: 'student',
            icon: <EventIcon fontSize="small" />,
        },
        {
            label: 'Admin',
            path: '/admin',
            role: 'admin',
            icon: <AdminPanelSettingsIcon fontSize="small" />,
        },
    ]

    return (
        <nav className="hidden md:flex space-x-6 text-sm font-medium items-center">
            {menuItems
                .filter((item) => !item.role || user?.roles === item.role)
                .map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={`text-xl flex items-center text-red-600 gap-1 px-2 py-1 rounded-md hover:text-red-700 hover:bg-red-50 transition duration-150 ${
                            isActive(item.path)
                                ? 'text-blue-700 underline'
                                : 'text-gray-700'
                        }`}
                    >
                        {item.label}
                    </NavLink>
                ))}
        </nav>
    )
}

export default MenuHeader
