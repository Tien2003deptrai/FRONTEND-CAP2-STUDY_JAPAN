// File: src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'duongvantientu@gmail.com',
        phoneNumber: '0123456789',
        dateOfBirth: '1995-08-15',
        gender: 'Nam',
        avatar: null,
        activatedDate: '09/04/2025',
        level: 'Trung cấp N3',
        streak: 28,
        totalHours: 64,
        joinedDate: '15/10/2024',
        completedLessons: 42,
        currentCourse: 'Ngữ pháp N3 nâng cao',
        achievements: [
            {
                id: 1,
                title: 'Mới bắt đầu',
                description: 'Hoàn thành 10 bài học đầu tiên',
            },
            {
                id: 2,
                title: 'Siêng năng',
                description: 'Duy trì streak 7 ngày',
            },
            {
                id: 3,
                title: 'Học sinh xuất sắc',
                description: 'Đạt điểm tuyệt đối trong 5 bài kiểm tra',
            },
        ],
        stats: [
            { category: 'Từ vựng', learned: 620, total: 1500 },
            { category: 'Ngữ pháp', learned: 45, total: 100 },
            { category: 'Kanji', learned: 250, total: 1000 },
        ],
    })

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfile({ ...profile, avatar: URL.createObjectURL(file) })
        }
    }

    return (
        <div className=" min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="bg-white md:w-1/3 border-r p-8 flex flex-col items-center">
                        <label className="cursor-pointer relative">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt="avatar"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-red-400"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center border-2 border-red-400">
                                    <AccountCircleIcon
                                        style={{
                                            fontSize: 40,
                                            color: '#facc15',
                                        }}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                        <span className="mt-2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Free Account
                        </span>
                        <p className="mt-4 text-sm text-gray-700">
                            📧 {profile.email}
                        </p>
                        <p className="text-sm text-gray-700">
                            📅 {profile.activatedDate}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="p-8 flex-1">
                        <h2 className="text-xl font-bold text-red-600 mb-6">
                            Tổng quan học tập
                        </h2>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-sm text-red-600 mb-1">
                                    ⏱️ Thời gian học
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {profile.totalHours} giờ
                                </p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-sm text-red-600 mb-1">
                                    📚 Bài học đã hoàn thành
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {profile.completedLessons}
                                </p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-sm text-red-600 mb-1">
                                    🔥 Streak hiện tại
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {profile.streak} ngày
                                </p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-sm text-red-600 mb-1">
                                    📅 Ngày tham gia
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {profile.joinedDate}
                                </p>
                            </div>
                        </div>

                        {/* Current Course */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-red-600 mb-2">
                                Khoá học hiện tại
                            </h3>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-md font-medium text-gray-800">
                                    {profile.currentCourse}
                                </p>
                                <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                                    Tiếp tục học
                                </button>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-red-600 mb-2">
                                Tiến độ học tập
                            </h3>
                            <div className="space-y-4">
                                {profile.stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-red-50 p-4 rounded-lg border border-red-100"
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">
                                                {stat.category}
                                            </span>
                                            <span className="text-sm text-gray-700">
                                                {stat.learned}/{stat.total}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 bg-red-600 rounded-full"
                                                style={{
                                                    width: `${(stat.learned / stat.total) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div>
                            <h3 className="text-lg font-semibold text-red-600 mb-2">
                                Đề xuất học tập
                            </h3>
                            <ul className="space-y-2 mb-4">
                                <li className="text-sm">
                                    • Ôn tập 50 Kanji N3 mới nhất
                                </li>
                                <li className="text-sm">
                                    • Luyện nghe với giọng chuẩn người bản xứ
                                </li>
                                <li className="text-sm">
                                    • Làm bài kiểm tra ngữ pháp N3 hàng tuần
                                </li>
                            </ul>
                            <button className="w-full px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">
                                Tiếp tục hành trình học tập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
