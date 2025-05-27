import React from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '@/network/httpRequest'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
const rolesOptions = [
    { label: 'Học viên', value: 'student' },
    { label: 'Giáo viên', value: 'teacher' },
]

const CreateStudentForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/signup', {
                ...data,
                roles: data.roles || 'student', // đảm bảo có role
            })
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo tài khoản thành công!',
                    html: `<p>Email: <strong>${data.email}</strong></p><p>Mật khẩu đã được gửi qua email.</p>`,
                })
            }

            reset()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Tạo tài khoản thất bại!',
                text:
                    error?.response?.data?.message ||
                    'Đã xảy ra lỗi, vui lòng thử lại.',
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl"
        >
            <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
                Tạo tài khoản
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">
                        Họ tên
                    </label>
                    <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        {...register('name', {
                            required: 'Họ tên là bắt buộc',
                        })}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="hocvien@email.com"
                        {...register('email', {
                            required: 'Email là bắt buộc',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Email không hợp lệ',
                            },
                        })}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        placeholder="0357635003"
                        {...register('phone', { required: 'SĐT là bắt buộc' })}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        {...register('date_of_birth')}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Giới tính
                    </label>
                    <select
                        {...register('sex')}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">
                        Vai trò
                    </label>
                    <select
                        {...register('roles', {
                            required: 'Vui lòng chọn vai trò',
                        })}
                        defaultValue=""
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="" disabled>
                            -- Chọn vai trò --
                        </option>
                        {rolesOptions.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.roles && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.roles.message}
                        </p>
                    )}
                </div>

                <div className="col-span-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 transition duration-200"
                    >
                        {isSubmitting ? 'Đang tạo...' : 'Tạo tài khoản'}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}

export default CreateStudentForm
