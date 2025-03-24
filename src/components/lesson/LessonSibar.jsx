import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function LessonSidebar({ lessons, currentLessonIndex, onSelectLesson }) {
  return (
    <div className="w-[25%] bg-white p-6 border-l overflow-y-auto shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
      <ul className="space-y-3">
        {lessons?.map((lesson, index) => (
          <li
            key={lesson._id}
            className={`p-4 flex items-center justify-between rounded-lg cursor-pointer border shadow-md transition ${
              index === currentLessonIndex ? 'bg-red-100 text-red-700' : 'bg-white'
            } hover:bg-gray-200`}
            onClick={() => onSelectLesson(index)}
          >
            <span className="font-medium">{lesson.lesson_title}</span>
            {index === currentLessonIndex ? (
              <PlayCircleIcon color="error" />
            ) : (
              <CheckCircleIcon color="success" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LessonSidebar