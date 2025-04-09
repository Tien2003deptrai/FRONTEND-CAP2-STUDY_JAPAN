import React, { useState } from 'react'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/auth/signup', formData)
            console.log('Signup response:', response.data)

            Swal.fire({
                icon: 'success',
                title: 'Tạo tài khoản thành công!',
                html: `
                    <p>Email: <strong>${formData.email}</strong></p>
                    <p>Mật khẩu đã được gửi vào email</p>
                `,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Đóng',
            })

            setFormData({ name: '', email: '', role: 'student' })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text:
                    error?.response?.data?.message || 'Không thể tạo tài khoản',
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập họ tên..."
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Vai trò
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="student">🎓 Học viên</option>
                        <option value="teacher">👩‍🏫 Giáo viên</option>
                        <option value="admin">🛠 Admin</option>
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
