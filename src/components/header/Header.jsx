import useAuthStore from '@/store/useAuthStore'
import { Avatar, Menu, MenuDropdown, MenuTarget } from '@mantine/core'
import { Link } from 'react-router-dom'
import MenuHeader from '../menu-header/MenuHeader'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

function Header() {
    const { user, logout } = useAuthStore()

    const onSignOut = () => {
        logout()
        window.location.replace('/login')
    }

    return (
        <header className="sticky top-0 left-0 w-full bg-white text-primary shadow-md py-4 z-50">
            <div className="mx-auto flex justify-between items-center px-6 sm:px-12">
                <div className="flex items-center gap-2">
                    <img
                        src="https://cdn.dribbble.com/userupload/24354452/file/original-e3e8d61a7c9524fff6d3c2ba4fbe9ec7.png?resize=752x&vertical=center"
                        alt="Logo"
                        className="w-8 h-8"
                    />
                    <a
                        href="/"
                        className="font-mono text-2xl font-extrabold tracking-wide flex items-center text-red-600"
                    >
                        Nihongo
                    </a>
                </div>

                <MenuHeader />

                <div className="flex items-center space-x-4">
                    {user?._id ? (
                        <div className="flex justify-center items-center gap-3">
                            <p className="text-sm font-medium text-gray-700">
                                {user.name}
                            </p>
                            <Menu>
                                <MenuTarget>
                                    <Avatar
                                        className="cursor-pointer border border-gray-300 shadow"
                                        src={user?.url}
                                        alt={user?.name}
                                    />
                                </MenuTarget>
                                <MenuDropdown className="rounded-xl shadow-lg px-2 py-2 w-48">
                                    <Link
                                        to={'/profile'}
                                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700"
                                    >
                                        <PersonIcon fontSize="small" /> Thông
                                        tin cá nhân
                                    </Link>
                                    <button
                                        onClick={onSignOut}
                                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 w-full"
                                    >
                                        <LogoutIcon fontSize="small" /> Đăng
                                        xuất
                                    </button>
                                </MenuDropdown>
                            </Menu>
                        </div>
                    ) : (
                        <Link
                            to={'/login'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow text-sm font-semibold transition"
                        >
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
