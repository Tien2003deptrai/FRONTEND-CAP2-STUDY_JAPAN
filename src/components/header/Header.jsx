import useAuthStore from '@/store/useAuthStore'
import { Avatar, Menu, MenuDropdown, MenuTarget } from '@mantine/core'
import { Link } from 'react-router-dom'
import MenuHeader from '../menu-header/MenuHeader'

function Header() {
    const { user, logout } = useAuthStore()

    const onSignOut = () => {
        logout()
        window.location.replace('/login')
    }

    return (
        <header className="sticky top-0 left-0 w-full bg-white text-primary shadow-lg py-4 z-50">
            <div className="mx-auto flex justify-between items-center px-12">
                <div>
                    <a
                        href="/"
                        className="font-mono text-3xl font-extrabold tracking-wide flex items-center"
                    >
                        STUDY JAPAN
                    </a>
                </div>

                <MenuHeader />

                <div className="flex items-center space-x-4">
                    {user?._id ? (
                        <div className="flex justify-center items-center gap-3">
                            <p>{user.name}</p>
                            <Menu>
                                <MenuTarget>
                                    <Avatar
                                        className="cursor-pointer"
                                        src={user?.url}
                                    />
                                </MenuTarget>
                                <MenuDropdown>
                                    <div className="flex flex-col justify-center items-start w-full gap-3 duration-150">
                                        <Link
                                            to={'/profile'}
                                            className="text-gray-600 p-2 hover:bg-gray-100 w-full"
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                        <button
                                            onClick={onSignOut}
                                            className="text-gray-600 p-2 hover:bg-gray-100 hover:text-primary w-full"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                </MenuDropdown>
                            </Menu>
                        </div>
                    ) : (
                        <Link to={'/login'} className="primary-btn">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
