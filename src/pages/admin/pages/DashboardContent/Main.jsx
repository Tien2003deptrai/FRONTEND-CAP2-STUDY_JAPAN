import React from 'react'
import { People, Book, Movie, Description } from '@mui/icons-material'
import { useAdminDashboard } from '@/hooks/useAdminDashboard'

const MainDash = () => {
    // Mock data for statistics
    const { data, isLoading } = useAdminDashboard()
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

    // Mock data for recent users
    const recentUsers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            level: 'N5',
            progress: 75,
            lastActive: '1 giờ trước',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            level: 'N4',
            progress: 45,
            lastActive: '2 giờ trước',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            level: 'N3',
            progress: 90,
            lastActive: '3 giờ trước',
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            level: 'N5',
            progress: 30,
            lastActive: '1 ngày trước',
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            level: 'N2',
            progress: 85,
            lastActive: '1 tuần trước',
        },
    ]

    // Mock data for recent content
    const recentContent = [
        {
            id: 1,
            title: 'Ngữ pháp N5 - Cấu trúc て Form',
            type: 'Bài học',
            date: '15/03/2025',
        },
        {
            id: 2,
            title: 'Kanji N4 - Tập 3',
            type: 'Bài học',
            date: '14/03/2025',
        },
        {
            id: 3,
            title: 'Luyện nghe JLPT N3',
            type: 'Video',
            date: '13/03/2025',
        },
        {
            id: 4,
            title: 'Đề thi thử N5 - Tháng 3',
            type: 'Kiểm tra',
            date: '12/03/2025',
        },
    ]

    if (isLoading) {
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

            {/* Two column layout */}
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

                {/* Recent content */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">
                            Nội dung mới nhất
                        </h3>
                    </div>
                    <div className="p-6">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-3">Tiêu đề</th>
                                    <th className="pb-3">Loại</th>
                                    <th className="pb-3">Ngày tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentContent.map((content) => (
                                    <tr
                                        key={content.id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="py-3 font-medium">
                                            {content.title}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${content.type === 'Bài học' ? 'bg-blue-100 text-blue-800' : content.type === 'Video' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}
                                            >
                                                {content.type}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-500">
                                            {content.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 text-center">
                            <button className="text-red-600 hover:text-red-800 font-medium">
                                Xem tất cả nội dung
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainDash
