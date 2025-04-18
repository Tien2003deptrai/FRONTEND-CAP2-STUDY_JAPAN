import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(4, 'Email không hợp lệ.')
        .email('Email không hợp lệ.'),
    password: z.string().trim().min(4, 'Mật khẩu không hợp lệ.'),
})

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    const authenticate = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email: data.email,
                password: data.password,
            })

            if (response.data.status === 200) {
                login(response.data.data.user, response.data.data.token)
                navigate('/')
            }

            console.log('Login successful:', response.data)
            setLoginError('')
        } catch (error) {
            console.error(
                'Login failed:',
                error.response ? error.response.data : error.message
            )
            const errorMessage =
                error.response?.data?.message ||
                'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.'
            setLoginError(errorMessage)
        }
    }

    const onSubmit = async (data) => {
        await authenticate(data)
    }

    return (
        <div className="bg-pink-200 w-full h-screen flex justify-center items-center">
            <div className="mx-auto flex max-w-6xls rounded-lg shadow-lg overflow-hidden">
                {/* Left panel - branding */}
                <div className="flex-1 py-15 px-8 bg-gradient-to-br from-red-600 to-red-800 text-white flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center mb-6 shadow-lg">
                        <span className="text-4xl text-red-600">日</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Sakura Nihongo </h2>
                    <h3 className="text-xl mb-4">日本語を学ぼう!</h3>
                    <p className="text-center mb-4 text-lg">
                        Chào mừng bạn đến với nền tảng học tiếng Nhật hàng đầu
                        Việt Nam. Nơi bạn có thể học tiếng Nhật mọi lúc, mọi
                        nơi.
                    </p>
                    <ul className="list-disc text-left mb-4 text-lg">
                        <li>Hơn 5000+ bài học từ N5 đến N1</li>
                        <li>Học với giọng phát âm chuẩn người bản xứ</li>
                        <li>Luyện tập với AI thông minh</li>
                        <li>Cộng đồng học viên trên 50.000 người</li>
                        <li>Miễn phí trải nghiệm 7 ngày đầu tiên</li>
                    </ul>
                </div>

                {/* Right panel - login form */}
                <div className="flex-1 bg-white px-8 py-24 w-1/2 h-full">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-4xl font-bold text-red-600">
                            Sakura Nihongo{' '}
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

                    <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <div className="text-red-600">
                                        {errors.email.message}
                                    </div>
                                )}
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
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </button>
                                {errors.password && (
                                    <div className="text-red-600">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <a
                                href="#"
                                className="text-red-600 hover:underline text-lg"
                            >
                                Quên mật khẩu?
                            </a>
                        </div>

                        {loginError && (
                            <div className="text-red-600 mb-2">
                                {loginError}
                            </div>
                        )}

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
