import { useNavigate } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'

const CourseCard = ({ course }) => {
    const navigate = useNavigate()

    return (
        <div className="relative group rounded-3xl bg-white border border-red-100 shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-red-300 hover:brightness-105">
            <div className="aspect-[16/9] bg-gradient-to-br from-red-100 via-white to-red-100 overflow-hidden">
                <img
                    src={course.thumb}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                />
            </div>

            <div className="p-6 space-y-2">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-red-600 flex items-center gap-2">
                    <SchoolIcon className="text-red-500" />
                    {course.name}
                </h2>

                <p className="text-sm text-gray-600 flex items-center gap-1">
                    <PersonIcon className="text-red-400" fontSize="small" />
                    Tác giả:{' '}
                    <span className="ml-1 font-medium">{course.author}</span>
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span className="italic">📘 {course.type}</span>
                    <span className="flex items-center gap-1 text-gray-600">
                        <GroupIcon fontSize="small" />
                        {course.stu_num} học viên
                    </span>
                </div>

                <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="mt-5 w-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2"
                >
                    <PlayCircleFilledWhiteIcon />
                    Vào học ngay
                </button>
            </div>

            <div className="absolute -inset-1 rounded-3xl blur-lg bg-gradient-to-br from-red-200 to-transparent opacity-0 group-hover:opacity-40 transition duration-700 pointer-events-none"></div>
        </div>
    )
}

export default CourseCard
