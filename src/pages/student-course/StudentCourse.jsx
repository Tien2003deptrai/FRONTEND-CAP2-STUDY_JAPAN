import CourseList from '@/components/course/courseList'

function StudentCourse() {
  const sampleCourses = [
    {
      id: 1,
      title: 'N5 Cơ bản',
      description: 'Khoá học dành cho người mới bắt đầu.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 2,
      title: 'N4 Trung cấp',
      description: 'Nâng cao khả năng tiếng Nhật.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 3,
      title: 'N3 Tiền nâng cao',
      description: 'Học chuyên sâu với các bài tập thực tế.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 4,
      title: 'N2 Cao cấp',
      description: 'Chuẩn bị cho kỳ thi JLPT N2.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 5,
      title: 'N1 Chuyên sâu',
      description: 'Dành cho những ai muốn thành thạo tiếng Nhật.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 6,
      title: 'Giao tiếp Nhật Bản',
      description: 'Luyện tập kỹ năng giao tiếp hàng ngày.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
    {
      id: 7,
      title: 'Kanji Master',
      description: 'Học chuyên sâu về chữ Hán trong tiếng Nhật.',
      image:
        'https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg',
    },
  ]
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-1200 py-9">
        <h1 className="text-2xl font-bold">Danh sách khóa học của tôi</h1>
        {/* Render courses here */}
        <hr className="w-full my-5" />
        <CourseList courses={sampleCourses} />
      </div>
    </div>
  )
}

export default StudentCourse
