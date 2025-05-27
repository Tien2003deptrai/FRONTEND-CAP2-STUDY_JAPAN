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

    const isActive = (path) =>
        path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)

    const menuItems = [
        { label: 'Trang chủ', path: '/', icon: <HomeIcon fontSize="medium" /> },
        {
            label: 'Quản lý khóa học',
            path: '/teacher',
            role: 'teacher',
            icon: <MenuBookIcon fontSize="medium" />,
        },
        {
            label: 'Quản lý tài liệu',
            path: '/manage-document',
            role: 'teacher',
            icon: <LibraryBooksIcon fontSize="medium" />,
        },
        {
            label: 'Khóa học của tôi',
            path: '/courses',
            role: 'student',
            icon: <AssignmentIcon fontSize="medium" />,
        },
        {
            label: 'Kanji',
            path: '/kanji',
            role: 'student',
            icon: <DrawIcon fontSize="medium" />,
        },
        {
            label: 'Luyện tập',
            path: '/practice',
            role: 'student',
            icon: <SchoolIcon fontSize="medium" />,
        },
        {
            label: 'Sự kiện',
            path: '/event',
            role: 'student',
            icon: <EventIcon fontSize="medium" />,
        },
        {
            label: 'Admin',
            path: '/admin',
            role: 'admin',
            icon: <AdminPanelSettingsIcon fontSize="medium" />,
        },
    ]

    return (
        <nav className="hidden md:flex items-center space-x-8 text-base font-semibold select-none">
            {menuItems
                .filter((item) => !item.role || user?.roles === item.role)
                .map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
               ${
                   isActive
                       ? 'text-red-700 underline underline-offset-8 decoration-2 font-bold shadow-md'
                       : 'text-gray-700 hover:text-red-600 hover:bg-red-50 shadow-sm hover:shadow-md'
               }`
                        }
                        aria-current={isActive(item.path) ? 'page' : undefined}
                        title={item.label}
                    >
                        <span className="text-red-600">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
        </nav>
    )
}

export default MenuHeader
