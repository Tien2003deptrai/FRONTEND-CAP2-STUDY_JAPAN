import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '@/network/httpRequest'
import { uploadImage } from '@/util/firebase/firebaseUtils'
import EmailIcon from '@mui/icons-material/Email'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { LinearProgress } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const roadmap = [
    { level: 'N5 Cơ bản', status: 'done', progress: 100 },
    { level: 'N4 Giao tiếp', status: 'doing', progress: 60 },
    { level: 'N3 Ngữ pháp nâng cao', status: 'locked', progress: 0 },
]

const weeklyStats = [
    { day: 'T2', hours: 1 },
    { day: 'T3', hours: 2 },
    { day: 'T4', hours: 0.5 },
    { day: 'T5', hours: 3 },
    { day: 'T6', hours: 0 },
    { day: 'T7', hours: 2 },
    { day: 'CN', hours: 1.5 },
]

const recentLessons = [
    { name: 'Bài 12: Thể khả năng', date: '24/04/2025' },
    { name: 'Bài 11: Động từ nhóm 2', date: '22/04/2025' },
    { name: 'Bài 10: Tính từ đuôi い', date: '20/04/2025' },
]

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        avatar: '',
        activatedDate: '',
        streak: 0,
        totalHours: 0,
        completedLessons: 0,
        stats: [
            { category: 'Từ vựng', learned: 620, total: 1500 },
            { category: 'Ngữ pháp', learned: 45, total: 100 },
            { category: 'Kanji', learned: 250, total: 1000 },
        ],
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosInstance.get('/user/profile')
                if (data.success) {
                    setProfile((prev) => ({
                        ...prev,
                        fullName: data.data.name,
                        email: data.data.email,
                        phoneNumber: data.data.phone,
                        dateOfBirth:
                            data.data.student_profile?.dateOfBirth || '',
                        avatar: data.data.avatar || '',
                        activatedDate: new Date(
                            data.data.createdAt
                        ).toLocaleDateString(),
                        streak: 28,
                        totalHours: 64,
                        completedLessons: 42,
                    }))
                }
            } catch (error) {
                console.error('Lỗi khi tải hồ sơ:', error)
            }
        }
        fetchProfile()
    }, [])

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        try {
            const url = await uploadImage(file, (progress) => {
                console.log('Uploading:', progress + '%')
            })
            const res = await axiosInstance.put('/user/profile', {
                avatar: url,
            })
            if (res.data.success) {
                toast.success('Cập nhật ảnh đại diện thành công!')
                setProfile((prev) => ({ ...prev, avatar: url }))
            } else {
                toast.error('Thất bại khi cập nhật avatar.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Upload thất bại.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Sidebar Card */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <label className="relative cursor-pointer group">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:scale-105 transition-transform"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-400 shadow-md">
                                <AccountCircleIcon
                                    style={{ fontSize: 50, color: '#fff' }}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>
                    <h2 className="mt-4 text-lg font-bold">
                        {profile.fullName || 'Người học tiếng Nhật'}
                    </h2>
                    <p className="text-sm text-gray-600">
                        Thành viên từ {profile.activatedDate}
                    </p>
                    <div className="flex gap-2 mt-4">
                        <button className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700 text-sm">
                            Theo dõi
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded shadow hover:bg-blue-50 text-sm">
                            Nhắn tin
                        </button>
                    </div>
                </div>

                {/* Thông tin cá nhân */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700">
                        Thông tin cá nhân
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                            <EmailIcon fontSize="small" />
                            <span>{profile.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <PhoneAndroidIcon fontSize="small" />
                            <span>
                                {profile.phoneNumber || 'Chưa cập nhật'}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CalendarTodayIcon fontSize="small" />
                            <span>
                                {profile.dateOfBirth ||
                                    'Chưa cập nhật ngày sinh'}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircleIcon fontSize="small" />
                            <span>
                                Đã hoàn thành {profile.completedLessons} bài học
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <TrendingUpIcon fontSize="small" />
                            <span>Chuỗi ngày học: {profile.streak} ngày</span>
                        </li>
                    </ul>
                </div>

                {/* Tiến độ học */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700">
                        Tiến độ học
                    </h3>
                    {profile.stats.map((stat, i) => {
                        const percent = Math.round(
                            (stat.learned / stat.total) * 100
                        )
                        return (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>{stat.category}</span>
                                    <span className="text-gray-500">
                                        {stat.learned}/{stat.total}
                                    </span>
                                </div>
                                <LinearProgress
                                    variant="determinate"
                                    value={percent}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#eee',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#3b82f6',
                                        },
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Phần dưới mở rộng */}
            <div className="max-w-6xl mx-auto mt-12 space-y-10">
                {/* Lộ trình học tập */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Lộ trình học tập
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                        {roadmap.map((step, i) => (
                            <div
                                key={i}
                                className="flex-1 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-700">
                                        {step.level}
                                    </h4>
                                    {step.status === 'done' && (
                                        <CheckCircleIcon className="text-green-500" />
                                    )}
                                    {step.status === 'doing' && (
                                        <PlayArrowIcon className="text-yellow-500" />
                                    )}
                                    {step.status === 'locked' && (
                                        <LockIcon className="text-gray-400" />
                                    )}
                                </div>
                                <LinearProgress
                                    variant="determinate"
                                    value={step.progress}
                                    sx={{ height: 8, borderRadius: 5 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thống kê thời gian học */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Thống kê thời gian học theo tuần
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={weeklyStats}>
                            <XAxis dataKey="day" />
                            <YAxis unit="h" />
                            <Tooltip />
                            <Bar
                                dataKey="hours"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Lịch sử học */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Lịch sử bài học gần đây
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {recentLessons.map((lesson, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <span>{lesson.name}</span>
                                <span className="text-gray-500 text-xs">
                                    {lesson.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                        Sẵn sàng chinh phục bài học tiếp theo?
                    </h3>
                    <button className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
                        Tiếp tục học
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
