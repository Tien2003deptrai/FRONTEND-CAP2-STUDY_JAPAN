import React from 'react'
import { People, Book, Movie, Description } from '@mui/icons-material'
import { useAdminDashboard, useRecentStudents } from '@/hooks/useAdminDashboard'
import { useCourses } from '@/hooks/useCourses'
import useAuthStore from '@/store/useAuthStore'
import axiosInstance from '@/network/httpRequest'
import { useQuery } from '@tanstack/react-query'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1']

const MainDash = () => {
    const userId = useAuthStore((state) => state.user?._id)
    const { data, isLoading } = useAdminDashboard()
    const { data: recentUsers, isLoading: isLoadingUserRecent } =
        useRecentStudents()
    const { data: courses = [], isLoading: isLoadingCourses } =
        useCourses(userId)

    const { data: studentGrowth = [], isLoading: loadingGrowth } = useQuery({
        queryKey: ['chart-students-growth'],
        queryFn: async () => {
            const res = await axiosInstance.get('/chart/students-growth')
            return res.data.data.map((item) => ({
                month: item._id,
                count: item.count,
            }))
        },
    })

    const { data: courseRegistrations = [] } = useQuery({
        queryKey: ['chart-course-registrations'],
        queryFn: async () => {
            const res = await axiosInstance.get('/chart/course-registrations')
            return res.data.data.map((item) => ({
                month: item._id,
                count: item.count,
            }))
        },
    })

    const { data: learningLevels = [] } = useQuery({
        queryKey: ['chart-learning-levels'],
        queryFn: async () => {
            const res = await axiosInstance.get('/chart/learning-levels')
            return res.data.data.map((item) => ({
                name: item._id,
                value: item.count,
            }))
        },
    })

    const { data: gameActivity = [] } = useQuery({
        queryKey: ['chart-game-activity'],
        queryFn: async () => {
            const res = await axiosInstance.get('/chart/game-activity')
            return res.data.data.map((item) => ({
                game: item._id,
                avgScore: item.avgScore,
            }))
        },
    })

    const stats = [
        {
            title: 'Tổng số giáo viên',
            value: data?.totalTeachers || 0,
            change: '',
            icon: <People style={{ fontSize: 24 }} />,
        },
        {
            title: 'Tổng số học viên',
            value: data?.totalStudents || 0,
            change: '',
            icon: <Book style={{ fontSize: 24 }} />,
        },
        {
            title: 'Giáo viên đang hoạt động',
            value: data?.activeTeachers || 0,
            change: '',
            icon: <Movie style={{ fontSize: 24 }} />,
        },
        {
            title: 'Học viên đang hoạt động',
            value: data?.activeStudents || 0,
            change: '',
            icon: <Description style={{ fontSize: 24 }} />,
        },
    ]

    if (isLoading || isLoadingUserRecent || isLoadingCourses || loadingGrowth) {
        return (
            <div className="p-6 text-center text-gray-500">
                Đang tải dữ liệu...
            </div>
        )
    }

    return (
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Tổng quan</h2>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500">{stat.title}</h3>
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="flex items-baseline">
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <span className="ml-2 text-green-500 text-sm">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Tăng trưởng học viên
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={studentGrowth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#ef4444"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Đăng ký khoá học
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={courseRegistrations}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Tỷ lệ cấp độ học viên
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={learningLevels}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {learningLevels.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Extra chart - Game activity */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">
                    Điểm trung bình theo trò chơi
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={gameActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="game" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgScore" fill="#f97316" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Two column layout for users and courses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent users */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">
                            Học viên gần đây
                        </h3>
                    </div>
                    <div className="p-6">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-3">Học viên</th>
                                    <th className="pb-3">Cấp độ</th>
                                    <th className="pb-3">Tiến độ</th>
                                    <th className="pb-3">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="py-3 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="py-3">{user.level}</td>
                                        <td className="py-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-red-600 h-2.5 rounded-full"
                                                    style={{
                                                        width: `${user.progress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="py-3 text-gray-500 text-sm">
                                            {user.lastActive}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 text-center">
                            <button className="text-red-600 hover:text-red-800 font-medium">
                                Xem tất cả học viên
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent courses */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">
                            Khoá học gần đây
                        </h3>
                    </div>
                    <div className="p-6">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-3">Tên khoá học</th>
                                    <th className="pb-3">Trình độ</th>
                                    <th className="pb-3">Số học viên</th>
                                    <th className="pb-3">Ngày tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr
                                        key={course._id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="py-3 font-medium">
                                            {course.name}
                                        </td>
                                        <td className="py-3">{course.type}</td>
                                        <td className="py-3">
                                            {course.stu_num}
                                        </td>
                                        <td className="py-3 text-gray-500 text-sm">
                                            {new Date(
                                                course.createdAt
                                            ).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 text-center">
                            <button className="text-red-600 hover:text-red-800 font-medium">
                                Xem tất cả khoá học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainDash
