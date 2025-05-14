# Japanese Learning Center Platform

## 📚 Giới thiệu

Japanese Learning Center là nền tảng học tiếng Nhật trực tuyến với hệ thống quản lý khóa học, bài học, và công cụ học tập tương tác. Dự án được thiết kế để cung cấp trải nghiệm học tập toàn diện cho người học tiếng Nhật ở mọi cấp độ.

### 🎯 Mục tiêu

- Cung cấp nền tảng học tiếng Nhật trực tuyến chất lượng cao
- Tạo môi trường học tập tương tác và thân thiện
- Hỗ trợ người học theo dõi tiến độ và đánh giá kết quả
- Tạo điều kiện cho giáo viên quản lý nội dung giảng dạy hiệu quả
- Xây dựng cộng đồng học tiếng Nhật sôi động
- Cung cấp tài liệu học tập chất lượng và có hệ thống

### 👥 Đối tượng sử dụng

- Học viên học tiếng Nhật từ mọi cấp độ (N5-N1)
- Giáo viên tiếng Nhật muốn tạo nội dung giảng dạy
- Quản trị viên hệ thống
- Các trung tâm đào tạo tiếng Nhật

## ✨ Tính năng chính

### 👨‍🎓 Cho học viên

- Hệ thống khóa học đa dạng theo cấp độ JLPT
- Bài học tương tác với nội dung phong phú
- Hệ thống flashcard học từ vựng thông minh
- Bài kiểm tra và đánh giá tiến độ tự động
- Học Kanji và ngữ pháp có hệ thống
- Theo dõi tiến độ học tập
- Tương tác với giáo viên và học viên khác
- Lưu trữ lịch sử học tập
- Tùy chỉnh lộ trình học tập

### 👨‍🏫 Cho giáo viên

- Quản lý khóa học và bài học
- Tạo và chỉnh sửa nội dung giảng dạy
- Theo dõi tiến độ học viên
- Quản lý bài kiểm tra và đánh giá
- Tạo bài tập và bài kiểm tra
- Phân tích kết quả học tập
- Tương tác với học viên
- Quản lý lịch giảng dạy
- Xuất báo cáo và thống kê

### 👨‍💼 Cho quản trị viên

- Quản lý người dùng và phân quyền
- Giám sát hoạt động hệ thống
- Quản lý nội dung toàn diện
- Thống kê và báo cáo
- Quản lý thanh toán và đăng ký
- Cấu hình hệ thống
- Quản lý thông báo
- Backup và khôi phục dữ liệu

## 🛠️ Công nghệ sử dụng

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- RESTful API
- Socket.IO cho real-time features
- Redis cho caching
- AWS S3 cho lưu trữ file
- SendGrid cho email service

### Frontend

- React.js với TypeScript
- Redux cho state management
- Material-UI cho UI components
- Modern UI/UX Design
- Responsive Design
- Progressive Web App (PWA)
- Chart.js cho biểu đồ
- React Query cho data fetching

### DevOps & Tools

- Docker & Docker Compose
- GitHub Actions cho CI/CD
- Jest cho unit testing
- Cypress cho E2E testing
- ESLint & Prettier cho code formatting
- Husky cho git hooks
- PM2 cho process management

## 🚀 Cài đặt

### Yêu cầu hệ thống

- Node.js (v14 trở lên)
- MongoDB (v4.4 trở lên)
- Redis (v6 trở lên)
- npm hoặc yarn
- Docker (tùy chọn)

### Các bước cài đặt

1. Clone repository

```bash
git clone https://github.com/your-username/japanese-learning-center.git
cd japanese-learning-center
```

2. Cài đặt dependencies

```bash
npm install
```

3. Tạo file .env

```bash
cp .env.example .env
```

