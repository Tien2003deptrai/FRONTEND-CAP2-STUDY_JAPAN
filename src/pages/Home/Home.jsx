import { useState, useEffect } from "react";
import CourseList from "@/components/course/courseList";

const Home = () => {
  const sampleCourses = [
    { id: 1, title: "N5 Cơ bản", description: "Khoá học dành cho người mới bắt đầu.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 2, title: "N4 Trung cấp", description: "Nâng cao khả năng tiếng Nhật.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 3, title: "N3 Tiền nâng cao", description: "Học chuyên sâu với các bài tập thực tế.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 4, title: "N2 Cao cấp", description: "Chuẩn bị cho kỳ thi JLPT N2.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 5, title: "N1 Chuyên sâu", description: "Dành cho những ai muốn thành thạo tiếng Nhật.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 6, title: "Giao tiếp Nhật Bản", description: "Luyện tập kỹ năng giao tiếp hàng ngày.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
    { id: 7, title: "Kanji Master", description: "Học chuyên sâu về chữ Hán trong tiếng Nhật.", image: "https://static.unica.vn/upload/images/2019/06/tieng-nhat-so-cap-cho-nguoi-moi_1561450243.jpg" },
  ];

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(sampleCourses);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">📚 Khoá học tiếng Nhật</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default Home;