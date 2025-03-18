import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer className=" bg-red-600 text-white bottom-0  py-6  w-full">
        <div className="container mx-auto grid md:grid-cols-3 gap-6 px-4">
          <div>
            <h2 className="text-xl font-bold">🌏 Sakura Nihongo </h2>
            <p className="text-gray-400 mt-2">Nền tảng học tiếng Nhật toàn diện.</p>
          </div>
          <div>
            <h3 className="font-semibold">Liên kết nhanh</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/learning" className="hover:text-gray-300">Học tập</Link></li>
              <li><Link to="/community" className="hover:text-gray-300">Luyện tập</Link></li>
              <li><Link to="/jlpt" className="hover:text-gray-300">Flash Card</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-gray-300">📘 Facebook</a>
              <a href="#" className="hover:text-gray-300">🐦 Twitter</a>
              <a href="#" className="hover:text-gray-300">🎥 YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
export default Footer  