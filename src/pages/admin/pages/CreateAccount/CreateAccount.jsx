import React, { useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        roles: 'student',
    })
    const [loading, setLoading] = useState(false)

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!regex.test(email)) return false

        const invalidDomains = ['example.com', 'test.com', 'domain.com']
        const emailDomain = email.split('@')[1]

        return !invalidDomains.includes(emailDomain)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidEmail(formData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Email không hợp lệ',
                text: 'Vui lòng nhập địa chỉ email hợp lệ (Không sử dụng email như example.com).',
                confirmButtonColor: '#d33',
            })
            return
        }

        setLoading(true)
        try {
            const response = await axiosInstance.post('/auth/signup', formData)
            console.log('Signup response:', response.data)

            Swal.fire({
                icon: 'success',
                title: 'Tạo tài khoản thành công!',
                html: `
                    <p>Email: <strong>${formData.email}</strong></p>
                    <p>Mật khẩu đã được gửi tới email của bạn</p>
                `,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })

            setFormData({ name: '', email: '', phone: '', roles: 'student' })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Tạo tài khoản thất bại!',
                text:
                    error?.response?.data?.message ||
                    'Đã xảy ra lỗi, vui lòng thử lại.',
                confirmButtonColor: '#d33',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-lg mx-auto p-8 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
                Tạo tài khoản người dùng
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Họ tên
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0357635003"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Vai trò
                    </label>
                    <select
                        name="roles"
                        value={formData.roles}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="student">🎓 Học viên</option>
                        <option value="teacher">👩‍🏫 Giáo viên</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-all"
                >
                    {loading ? 'Đang tạo...' : 'Tạo tài khoản'}
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
