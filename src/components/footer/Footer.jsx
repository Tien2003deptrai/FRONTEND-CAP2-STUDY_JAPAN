import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-red-700 to-red-500 text-white py-8 w-full shadow-lg">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Logo và thông tin */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold flex items-center">
                            <span className="text-3xl mr-2">🌸</span>
                            Study Japan
                        </h2>
                        <p className="mt-3 text-gray-200">
                            Nền tảng học tiếng Nhật toàn diện cho mọi trình độ.
                        </p>
                        <div className="mt-4 flex space-x-3"></div>
                    </div>

                    {/* Liên kết nhanh */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b border-red-400 pb-2">
                            Liên kết nhanh
                        </h3>
                        <ul className="mt-2 space-y-3">
                            <li>
                                <Link
                                    to="/learning"
                                    className="hover:text-gray-300 flex items-center"
                                >
                                    <span className="mr-2">📚</span> Học tập
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/community"
                                    className="hover:text-gray-300 flex items-center"
                                >
                                    <span className="mr-2">✏️</span> Luyện tập
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses"
                                    className="hover:text-gray-300 flex items-center"
                                >
                                    <span className="mr-2">🎓</span> Khóa học
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/forum"
                                    className="hover:text-gray-300 flex items-center"
                                >
                                    <span className="mr-2">💬</span> Diễn đàn
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-gray-300 flex items-center"
                                >
                                    <span className="mr-2">ℹ️</span> Về chúng
                                    tôi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Theo dõi và liên hệ */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b border-red-400 pb-2">
                            Kết nối với chúng tôi
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <a
                                href="#"
                                className="hover:text-gray-300 flex items-center"
                            >
                                <span className="mr-2 text-xl">📘</span>{' '}
                                Facebook
                            </a>
                            <a
                                href="#"
                                className="hover:text-gray-300 flex items-center"
                            >
                                <span className="mr-2 text-xl">🐦</span> Twitter
                            </a>
                            <a
                                href="#"
                                className="hover:text-gray-300 flex items-center"
                            >
                                <span className="mr-2 text-xl">🎥</span> YouTube
                            </a>
                            <a
                                href="#"
                                className="hover:text-gray-300 flex items-center"
                            >
                                <span className="mr-2 text-xl">📷</span>{' '}
                                Instagram
                            </a>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-2">
                                Đăng ký nhận tin
                            </h4>
                            <div className="flex mt-2">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="px-3 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none"
                                />
                                <button className="bg-red-800 px-4 py-2 rounded-r-lg hover:bg-red-900 transition duration-300">
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-red-400 text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Sakura Nihongo. Tất cả các
                        quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
