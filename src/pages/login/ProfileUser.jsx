import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import axiosInstance from '@/network/httpRequest'
import { uploadImage } from '@/util/firebase/firebaseUtils'
import { toast } from 'react-toastify'

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        avatar: '',
        activatedDate: '',
        level: '',
        streak: 0,
        totalHours: 0,
        joinedDate: '',
        completedLessons: 0,
        currentCourse: '',
        achievements: [],
        stats: [],
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosInstance.get('/user/profile')
                if (data.success) {
                    setProfile({
                        fullName: data.data.name,
                        email: data.data.email,
                        phoneNumber: data.data.phone,
                        dateOfBirth:
                            data.data.student_profile?.dateOfBirth || '',
                        gender: 'Nam', // giả định giới tính là Nam nếu không có dữ liệu
                        avatar: data.data.avatar || '',
                        activatedDate: new Date(
                            data.data.createdAt
                        ).toLocaleDateString(),
                        level:
                            data.data.student_profile?.learning_level ||
                            'Chưa xác định',
                        streak: 28,
                        totalHours: 64,
                        joinedDate: '15/10/2024',
                        completedLessons: 42,
                        currentCourse: 'Ngữ pháp N3 nâng cao',
                        achievements: [
                            {
                                id: 1,
                                title: 'Mới bắt đầu',
                                description:
                                    'Hoàn thành 10 bài học đầu tiên, chứng tỏ sự kiên trì và quyết tâm học tiếng Nhật trong 2 tuần đầu tiên.',
                            },
                            {
                                id: 2,
                                title: 'Siêng năng',
                                description:
                                    'Duy trì streak 7 ngày liên tiếp, cho thấy khả năng duy trì động lực và cam kết học tập mỗi ngày.',
                            },
                            {
                                id: 3,
                                title: 'Học sinh xuất sắc',
                                description:
                                    'Đạt điểm tuyệt đối trong 5 bài kiểm tra quan trọng, thể hiện sự hiểu biết vững vàng và kỹ năng giải quyết vấn đề trong tiếng Nhật.',
                            },
                            {
                                id: 4,
                                title: 'Thành thạo Kanji',
                                description:
                                    'Đã học và ghi nhớ 200 chữ Kanji trong vòng 1 tháng, giúp cải thiện khả năng đọc hiểu văn bản tiếng Nhật.',
                            },
                            {
                                id: 5,
                                title: 'Kiên trì',
                                description:
                                    'Hoàn thành hơn 50 bài học trong vòng 2 tháng, dù có nhiều thử thách và bận rộn với các công việc khác.',
                            },
                            {
                                id: 6,
                                title: 'Thành tích xuất sắc',
                                description:
                                    'Đạt mức học từ vựng lên đến 800 từ trong 3 tháng, giúp tiến bộ nhanh chóng trong việc giao tiếp bằng tiếng Nhật.',
                            },
                            {
                                id: 7,
                                title: 'Phát triển kỹ năng nghe',
                                description:
                                    'Hoàn thành 20 bài kiểm tra nghe hiểu với điểm trung bình 90%, giúp cải thiện kỹ năng nghe tiếng Nhật hiệu quả.',
                            },
                            {
                                id: 8,
                                title: 'Đạt chuẩn N3',
                                description:
                                    'Vượt qua kỳ thi N3 với điểm số xuất sắc, đạt chứng chỉ N3 trong vòng 6 tháng học tập kiên trì.',
                            },
                            {
                                id: 9,
                                title: 'Luyện tập đều đặn',
                                description:
                                    'Hoàn thành 10 buổi học nhóm cùng các bạn, chia sẻ kiến thức và hỗ trợ nhau học tiếng Nhật hiệu quả.',
                            },
                            {
                                id: 10,
                                title: 'Chuyên gia ngữ pháp',
                                description:
                                    'Đạt điểm cao trong tất cả các bài kiểm tra ngữ pháp, chứng minh sự thành thạo trong việc áp dụng các quy tắc ngữ pháp trong tiếng Nhật.',
                            },
                        ],
                        stats: [
                            { category: 'Từ vựng', learned: 620, total: 1500 },
                            { category: 'Ngữ pháp', learned: 45, total: 100 },
                            { category: 'Kanji', learned: 250, total: 1000 },
                        ],
                    })
                }
            } catch (error) {
                console.error('Lỗi khi tải hồ sơ:', error)
            }
        }
        fetchProfile()
    }, [])

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        try {
            // Optional: có thể thêm loading/progress UI ở đây
            const url = await uploadImage(file, (progress) => {
                console.log('Upload progress:', progress + '%')
            })

            // Gửi URL ảnh avatar mới lên backend
            const response = await axiosInstance.put('/user/profile', {
                avatar: url,
            })

            if (response.data.success) {
                toast.success('Cập nhật ảnh đại diện thành công!!')
                // Cập nhật lại UI nếu cần:
                setProfile((prev) => ({ ...prev, avatar: url }))
            } else {
                toast.error('Cập nhật thất bại, thử lại sau!')
            }
        } catch (error) {
            console.error('Lỗi upload avatar:', error)
            toast.error('Upload thất bại: ' + error.message)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="bg-white md:w-1/3 border-r p-8 flex flex-col items-center transition-all ease-in-out duration-300 hover:scale-105 hover:shadow-2xl">
                        <label className="cursor-pointer relative">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt="avatar"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-600 transition-transform transform hover:scale-110"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center border-4 border-yellow-400 transition-transform transform hover:scale-110">
                                    <AccountCircleIcon
                                        style={{
                                            fontSize: 50,
                                            color: '#fff',
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
                        <span className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {profile.level}
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
                        <h2 className="text-xl font-bold text-blue-600 mb-6">
                            Tổng quan học tập
                        </h2>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-pink-400 to-yellow-500 p-4 rounded-lg border border-pink-300 transition-all hover:scale-105 transform">
                                <p className="text-sm text-white mb-1">
                                    ⏱️ Thời gian học
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {profile.totalHours} giờ
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg border border-green-300 transition-all hover:scale-105 transform">
                                <p className="text-sm text-white mb-1">
                                    🎯 Hoàn thành bài học
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {profile.completedLessons} bài
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-400 to-purple-600 p-4 rounded-lg border border-indigo-300 transition-all hover:scale-105 transform">
                                <p className="text-sm text-white mb-1">
                                    🏆 Thành tích
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {profile.achievements.length} thành tích
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-lg border border-yellow-300 transition-all hover:scale-105 transform">
                                <p className="text-sm text-white mb-1">
                                    📈 Streak
                                </p>
                                <p className="text-xl font-bold text-white">
                                    {profile.streak} ngày
                                </p>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Thành tích
                            </h3>
                            <ul>
                                {profile.achievements.map((achievement) => (
                                    <li
                                        key={achievement.id}
                                        className="mb-2 text-sm text-gray-800 hover:text-blue-500 transition-all duration-200"
                                    >
                                        <strong>{achievement.title}:</strong>{' '}
                                        {achievement.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
