import React, { useState } from 'react'

const ProfileUser = () => {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    avatar: '/api/placeholder/150/150',
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
      { id: 2, title: 'Siêng năng', description: 'Duy trì streak 7 ngày' },
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

  return (
    <div className="bg-pink-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header với màu đỏ tương tự login page */}
          <div className="bg-red-600 text-white p-6 flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <div className="text-red-600 text-2xl font-bold">日</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Study Japan</h1>
              <p>日本語を学ぼう!</p>
            </div>
            <div className="ml-auto">
              <button className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
                Tiếng Việt ▼
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar - Red Background */}
            <div className="bg-red-600 text-white p-8 md:w-1/3">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white mb-4"
                />
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <div className="flex items-center mb-4">
                  <span className="mr-1">🏆</span>
                  <span>{user.level}</span>
                </div>
                <button className="bg-white text-red-600 px-4 py-2 rounded-md w-full font-medium hover:bg-gray-100 mt-2">
                  Chỉnh sửa hồ sơ
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 border-b border-red-400 pb-2">
                  Thành tích của bạn
                </h3>
                <ul className="space-y-4">
                  {user.achievements.map((achievement) => (
                    <li key={achievement.id} className="flex items-start">
                      <span className="mr-2 text-xl">🏅</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-red-100">
                          {achievement.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content - White Background */}
            <div className="p-8 md:w-2/3">
              <h3 className="text-xl font-bold text-red-600 mb-6">
                Tổng quan học tập
              </h3>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center text-red-600 mb-1">
                    <span className="mr-2">⏱️</span>
                    <span className="font-medium">Thời gian học</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.totalHours} giờ
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center text-red-600 mb-1">
                    <span className="mr-2">📚</span>
                    <span className="font-medium">Bài học đã hoàn thành</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.completedLessons}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center text-red-600 mb-1">
                    <span className="mr-2">🔥</span>
                    <span className="font-medium">Streak hiện tại</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.streak} ngày
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center text-red-600 mb-1">
                    <span className="mr-2">📅</span>
                    <span className="font-medium">Ngày tham gia</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.joinedDate}
                  </p>
                </div>
              </div>

              {/* Current Course */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  Khóa học hiện tại
                </h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-lg font-semibold text-gray-900">
                    {user.currentCourse}
                  </p>
                  <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                    Tiếp tục học
                  </button>
                </div>
              </div>

              {/* Learning Progress */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  Tiến độ học tập
                </h3>
                <div className="space-y-4">
                  {user.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-red-50 p-4 rounded-lg border border-red-100"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">
                          {stat.category}
                        </span>
                        <span className="text-gray-700">
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

              {/* Suggested Next Steps */}
              <div>
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  Đề xuất học tập
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Ôn tập 50 Kanji N3 mới nhất</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Luyện nghe với giọng phát âm chuẩn người bản xứ</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Làm bài kiểm tra ngữ pháp N3 hàng tuần</span>
                  </li>
                </ul>
                <button className="mt-4 w-full px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">
                  Tiếp tục hành trình học tập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
