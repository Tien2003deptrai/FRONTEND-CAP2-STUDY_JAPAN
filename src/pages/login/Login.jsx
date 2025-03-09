import React from 'react'

function Login() {
  return (
    <div className="bg-pink-200 min-h-screen flex justify-center items-center">
      <div className="container mx-auto flex max-w-6xls rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 py-15 px-8 bg-gradient-to-br from-red-600 to-red-800 text-white flex flex-col justify-center items-center">
          <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center mb-6 shadow-lg">
            <span className="text-4xl text-red-600">日</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Nihongo Master</h2>
          <h3 className="text-xl mb-4">日本語を学ぼう!</h3>
          <p className="text-center mb-4 text-lg">
            Chào mừng bạn đến với nền tảng học tiếng Nhật hàng đầu Việt Nam. Nơi
            bạn có thể học tiếng Nhật mọi lúc, mọi nơi.
          </p>
          <ul className="list-disc text-left mb-4 text-lg">
            <li>Hơn 5000+ bài học từ N5 đến N1</li>
            <li>Học với giọng phát âm chuẩn người bản xứ</li>
            <li>Luyện tập với AI thông minh</li>
            <li>Cộng đồng học viên trên 50.000 người</li>
            <li>Miễn phí trải nghiệm 7 ngày đầu tiên</li>
          </ul>
        </div>

        <div className="flex-1 bg-white px-8 py-24 w-1/2 h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-4xl font-bold text-red-600">
              Nihongo Master
            </div>
            <div className="relative">
              <button
                className="text-gray-500 focus:outline-none"
                id="languageButton"
              >
                Tiếng Việt ▼
              </button>
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden"
                id="languageTooltip"
              >
                <div className="py-2 cursor-pointer hover:bg-gray-100">
                  Tiếng Việt
                </div>
                <div className="py-2 cursor-pointer hover:bg-gray-100">
                  English
                </div>
                <div className="py-2 cursor-pointer hover:bg-gray-100">
                  日本語
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Đăng nhập</h1>
          <p className="text-gray-600 mb-4 text-lg">
            Vui lòng đăng nhập để tiếp tục học tiếng Nhật
          </p>

          <form id="loginForm">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 mb-1 text-lg"
              >
                Email hoặc tên đăng nhập
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  placeholder="Nhập email hoặc tên đăng nhập của bạn"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition duration-200 text-lg"
                  required
                />
                <div className="text-red-600 hidden" id="emailError">
                  Error message
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 mb-1 text-lg"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition duration-200 text-lg"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  id="togglePassword"
                >
                  👁️
                </button>
                <div className="text-red-600 hidden" id="passwordError">
                  Error message
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700 text-lg">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" className="text-red-600 hover:underline text-lg">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 text-lg"
            >
              Đăng nhập
            </button>
          </form>

          <div className="text-center text-gray-600 text-lg">
            Chưa có tài khoản?{' '}
            <a href="#" className="text-red-600 hover:underline">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