4. Cấu hình biến môi trường trong file .env

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/japanese_learning
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@japaneselearning.com
```

5. Chạy ứng dụng

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Docker Setup

```bash
# Build và chạy với Docker Compose
docker-compose up --build
```

## 📁 Cấu trúc thư mục

```
src/
├── auth/           # Xác thực và phân quyền
│   ├── controllers/
│   ├── middleware/
│   └── services/
├── config/         # Cấu hình hệ thống
│   ├── database.js
│   ├── redis.js
│   └── aws.js
├── controllers/    # Xử lý logic
│   ├── course.controller.js
│   ├── lesson.controller.js
│   └── user.controller.js
├── middleware/     # Middleware
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
├── models/         # Database models
│   ├── user.model.js
│   ├── course.model.js
│   └── lesson.model.js
├── routes/         # API routes
│   ├── auth.route.js
│   ├── course.route.js
│   └── lesson.route.js
├── services/       # Business logic
│   ├── auth.service.js
│   ├── course.service.js
│   └── lesson.service.js
├── utils/          # Tiện ích
│   ├── logger.js
│   ├── validator.js
│   └── helpers.js
└── validators/     # Validation logic
    ├── auth.validator.js
    ├── course.validator.js
    └── lesson.validator.js
```

## 🔒 Bảo mật

### Các biện pháp bảo mật đã triển khai

- JWT Authentication với refresh tokens
- Role-based Access Control (RBAC)
- CORS Protection
- Input Validation & Sanitization
- Secure Password Hashing với bcrypt
- Rate Limiting
- XSS Protection
- CSRF Protection
- SQL Injection Prevention
- File Upload Security
- API Key Authentication cho third-party services

### Lưu ý bảo mật

- Không lưu trữ thông tin nhạy cảm trong code
- Sử dụng HTTPS cho môi trường production
- Thường xuyên cập nhật dependencies
- Backup dữ liệu định kỳ
- Monitoring và logging
- Security headers
- Regular security audits
- GDPR compliance

## 📝 API Documentation

### Authentication

```http
# Đăng ký
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}

# Đăng nhập
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

# Refresh Token
POST /api/auth/refresh-token
Authorization: Bearer <refresh_token>
```

### Courses

```http
# Lấy danh sách khóa học
GET /api/course
Authorization: Bearer <token>

# Tạo khóa học mới
POST /api/course
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Japanese N5 Course",
  "description": "Complete N5 level course",
  "level": "N5",
  "price": 99.99
}

# Lấy chi tiết khóa học
GET /api/course/:id
Authorization: Bearer <token>

# Cập nhật khóa học
PUT /api/course/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "description": "Updated description"
}
```

### Lessons

```http
# Lấy danh sách bài học
GET /api/lesson
Authorization: Bearer <token>

# Tạo bài học mới
POST /api/lesson
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Lesson Title",
  "content": "Lesson content",
  "courseId": "course_id",
  "order": 1
}

# Lấy chi tiết bài học
GET /api/lesson/:id
Authorization: Bearer <token>

# Cập nhật bài học
PUT /api/lesson/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Lesson Title",
  "content": "Updated content"
}
```

## 🤝 Đóng góp

Chúng tôi luôn chào đón mọi đóng góp từ cộng đồng. Để đóng góp:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Quy tắc đóng góp

- Tuân thủ coding standards
- Viết unit tests cho tính năng mới
- Cập nhật documentation
- Tạo meaningful commit messages
- Follow Git Flow workflow

## 📞 Liên hệ

- Website: https://japaneselearning.com
- Email:duongvantiendtu@gmail.com
- GitHub: https://github.com/Tien2003deptrai/BACKEND-CAP2-STUDY_JAPAN
- Twitter: https://twitter.com/japaneselearning

## 📄 License

Dự án được phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

## 🙏 Tác giả

- Duong Van Tien - duongvantiendtu@gmail.com

## 📊 Thống kê dự án

![GitHub stars](https://img.shields.io/github/stars/japanese-learning-center/japanese-learning-center)
![GitHub forks](https://img.shields.io/github/forks/japanese-learning-center/japanese-learning-center)
![GitHub issues](https://img.shields.io/github/issues/japanese-learning-center/japanese-learning-center)
![GitHub pull requests](https://img.shields.io/github/issues-pr/japanese-learning-center/japanese-learning-center)
![GitHub contributors](https://img.shields.io/github/contributors/japanese-learning-center/japanese-learning-center)
![GitHub license](https://img.shields.io/github/license/japanese-learning-center/japanese-learning-center)

---

Made with ❤️ by Japanese Learning Center Team [Capstone2]
