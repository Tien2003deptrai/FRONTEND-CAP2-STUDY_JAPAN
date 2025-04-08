import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'

function LessonSidebar({ lessons, currentLessonIndex, onSelectLesson, maxUnlockedLesson }) {
  return (
    <div className="w-[25%] bg-white p-6 border-l overflow-y-auto shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
      <ul className="space-y-3">
        {lessons.map((lesson, index) => {
          const isActive = index === currentLessonIndex
          const isUnlocked = index <= maxUnlockedLesson
          const isCompleted = index < maxUnlockedLesson

          return (
            <li
              key={lesson._id}
              className={`p-4 flex items-center justify-between rounded-lg cursor-pointer border shadow-md transition ${
                isActive ? 'bg-red-100 text-red-700' : 'bg-white'
              } ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => isUnlocked && onSelectLesson(index)}
            >
              <span className="font-medium">{lesson.lesson_title}</span>
              {isActive ? (
                <PlayCircleIcon color="error" />
              ) : isCompleted ? (
                <CheckCircleIcon color="success" />
              ) : !isUnlocked ? (
                <LockIcon fontSize="small" color="disabled" />
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LessonSidebar