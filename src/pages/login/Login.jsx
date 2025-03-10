import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let isValid = true

    if (!email.trim()) {
      setEmailError('Email hoặc tên đăng nhập không được để trống.')
      isValid = false
    } else if (!isValidEmail(email)) {
      setEmailError('Email không hợp lệ.')
      isValid = false
    }

    if (!password.trim()) {
      setPasswordError('Mật khẩu không được để trống.')
      isValid = false
    } else if (!isValidPassword(password)) {
      setPasswordError(
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt.'
      )
      isValid = false
    }

    if (isValid) {
      console.log('Email:', email, 'Password:', password)
      setEmail('')
      setPassword('')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-pink-200 w-full h-screen flex justify-center items-center">
      <div className="mx-auto flex max-w-6xls rounded-lg shadow-lg overflow-hidden">
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

          <form id="loginForm" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="text-red-600" id="emailError">
                  {emailError}
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition duration-200 text-lg"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  id="togglePassword"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
                <div className="text-red-600" id="passwordError">
                  {passwordError}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
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
        </div>
      </div>
    </div>
  )
}

export default Login
