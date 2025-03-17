import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 left-0 w-full bg-white text-primary shadow-lg py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wide flex items-center"
          >
            <span className="mr-2">🇯🇵</span> Sakura Nihongo
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link
            to="/courses"
            className="hover:text-gray-100 transition text-[22px] font-semibold duration-300"
          >
            Học Tập
          </Link>
          <Link
            to="/community"
            className="hover:text-gray-100 transition text-[22px] font-semibold duration-300"
          >
            Luyện Tập
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="primary-btn">Đăng nhập</button>
        </div>
      </div>
    </header>
  )
}

export default Header
