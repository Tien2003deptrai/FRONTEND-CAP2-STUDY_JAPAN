import { CircularProgress } from '@mui/material'

function VideoPlayer({ lesson, isLoading, isError, error }) {
  return (
    <div className="flex-1 bg-black rounded-lg overflow-hidden relative min-h-[300px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress color="inherit" />
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center">{error?.message || 'Đã xảy ra lỗi'}</p>
      ) : lesson ? (
        <iframe
          className="w-full h-full"
          src={
            lesson.video_url?.includes('watch?v=')
              ? lesson.video_url.replace('watch?v=', 'embed/')
              : lesson.video_url
          }
          title={lesson.lesson_title}
          allowFullScreen
        />
      ) : (
        <p className="text-white text-center p-6">Không có bài học nào được phát hành.</p>
      )}
    </div>
  )
}

export default VideoPlayer