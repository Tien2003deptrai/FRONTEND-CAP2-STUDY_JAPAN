import React, { useState } from 'react'
import {
    Settings,
    Language,
    School,
    Notifications,
    Lock,
    Person,
    Palette,
    Save,
} from '@mui/icons-material'

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general')
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'Study Japan',
        siteDescription: 'Learn Japanese Online',
        language: 'en',
        maxStudents: 30,
        emailNotifications: true,
        privacyMode: false,
        theme: 'light',
    })

    const handleGeneralChange = (e) => {
        const { name, value, type, checked } = e.target
        setGeneralSettings({
            ...generalSettings,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex items-center mb-10">
                <div className="bg-red-100 p-4 rounded-lg">
                    <Settings
                        className="text-red-600"
                        style={{ fontSize: 32 }}
                    />
                </div>
                <div className="ml-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Cài đặt hệ thống
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">
                        Quản lý và tùy chỉnh các cài đặt của hệ thống
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Sidebar */}
                <div className="w-full md:w-80 bg-white rounded-xl shadow-sm p-6">
                    <ul className="space-y-3">
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'general'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('general')}
                        >
                            <Settings
                                className="mr-4"
                                style={{ fontSize: 24 }}
                            />
                            <span className="font-medium text-lg">
                                Cài đặt chung
                            </span>
                        </li>
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'appearance'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <Palette
                                className="mr-4"
                                style={{ fontSize: 24 }}
                            />
                            <span className="font-medium text-lg">
                                Giao diện
                            </span>
                        </li>
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'notifications'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Notifications
                                className="mr-4"
                                style={{ fontSize: 24 }}
                            />
                            <span className="font-medium text-lg">
                                Thông báo
                            </span>
                        </li>
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'courses'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('courses')}
                        >
                            <School className="mr-4" style={{ fontSize: 24 }} />
                            <span className="font-medium text-lg">
                                Khóa học
                            </span>
                        </li>
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'security'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock className="mr-4" style={{ fontSize: 24 }} />
                            <span className="font-medium text-lg">Bảo mật</span>
                        </li>
                        <li
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeTab === 'account'
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('account')}
                        >
                            <Person className="mr-4" style={{ fontSize: 24 }} />
                            <span className="font-medium text-lg">
                                Tài khoản
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white rounded-xl shadow-sm p-10">
                    {activeTab === 'general' && (
                        <div>
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        Cài đặt chung
                                    </h3>
                                    <p className="text-gray-500 mt-2 text-lg">
                                        Cấu hình các thông số cơ bản của hệ
                                        thống
                                    </p>
                                </div>
                                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 text-lg">
                                    <Save
                                        className="mr-2"
                                        style={{ fontSize: 24 }}
                                    />
                                    Lưu cài đặt
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div>
                                        <label className="block mb-3 text-base font-medium text-gray-700">
                                            Tên trang web
                                        </label>
                                        <input
                                            type="text"
                                            name="siteName"
                                            value={generalSettings.siteName}
                                            onChange={handleGeneralChange}
                                            className="w-full p-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập tên trang web"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-3 text-base font-medium text-gray-700">
                                            Mô tả trang web
                                        </label>
                                        <textarea
                                            name="siteDescription"
                                            value={
                                                generalSettings.siteDescription
                                            }
                                            onChange={handleGeneralChange}
                                            rows="4"
                                            className="w-full p-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập mô tả trang web"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-3 text-base font-medium text-gray-700">
                                            Ngôn ngữ mặc định
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="language"
                                                value={generalSettings.language}
                                                onChange={handleGeneralChange}
                                                className="w-full p-4 text-lg border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="en">
                                                    English
                                                </option>
                                                <option value="ja">
                                                    Japanese
                                                </option>
                                                <option value="vi">
                                                    Vietnamese
                                                </option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                <Language
                                                    className="text-gray-400"
                                                    style={{ fontSize: 24 }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-3 text-base font-medium text-gray-700">
                                            Số học viên tối đa mỗi lớp
                                        </label>
                                        <input
                                            type="number"
                                            name="maxStudents"
                                            value={generalSettings.maxStudents}
                                            onChange={handleGeneralChange}
                                            className="w-full p-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập số học viên tối đa"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="bg-red-100 p-3 rounded-lg mr-4">
                                                    <Notifications
                                                        className="text-red-600"
                                                        style={{ fontSize: 24 }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-lg text-gray-800">
                                                        Thông báo qua email
                                                    </h4>
                                                    <p className="text-base text-gray-500 mt-2">
                                                        Nhận thông báo về học
                                                        viên, khóa học mới
                                                    </p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="emailNotifications"
                                                    checked={
                                                        generalSettings.emailNotifications
                                                    }
                                                    onChange={
                                                        handleGeneralChange
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="bg-red-100 p-3 rounded-lg mr-4">
                                                    <Lock
                                                        className="text-red-600"
                                                        style={{ fontSize: 24 }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-lg text-gray-800">
                                                        Chế độ bảo trì
                                                    </h4>
                                                    <p className="text-base text-gray-500 mt-2">
                                                        Chỉ quản trị viên có thể
                                                        truy cập trang web
                                                    </p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="privacyMode"
                                                    checked={
                                                        generalSettings.privacyMode
                                                    }
                                                    onChange={
                                                        handleGeneralChange
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
                                Cài đặt giao diện
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Chủ đề
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div
                                            className={`border p-4 rounded-lg text-center cursor-pointer ${generalSettings.theme === 'light' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() =>
                                                setGeneralSettings({
                                                    ...generalSettings,
                                                    theme: 'light',
                                                })
                                            }
                                        >
                                            <div className="w-full h-16 mb-2 bg-white border rounded-md"></div>
                                            <span>Sáng</span>
                                        </div>
                                        <div
                                            className={`border p-4 rounded-lg text-center cursor-pointer ${generalSettings.theme === 'dark' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() =>
                                                setGeneralSettings({
                                                    ...generalSettings,
                                                    theme: 'dark',
                                                })
                                            }
                                        >
                                            <div className="w-full h-16 mb-2 bg-gray-800 border rounded-md"></div>
                                            <span>Tối</span>
                                        </div>
                                        <div
                                            className={`border p-4 rounded-lg text-center cursor-pointer ${generalSettings.theme === 'system' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() =>
                                                setGeneralSettings({
                                                    ...generalSettings,
                                                    theme: 'system',
                                                })
                                            }
                                        >
                                            <div className="w-full h-16 mb-2 bg-gradient-to-r from-white to-gray-800 border rounded-md"></div>
                                            <span>Hệ thống</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
                                Cài đặt thông báo
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Thông báo học viên mới
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Nhận thông báo khi có học viên đăng
                                            ký mới
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Thông báo bài tập mới
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Nhận thông báo khi có bài tập mới
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Thông báo hoạt động
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Nhận thông báo khi có hoạt động từ
                                            học viên
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
                                Cài đặt khóa học
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Thời gian giới hạn bài tập (phút)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="60"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Số lần làm lại bài tập tối đa
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="3"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Cho phép xem đáp án
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Học viên có thể xem đáp án sau khi
                                            hoàn thành bài tập
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
                                Cài đặt bảo mật
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Xác thực hai yếu tố
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Tăng cường bảo mật bằng cách xác
                                            thực qua email
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Thời gian hết hạn phiên đăng nhập (phút)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="120"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <div>
                                        <h4 className="font-medium">
                                            Ghi nhớ lịch sử đăng nhập
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Lưu lịch sử đăng nhập của người dùng
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
                                Cài đặt tài khoản
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="admin@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Mật khẩu hiện tại
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Mật khẩu mới
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Xác nhận mật khẩu mới
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
