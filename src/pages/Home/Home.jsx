import CourseList from '@/components/course/courseList'
import axiosInstance from '@/network/httpRequest'
import useAuthStore from '@/store/useAuthStore'
import {
    Book as BookIcon,
    Event as CalendarIcon,
    Check as CheckIcon,
    ExpandMore as ChevronDownIcon,
    Description as FileTextIcon,
    Headphones as HeadphonesIcon,
    Chat as MessageSquareIcon,
    Group as UsersIcon,
} from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'

// Component FeatureCard
const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="text-red-600 mb-4">{icon}</div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}
// Main Component
export default function JapaneseLearningApp() {
    const { user } = useAuthStore()

    const fetchCourses = async () => {
        if (!user || !user?._id) {
            throw new Error('Không tìm thấy thông tin người dùng.')
        }

        const res = await axiosInstance.get('/course/enrolled')
        return res.data.data
    }

    const { data: lessons } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axiosInstance.get('/lesson/all/titles')
            return res.data.data
        },
    })
    console.log('lessons', lessons)

    const { data: courses } = useQuery({
        queryKey: ['studentCourses', user?._id],
        queryFn: fetchCourses,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })

    const jlptLevels = [
        { level: 'N5', description: 'Trình độ cơ bản', color: 'bg-green-500' },
        { level: 'N4', description: 'Trình độ sơ cấp', color: 'bg-red-500' },
        {
            level: 'N3',
            description: 'Trình độ trung cấp',
            color: 'bg-yellow-500',
        },
        {
            level: 'N2',
            description: 'Trình độ trung cao cấp',
            color: 'bg-orange-500',
        },
        { level: 'N1', description: 'Trình độ cao cấp', color: 'bg-red-600' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                        <div className="text-white mb-6 md:mb-0 md:max-w-lg">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Học tiếng Nhật hiệu quả với Nihongo
                            </h1>
                            <p className="text-lg opacity-90 mb-6">
                                Tiếp cận phương pháp học chuẩn JLPT từ cơ bản
                                đến nâng cao với hơn 10,000 bài học và bài tập
                                thực hành.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-white text-red-600  px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors">
                                    Bắt đầu học ngay
                                </button>
                                <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                                    Khám phá khóa học
                                </button>
                            </div>
                        </div>
                        <div className="md:w-2/5">
                            <img
                                src="https://wallpapercat.com/w/full/3/1/7/119871-3840x2160-desktop-4k-japan-wallpaper-image.jpg"
                                alt="Học tiếng Nhật hiệu quả"
                                className="rounded-lg w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">
                        Tại sao chọn Nihongo?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<BookIcon />}
                            title="Giáo trình chuẩn JLPT"
                            description="Nội dung học được biên soạn theo chuẩn kỳ thi JLPT mới nhất"
                        />
                        <FeatureCard
                            icon={<HeadphonesIcon />}
                            title="Luyện nghe, phát âm"
                            description="Rèn luyện kỹ năng nghe và phát âm chuẩn với giáo viên bản xứ"
                        />
                        <FeatureCard
                            icon={<MessageSquareIcon />}
                            title="Luyện nói thực tế"
                            description="Thực hành giao tiếp tiếng Nhật qua các tình huống thực tế hàng ngày"
                        />
                        <FeatureCard
                            icon={<FileTextIcon />}
                            title="Ôn tập và kiểm tra"
                            description="Hệ thống bài tập và đề thi thử giúp đánh giá trình độ chính xác"
                        />
                    </div>
                </section>

                {/* JLPT Levels */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Các cấp độ JLPT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {jlptLevels.map((level) => (
                            <div
                                key={level.level}
                                className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div
                                    className={`${level.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                                >
                                    <span className="text-white text-2xl font-bold">
                                        {level.level}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">
                                    {level.level}
                                </h3>
                                <p className="text-gray-600">
                                    {level.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Courses */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Khóa học của tôi</h2>
                        <button className="text-red-600 font-medium flex items-center hover:underline">
                            Xem tất cả{' '}
                            <ChevronDownIcon
                                className="ml-1"
                                fontSize="small"
                            />
                        </button>
                    </div>
                    <CourseList courses={courses} />
                </section>

                {/* Popular Lessons */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Bài học phổ biến</h2>
                        <button className="text-red-600 font-medium flex items-center hover:underline">
                            Xem tất cả{' '}
                            <ChevronDownIcon
                                className="ml-1"
                                fontSize="small"
                            />
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {Array.isArray(lessons) &&
                            lessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className={`p-4 flex items-center justify-between ${index !== lessons.length - 1 ? 'border-b' : ''}`}
                                >
                                    <div className="flex items-center">
                                        <div className="bg-red-100 text-red-800 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                {lesson.lesson_title}
                                            </h3>
                                            <div className="text-sm text-gray-500">
                                                {/* {lesson.views.toLocaleString()} lượt */}
                                                1 xem · {lesson.duration}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Học ngay
                                    </button>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Study Path */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">
                        Lộ trình học tiếng Nhật
                    </h2>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="w-full md:w-2/3">
                                <h3 className="text-xl font-bold mb-4">
                                    Lộ trình từ người mới bắt đầu đến N2
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    Theo lộ trình học được thiết kế khoa học,
                                    bạn sẽ tiến bộ từng bước vững chắc từ trình
                                    độ cơ bản N5 đến trình độ khá N2 trong vòng
                                    18-24 tháng với thời gian học linh hoạt.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-2 rounded-full mr-4">
                                            <CheckIcon className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Bước 1: Làm quen với chữ cái và
                                                phát âm (1-2 tháng)
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                Hiragana, Katakana và phát âm cơ
                                                bản
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-2 rounded-full mr-4">
                                            <CheckIcon className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Bước 2: Ngữ pháp và từ vựng N5
                                                (3-4 tháng)
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                Cấu trúc câu cơ bản và 800 từ
                                                vựng thông dụng
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-2 rounded-full mr-4">
                                            <CheckIcon className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Bước 3: Nâng cao lên N4 và N3
                                                (6-8 tháng)
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                Mở rộng ngữ pháp, từ vựng và kỹ
                                                năng đọc hiểu
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-2 rounded-full mr-4">
                                            <CheckIcon className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Bước 4: Chinh phục N2 (8-10
                                                tháng)
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                Ngữ pháp phức tạp, đọc hiểu và
                                                kỹ năng nghe nâng cao
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                    Xem chi tiết lộ trình
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 bg-red-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-4 text-red-800">
                                    Thời gian ôn thi JLPT
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <CalendarIcon className="text-red-600 mr-3" />
                                        <div>
                                            <p className="font-medium">
                                                Kỳ thi tháng 7/2025
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Đăng ký: 15/03 - 15/04/2025
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarIcon className="text-red-600 mr-3" />
                                        <div>
                                            <p className="font-medium">
                                                Kỳ thi tháng 12/2025
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Đăng ký: 15/08 - 15/09/2025
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-red-200 my-4"></div>
                                    <div>
                                        <h4 className="font-medium text-red-800 mb-2">
                                            Khóa ôn thi chuyên sâu
                                        </h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center">
                                                <CheckIcon
                                                    className="text-green-600 mr-2"
                                                    fontSize="small"
                                                />
                                                <span>
                                                    Ôn thi N5-N4: 2 tháng
                                                </span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckIcon
                                                    className="text-green-600 mr-2"
                                                    fontSize="small"
                                                />
                                                <span>Ôn thi N3: 3 tháng</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckIcon
                                                    className="text-green-600 mr-2"
                                                    fontSize="small"
                                                />
                                                <span>Ôn thi N2: 4 tháng</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckIcon
                                                    className="text-green-600 mr-2"
                                                    fontSize="small"
                                                />
                                                <span>Ôn thi N1: 6 tháng</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Learning Community */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0 md:w-2/3">
                                <h2 className="text-2xl font-bold mb-3">
                                    Tham gia cộng đồng học tiếng Nhật
                                </h2>
                                <p className="mb-6 opacity-90">
                                    Kết nối với hơn 50,000 người học tiếng Nhật
                                    khác trên khắp Việt Nam, cùng nhau học tập,
                                    trao đổi kinh nghiệm và kết bạn với người
                                    bản xứ.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center">
                                        <UsersIcon className="mr-2" />
                                        <span className="font-medium">
                                            50,000+ thành viên
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquareIcon className="mr-2" />
                                        <span className="font-medium">
                                            1,200+ chủ đề thảo luận
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                                    Tham gia ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
