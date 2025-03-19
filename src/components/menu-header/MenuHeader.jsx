import useAuthStore from '@/store/useAuthStore'
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
    { label: 'Trang chủ', path: '/' },
    { label: 'Quản lý khóa học', path: '/teacher', role: 'teacher' },
    { label: 'Khóa học của bạn', path: '/student', role: 'student' },
    { label: 'Admin', path: '/admin', role: 'admin' },
  ]

  return (
    <nav className="hidden md:flex space-x-8 text-lg font-medium">
      {menuItems
        .filter((item) => !item.role || user?.roles === item.role)
        .map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={`hover:text-gray-600 transition font-semibold duration-150 ${
              isActive(item.path) ? 'underline text-primary' : ''
            }`}
          >
            {item.label}
          </NavLink>
        ))}
    </nav>
  )
}

export default MenuHeader
